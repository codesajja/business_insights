frappe.pages['sales-insights-dashboard'].on_page_load = function(wrapper) {
    frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Sales Insights Dashboard',
        single_column: true
    });

    frappe.breadcrumbs.add("Selling");

    setTimeout(function() {
        
        $(wrapper).find(".layout-main").html(`
            <div style="
                max-width:1800px;
                width:100%;
                margin:0 auto;
                padding:20px;
            ">

                <!-- Period Selector -->
                <div style="display:flex; justify-content:flex-end; align-items:center; gap:20px; margin-bottom:24px; padding:0 20px;">

                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:13px; color:#333; font-weight:700;">
                            Sales Period:
                        </span>

                        <select id="sales-period" style="
                            padding:10px 18px;
                            border-radius:20px;
                            border:1px solid #2490EF;
                            font-size:13px;
                            font-weight:600;
                            color:#FFFFFF;
                            background:#31328F;
                            cursor:pointer;
                        ">
                            <option value="7">Last 7 Days</option>
                            <option value="15">Last 15 Days</option>
                            <option value="30" selected>Last 30 Days</option>
                            <option value="90">Last 90 Days</option>
                        </select>
                    </div>

                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:13px; color:#333; font-weight:700;">
                            Customer Period:
                        </span>

                        <select id="customer-period" style="
                            padding:10px 18px;
                            border-radius:20px;
                            border:1px solid #36B37E;
                            font-size:13px;
                            font-weight:600;
                            color:#fff;
                            background:#447544;
                            cursor:pointer;
                        ">
                            <option value="7">Last 7 Days</option>
                            <option value="15">Last 15 Days</option>
                            <option value="30" selected>Last 30 Days</option>
                            <option value="90">Last 90 Days</option>
                        </select>
                    </div>

                </div>

                <!-- Row 1: Our 3 KPI Cards -->
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px; margin-bottom:20px;">
   
                    <div id="kpi-annual-sales" style="background:linear-gradient(135deg, #2490EF, #1a6fb5); border-radius:8px; padding:24px 28px; box-shadow:0 4px 12px rgba(36,144,239,0.3); color:#fff; position:relative; overflow:hidden;">
                        <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:10px;">
                            $ Annual Sales
                        </div>

                        <div class="val" style="font-size:28px; font-weight:700;">
                            ...
                        </div>

                        <div class="count" style="
                            margin-top:8px;
                            font-size:13px;
                            opacity:0.9;
                            text-align:right;
                        ">
                            ...
                        </div>
                    </div>

                    <div id="kpi-total-sales" style="background:linear-gradient(135deg, #8B5CF6, #6D28D9); border-radius:8px; padding:24px 28px; box-shadow:0 4px 12px rgba(139,92,246,0.3); color:#fff; position:relative; overflow:hidden;">

                        <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:10px;">
                            💵 Total Sales
                        </div>

                        <div class="val" style="font-size:28px; font-weight:700; margin-bottom:10px;">
                            ...
                        </div>

                        <div class="count" style="
                            margin-top:8px;
                            font-size:13px;
                            opacity:0.9;
                            text-align:right;
                        ">
                            ...
                        </div>

                        <span style="background:rgba(255,255,255,0.2); border-radius:20px; padding:3px 10px; font-size:11px;" class="sales-period-label-small">
                            Last 30 Days
                        </span>

                    </div>

                    <div id="kpi-new-customers" style="background:linear-gradient(135deg, #36B37E, #27855c); border-radius:8px; padding:24px 28px; box-shadow:0 4px 12px rgba(54,179,126,0.3); color:#fff; position:relative; overflow:hidden;">
                        <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;  margin-bottom:10px;">
                            👥 New Customers
                        </div>

                        <div class="val" style="font-size:28px; font-weight:700; margin-bottom:10px; text-align:right;">
                            ...
                        </div>

                        <span style="background:rgba(255,255,255,0.2); border-radius:20px; padding:3px 10px; font-size:11px;" class="customer-period-label">
                            Last 30 Days
                        </span>
                    </div>

                    <div id="kpi-today-sales" style="background:linear-gradient(135deg, #FF5630, #cc3d1f); border-radius:8px; padding:24px 28px; box-shadow:0 4px 12px rgba(255,86,48,0.3); color:#fff; position:relative; overflow:hidden;">
                        <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:10px;">
                            📅 Today's Sales
                        </div>

                        <div class="val" style="font-size:28px; font-weight:700; margin-bottom:10px;">
                            ...
                        </div>

                        <div class="count" style="
                            margin-top:8px;
                            font-size:13px;
                            opacity:0.9;
                            text-align:right;
                        ">
                            ...
                        </div>
                    </div>
                </div>

                <!-- Row 2: Standard Selling Cards -->
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px; margin-bottom:20px;">

                    <div id="kpi-orders-deliver"
                        style="
                            background:#FFF8E1;
                            color:#D68900;
                            border-radius:8px;
                            padding:6px 20px;
                            border:1px solid #FFE082;
                        ">

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#454545; margin-bottom:8px;">
                            Sales Orders to Deliver
                        </div>

                        <div class="val" style="font-size:22px; font-weight:700; color:#333;">
                            ...
                        </div>
                    </div>

                    <div id="kpi-orders-bill"
                        style="
                            background:#FFEAEA;
                            color:#D84315;
                            border-radius:8px;
                            padding:6px 20px;
                            border:1px solid #FFCDD2;
                        ">

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#454545; margin-bottom:8px;">
                            Sales Orders to Bill
                        </div>

                        <div class="val" style="font-size:22px; font-weight:700; color:#333;">
                            ...
                        </div>
                    </div>

                    <div id="kpi-active-customers"
                        style="
                            background:#EAF4FF;
                            color:#1565C0;
                            border-radius:8px;
                            padding:6px 20px;
                            border:1px solid #BBDEFB;
                        ">

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#454545; margin-bottom:8px;">
                            Total Customers
                        </div>

                        <div class="val" style="font-size:22px; font-weight:700; color:#333; margin-bottom:10px;">
                            ...
                        </div>

                        <div class="view-active-customers"
                            style="
                                font-size:12px;
                                color:#1565C0;
                                font-weight:600;
                                cursor:pointer;
                                text-decoration:underline;
                                display:block;
                                width:100%;
                                text-align:right;
                            ">
                            View Details →
                        </div>
                    </div>

                    <div id="kpi-inactive-customers"
                        style="
                            background:#E8D9FA;
                            color:#C62828;
                            border-radius:8px;
                            padding:6px 20px;
                            border:1px solid #F5B5B5;
                        ">

                        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#454545; margin-bottom:8px;">
                            Inactive Customers
                        </div>

                        <div class="val" style="font-size:22px; font-weight:700; color:#333; margin-bottom:10px;">
                            ...
                        </div>

                        <div class="view-inactive-customers"
                            style="
                                font-size:12px;
                                color:#8E44AD;
                                font-weight:600;
                                cursor:pointer;
                                text-decoration:underline;
                                display:block;
                                width:100%;
                                text-align:right;
                            ">
                            View Details →
                        </div>

                    </div>

                </div>

                <!-- Row 3: Sales Order Trends (Full Width) -->
                <div style="
                    background:#fff;
                    border-radius:8px;
                    padding:14px 20px;
                    box-shadow:0 1px 4px rgba(0,0,0,0.1);
                    margin:0 0px 20px;
                    min-height:500px;
                ">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:16px;
                    ">

                       

                     <div style="
                        font-size:14px;
                        font-weight:600;
                        color:#333;
                        margin-bottom:16px;
                    ">
                        Sales Invoice Trends (Current FY vs Previous FY)
                    </div>

                    </div>

                    <div id="sales-order-trends-chart"></div>

                </div>
                
                <!-- Row 4: Top Customers + Sales Order Analysis -->
                <div style="
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:20px;
                    margin:0 0px 20px;
                ">

                    <!-- Top Customers -->
                    <div style="
                        background:#fff;
                        border-radius:8px;
                        padding:20px;
                        box-shadow:0 1px 4px rgba(0,0,0,0.1);
                        min-height:500px;
                    ">
                        <div style="
                            font-size:18px;
                            font-weight:700;
                            color:#333;
                            margin-bottom:4px;
                        ">
                            🏆 Top Customers
                        </div>

                        <div style="
                            color:#6B7280;
                            font-size:13px;
                            margin-bottom:12px;
                        ">
                            Top 5 Customers by Sales Revenue
                        </div>

                        <div id="top-customers-chart"></div>
                    </div>

                    <!-- Sales Order Analysis -->
                    <div style="
                        background:#fff;
                        border-radius:8px;
                        padding:20px;
                        box-shadow:0 1px 4px rgba(0,0,0,0.1);
                        min-height:500px;
                    ">

                        <div style="
                            font-size:18px;
                            font-weight:700;
                            color:#333;
                            margin-bottom:4px;
                        ">
                            📊 Category-Wise Sales Invoice Analysis
                        </div>

                        <div style="
                            color:#6B7280;
                            font-size:13px;
                            margin-bottom:12px;
                        ">
                            Distribution of Sales Invoices by Status
                        </div>


                        <div id="sales-order-analysis-chart"></div>

                    </div>

                </div>
                <!-- Row 5: Item-wise Annual Sales (Full Width) -->
                <div style="
                    background:#fff;
                    border-radius:8px;
                    padding:20px;
                    box-shadow:0 1px 4px rgba(0,0,0,0.1);
                    margin:0 0px 20px;
                    min-height:550px;
                ">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:4px;
                    ">

                        <div style="
                            font-size:18px;
                            font-weight:700;
                            color:#333;
                        ">
                            📦 Item-Wise Annual Sales
                        </div>

                        <select id="top-items-filter" style="
                            padding:8px 14px;
                            border-radius:8px;
                            border:1px solid #468C50;
                            font-size:13px;
                            font-weight:700;
                            cursor:pointer;
                            background:#468C50;
                            color:#FFFFFF;
                            box-shadow:0 2px 6px rgba(70,140,80,0.25);
                        ">
                            <option value="5">Top 5 Products</option>
                            <option value="10" selected>Top 10 Products</option>
                            <option value="15">Top 15 Products</option>
                        </select>

                    </div>

                    <div id="top-items-subtitle" style="
                        color:#6B7280;
                        font-size:13px;
                        margin-bottom:12px;
                    ">
                        Top 10 Selling Products
                    </div>

                    <div id="item-annual-sales-chart"></div>

                </div>

                             

                
            </div>
        `);

        $(wrapper).find('#sales-period').on('change', function() {
            load_sales_kpi($(this).val(), wrapper);
        });

        $(wrapper).find('#customer-period').on('change', function() {
            load_customer_kpi($(this).val(), wrapper);
        });

        $(wrapper).find('#top-items-filter').on('change', function() {

            let top_items = $(this).val();

            $(wrapper)
                .find('#top-items-subtitle')
                .text(`Top ${top_items} Selling Products`);

            load_all_data(wrapper, top_items);
        });
        

        load_sales_kpi(30, wrapper);
        load_customer_kpi(30, wrapper);

        $(wrapper)
            .find('#top-items-subtitle')
            .text('Top 10 Selling Products');

        load_all_data(wrapper, 10);

    }, 0);
};

