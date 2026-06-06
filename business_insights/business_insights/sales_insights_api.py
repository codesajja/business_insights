import frappe
from frappe.utils import today
from datetime import datetime

@frappe.whitelist()
def get_insights_data(top_items=10):
    today_date = today()
    current_year = int(today_date[:4])
    year_start = f"{current_year}-01-01"

    # Annual Sales (Current Financial Year Apr-Mar)

    today_dt = datetime.today()

    if today_dt.month >= 4:
        fy_start = f"{today_dt.year}-04-01"
        fy_end = f"{today_dt.year + 1}-03-31"
    else:
        fy_start = f"{today_dt.year - 1}-04-01"
        fy_end = f"{today_dt.year}-03-31"

    annual_sales = frappe.db.sql("""
        SELECT
            SUM(base_net_total) as total,
            COUNT(name) as count
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        AND posting_date BETWEEN %s AND %s
    """, (fy_start, fy_end), as_dict=True)

    # Sales Orders To Deliver
    orders_to_deliver = frappe.db.sql("""
        SELECT COUNT(name) as count
        FROM `tabSales Order`
        WHERE docstatus = 1
        AND status IN ('To Deliver', 'To Deliver and Bill')
    """, as_dict=True)

    # Sales Orders To Bill
    orders_to_bill = frappe.db.sql("""
        SELECT COUNT(name) as count
        FROM `tabSales Order`
        WHERE docstatus = 1
        AND status IN ('To Bill', 'To Deliver and Bill')
    """, as_dict=True)

    # Total Customers
    active_customers = frappe.db.sql("""
        SELECT COUNT(name) as count
        FROM `tabCustomer`
    """, as_dict=True)

    # Inactive Customers (Same logic as ERPNext Inactive Customers Report)
    inactive_customers = frappe.db.sql("""
        SELECT COUNT(*) as count
        FROM (
            SELECT
                customer,
                DATEDIFF(CURDATE(), MAX(posting_date)) as days_since_last_invoice
            FROM `tabSales Invoice`
            WHERE docstatus = 1
            GROUP BY customer
            HAVING days_since_last_invoice >= 180
        ) t
    """, as_dict=True)

    # ==========================
    # Current FY vs Previous FY
    # ==========================

    today_dt = datetime.today()

    if today_dt.month >= 4:
        current_fy_start = today_dt.year
    else:
        current_fy_start = today_dt.year - 1

    previous_fy_start = current_fy_start - 1

    month_order = [
        (4, "Apr"),
        (5, "May"),
        (6, "Jun"),
        (7, "Jul"),
        (8, "Aug"),
        (9, "Sep"),
        (10, "Oct"),
        (11, "Nov"),
        (12, "Dec"),
        (1, "Jan"),
        (2, "Feb"),
        (3, "Mar")
    ]

    current_fy_data = frappe.db.sql("""
        SELECT
            MONTH(posting_date) as month_no,
            SUM(grand_total) as total
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        AND (
            (YEAR(posting_date) = %s AND MONTH(posting_date) >= 4)
            OR
            (YEAR(posting_date) = %s + 1 AND MONTH(posting_date) <= 3)
        )
        GROUP BY MONTH(posting_date)
    """, (current_fy_start, current_fy_start), as_dict=True)

    previous_fy_data = frappe.db.sql("""
        SELECT
            MONTH(posting_date) as month_no,
            SUM(grand_total) as total
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        AND (
            (YEAR(posting_date) = %s AND MONTH(posting_date) >= 4)
            OR
            (YEAR(posting_date) = %s + 1 AND MONTH(posting_date) <= 3)
        )
        GROUP BY MONTH(posting_date)
    """, (previous_fy_start, previous_fy_start), as_dict=True)

    current_map = {
        row.month_no: float(row.total or 0)
        for row in current_fy_data
    }

    previous_map = {
        row.month_no: float(row.total or 0)
        for row in previous_fy_data
    }
    
    

    trend_months = []
    current_fy_trends = []
    previous_fy_trends = []

    for month_no, month_name in month_order:
        trend_months.append(month_name)

        current_fy_trends.append(
            current_map.get(month_no, None)
        )

        previous_fy_trends.append(
            previous_map.get(month_no, None)
        )

    # Top Customers
    top_customers = frappe.db.sql("""
        SELECT
            customer_name,
            SUM(grand_total) as total
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        AND posting_date BETWEEN %s AND %s
        GROUP BY customer_name
        ORDER BY total DESC
        LIMIT 5
    """, (fy_start, fy_end), as_dict=True)

    # Sales Order Analysis
    order_analysis = frappe.db.sql("""
        SELECT
            status,
            COUNT(name) as count
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        GROUP BY status
    """, as_dict=True)

    # Item-wise Annual Sales
    top_items = int(top_items)

    item_sales = frappe.db.sql("""
        SELECT
            item_name,
            SUM(amount) as total
        FROM `tabSales Invoice Item`
        WHERE docstatus = 1
        AND parent IN (
            SELECT name
            FROM `tabSales Invoice`
            WHERE posting_date BETWEEN %s AND %s
            AND docstatus = 1
        )
        GROUP BY item_name
        ORDER BY total DESC
        LIMIT %s
    """, (fy_start, fy_end, top_items), as_dict=True)

    return {
        "annual_sales": annual_sales[0].total or 0 if annual_sales else 0,
        "annual_sales_count": annual_sales[0].count or 0 if annual_sales else 0,
        "orders_to_deliver": orders_to_deliver[0].count or 0 if orders_to_deliver else 0,
        "orders_to_bill": orders_to_bill[0].count or 0 if orders_to_bill else 0,
        "active_customers": active_customers[0].count or 0 if active_customers else 0,
        "inactive_customers": inactive_customers[0].count or 0 if inactive_customers else 0,

        "trend_months": trend_months,
        "current_fy_trends": current_fy_trends,
        "previous_fy_trends": previous_fy_trends,
        "current_fy_label": f"FY {current_fy_start}-{str(current_fy_start + 1)[-2:]}",
        "previous_fy_label": f"FY {previous_fy_start}-{str(previous_fy_start + 1)[-2:]}",

        "top_customers": top_customers,
        "order_analysis": order_analysis,
        "item_sales": item_sales
    }