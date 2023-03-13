import dayjs from 'dayjs';
import download from 'downloadjs'
import xlsx from 'node-xlsx'

export const makeExcelAndDownload = (dashboardData) => {
    var index = 1;
    var totalRevenue = 0, totalSpend = 0;
    dashboardData.forEach(item => {
        totalRevenue += item.revenue;
        totalSpend += item.spend;
    });
    const data = [
        ['No', 'Name', 'Revenue', 'Spend', 'Profit', 'ROAS'],
        ...dashboardData.map(item => ([
            index ++,
            item.name,
            "$" + item.revenue,
            "$" + item.spend,
            "$" + Number(item.profit).toFixed(2),
            Number(item.roas * 100).toFixed(2) + '%'       
        ])),
        ['', 'Total', "$" + totalRevenue, "$" + totalSpend, "$" + (totalRevenue - totalSpend), (totalRevenue / totalSpend) + "%"]
    ];
    var buffer = xlsx.build([{name: 'dashboard', data: data}]);
    const filename = "dashboard-" + dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD') + '-' + Date.now();

    download(buffer, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}