function load_sales_kpi(days, wrapper) {
    days = days || 30;

    var label = 'Last ' + days + ' Days';

    $(wrapper).find('.sales-period-label').text(label);
    $(wrapper).find('.sales-period-label-small').text(label);

    var today = frappe.datetime.get_today();
    var from_date = frappe.datetime.add_days(today, -parseInt(days));

    // Total Sales (Selected Period - Sales Order)
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Sales Invoice',
            filters: [
                ['posting_date', '>=', from_date],
                ['posting_date', '<=', today],
                ['docstatus', '=', 1]
            ],
            fields: [
                'sum(base_net_total) as total',
                'count(name) as count'
            ],
            limit: 0
        },
        callback: function(r) {

            var val = r.message && r.message[0]
                ? r.message[0].total
                : 0;

            var count = r.message && r.message[0]
                ? r.message[0].count
                : 0;

            $(wrapper).find('#kpi-total-sales .val').html(
                frappe.format(val || 0, { fieldtype: 'Currency' })
            );

            $(wrapper).find('#kpi-total-sales .count').text(
                (count || 0) + ' Sales'
            );
        }
    });
    // Today's Sales (Sales order)
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Sales Invoice',
            filters: [
                ['posting_date', '=', today],
                ['docstatus', '=', 1]
            ],
            fields: [
                'sum(base_net_total) as total',
                'count(name) as count'
            ],
            limit: 0
        },
        callback: function(r) {

            var val = r.message && r.message[0]
                ? r.message[0].total
                : 0;

            var count = r.message && r.message[0]
                ? r.message[0].count
                : 0;

            $(wrapper).find('#kpi-today-sales .val').html(
                frappe.format(val || 0, { fieldtype: 'Currency' })
            );

            $(wrapper).find('#kpi-today-sales .count').text(
                (count || 0) + ' Sales'
            );
        }
    });

   
}

