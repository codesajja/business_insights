import frappe
from frappe.utils import today

@frappe.whitelist()
def get_insights_data():
    today_date = today()
    year_start = today_date[:4] + '-01-01'

    # Annual Sales
    annual_sales = frappe.db.sql("""
        SELECT SUM(grand_total) as total
        FROM `tabSales Invoice`
        WHERE posting_date >= %s
        AND docstatus = 1
    """, year_start, as_dict=True)

    # Sales Orders To Deliver
    orders_to_deliver = frappe.db.sql("""
        SELECT COUNT(name) as count
        FROM `tabSales Order`
        WHERE docstatus = 1
        AND status = 'To Deliver and Bill'
    """, as_dict=True)

    # Sales Orders To Bill
    orders_to_bill = frappe.db.sql("""
        SELECT COUNT(name) as count
        FROM `tabSales Order`
        WHERE docstatus = 1
        AND status = 'To Deliver and Bill'
    """, as_dict=True)

    # Active Customers
    active_customers = frappe.db.sql("""
        SELECT COUNT(name) as count
        FROM `tabCustomer`
        WHERE disabled = 0
    """, as_dict=True)

    # Sales Order Trends
    trends = frappe.db.sql("""
        SELECT
            DATE_FORMAT(transaction_date, '%b %Y') as month,
            SUM(grand_total) as total,
            MIN(transaction_date) as sort_date
        FROM `tabSales Order`
        WHERE docstatus = 1
        GROUP BY month
        ORDER BY sort_date ASC
        LIMIT 12
    """, as_dict=True)

    # Top Customers
    top_customers = frappe.db.sql("""
        SELECT
            customer_name,
            SUM(grand_total) as total
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        GROUP BY customer_name
        ORDER BY total DESC
        LIMIT 5
    """, as_dict=True)

    # Sales Order Analysis
    order_analysis = frappe.db.sql("""
        SELECT
            status,
            COUNT(name) as count
        FROM `tabSales Order`
        WHERE docstatus = 1
        GROUP BY status
    """, as_dict=True)

    # Item-wise Annual Sales
    item_sales = frappe.db.sql("""
        SELECT
            item_name,
            SUM(amount) as total
        FROM `tabSales Invoice Item`
        WHERE docstatus = 1
        GROUP BY item_name
        ORDER BY total DESC
        LIMIT 10
    """, as_dict=True)

    return {
        "annual_sales": annual_sales[0].total or 0 if annual_sales else 0,
        "orders_to_deliver": orders_to_deliver[0].count or 0 if orders_to_deliver else 0,
        "orders_to_bill": orders_to_bill[0].count or 0 if orders_to_bill else 0,
        "active_customers": active_customers[0].count or 0 if active_customers else 0,
        "trends": trends,
        "top_customers": top_customers,
        "order_analysis": order_analysis,
        "item_sales": item_sales
    }