function load_customer_kpi(days, wrapper) {

    days = days || 30;

    var label = 'Last ' + days + ' Days';
    $(wrapper).find('.customer-period-label').text(label);

    var today = frappe.datetime.get_today();
    var from_date = frappe.datetime.add_days(today, -parseInt(days));

    $(wrapper).find('#kpi-new-customers .val')
        .html('<span style="opacity:0.6">Loading...</span>');

    frappe.call({
        method: 'frappe.client.get_count',
        args: {
            doctype: 'Customer',
            filters: [
                ['creation', '>=', from_date + ' 00:00:00']
            ]
        },
        callback: function(r) {
            $(wrapper).find('#kpi-new-customers .val')
                .text(r.message || 0);
        }
    });
}

function load_all_data(wrapper, top_items=10) {
    frappe.call({
        method: 'business_insights.business_insights.sales_insights_api.get_insights_data',
        args: {
            top_items: top_items
        },
        
        callback: function(r) {
            if (!r.message) return;

            var d = r.message;
            

            // KPI Cards
            $(wrapper).find('#kpi-annual-sales .val').html(
                frappe.format(d.annual_sales || 0, { fieldtype: 'Currency' })
            );

            $(wrapper).find('#kpi-annual-sales .count').text(
                (d.annual_sales_count || 0) + ' Sales'
            );

            $(wrapper).find('#kpi-orders-deliver .val').text(
                d.orders_to_deliver || 0
            );

            $(wrapper).find('#kpi-orders-bill .val').text(
                d.orders_to_bill || 0
            );

            $(wrapper).find('#kpi-active-customers .val').text(
                d.active_customers || 0
            );

            $(wrapper).find('#kpi-inactive-customers .val').text(
                d.inactive_customers || 0
            );

            $(wrapper).find('#kpi-active-customers').css('cursor', 'pointer');

            $(wrapper).find('.view-active-customers').on('click', function() {
                frappe.set_route('List', 'Customer');
            });

            $(wrapper).find('#kpi-inactive-customers').css('cursor', 'pointer');

            $(wrapper).find('.view-inactive-customers').on('click', function() {

                frappe.set_route(
                    "query-report",
                    "Inactive Customers",
                    {
                        days_since_last_order: 180,
                        doctype: "Sales Invoice"
                    }
                );
            });

            // Sales Order Trends
            if (d.trend_months && d.trend_months.length) {

                render_comparison_chart(
                    '#sales-order-trends-chart',
                    wrapper,
                    d.trend_months,
                    d.current_fy_trends,
                    d.previous_fy_trends,
                    d.current_fy_label,
                    d.previous_fy_label
                );

            } else {

                $(wrapper).find('#sales-order-trends-chart').html(
                    '<p style="color:#aaa;text-align:center;padding:40px 0;">No Data — Create Sales Orders to see trends</p>'
                );
            }

            // Top Customers List
            if (d.top_customers && d.top_customers.length) {

                let html = `
                    <div style="padding:10px;">
                `;

                d.top_customers.forEach((row, idx) => {

                    html += `
                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            padding:12px 16px;
                            margin-bottom:10px;
                            background:#f8f9fa;
                            border-radius:10px;
                            border-left:4px solid #1E40AF;
                            transition:all .2s ease;
                        ">

                            <div style="
                                display:flex;
                                align-items:center;
                            ">
                                <div style="
                                    width:32px;
                                    height:32px;
                                    border-radius:50%;
                                    background:#1E40AF;
                                    color:#fff;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    font-size:13px;
                                    font-weight:700;
                                    margin-right:12px;
                                ">
                                    ${idx + 1}
                                </div>

                                <div>
                                    <div style="
                                        font-weight:600;
                                        color:#2d3748;
                                        font-size:14px;
                                    ">
                                        ${row.customer_name}
                                    </div>
                                </div>
                            </div>

                            <div style="
                                font-weight:700;
                                color:#28a745;
                                font-size:14px;
                            ">
                                ${frappe.format(
                                    row.total || 0,
                                    { fieldtype: 'Currency' }
                                )}
                            </div>

                        </div>
                    `;
                });

                html += `</div>`;

                $(wrapper).find('#top-customers-chart').html(html);

            } else {

                $(wrapper).find('#top-customers-chart').html(
                    '<p style="color:#aaa;text-align:center;padding:40px 0;">No Data</p>'
                );
            }

            // Sales Order Analysis
            if (d.order_analysis && d.order_analysis.length) {
                                
                render_sales_order_analysis(
                    '#sales-order-analysis-chart',
                    wrapper,
                    d.order_analysis.map(x => {
                        if (x.status === "To Deliver and Bill") {
                            return "To Deliver & Bill";
                        }
                        return x.status;
                    }),
                    d.order_analysis.map(x => x.count || 0)
                );

                


            } else {

                $(wrapper).find('#sales-order-analysis-chart').html(
                    '<p style="color:#aaa;text-align:center;padding:40px 0;">No Data</p>'
                );
            }

            // Item Annual Sales
            if (d.item_sales && d.item_sales.length) {

                render_chart(
                    '#item-annual-sales-chart',
                    wrapper,
                    d.item_sales.map(x => x.item_name),
                    d.item_sales.map(x => x.total || 0),
                    'bar'
                );

            } else {

                $(wrapper).find('#item-annual-sales-chart').html(
                    '<p style="color:#aaa;text-align:center;padding:40px 0;">No Data</p>'
                );
            }
        }
    });
}

function render_chart(selector, wrapper, labels, values, type) {
    var $el = $(wrapper).find(selector);

    if (!$el.length) return;

    $el.empty();

    new frappe.Chart($el[0], {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                values: values
            }]
        },
        height: 420,
        colors: ['#468C50']
    });
}

function render_sales_order_analysis(
    selector,
    wrapper,
    labels,
    values
) {
    var $el = $(wrapper).find(selector);

    if (!$el.length) return;

    $el.empty();

    new frappe.Chart($el[0], {
        type: 'pie',
        height: 380,

        showLegend: false,

        data: {
            labels: labels,
            datasets: [
                {
                    values: values
                }
            ]
        },

        colors: [
            '#EF4444',
            '#22C55E',
            '#F59E0B',
            '#8B5CF6',
            '#2490EF',
            '#EC4899',
            '#14B8A6',
            '#F97316',
            '#6366F1',
            '#84CC16'
        ]
    });
}

function render_comparison_chart(
    selector,
    wrapper,
    labels,
    current_values,
    previous_values,
    current_label,
    previous_label
) {
    var $el = $(wrapper).find(selector);

    if (!$el.length) return;

    $el.empty();

    current_values = current_values.map(v =>
        v === null ? undefined : v
    );

    previous_values = previous_values.map(v =>
        v === null ? undefined : v
    );

    new frappe.Chart($el[0], {
        type: 'line',
        height: 420,
        data: {
            labels: labels,
            datasets: [
                {
                    name: current_label,
                    values: current_values
                },
                {
                    name: previous_label,
                    values: previous_values
                }
            ]
        },
        colors: ['#2490EF', '#FF9800']
    });
}