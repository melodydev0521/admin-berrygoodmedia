import download from 'downloadjs'
import xlsx from 'node-xlsx'

export const makeExcelAndDownload = (dashboardData) => {
    var index = 1;

    const data = [
        ['No', 'Name', 'Revenue', 'Spend', 'Profit', 'ROAS'],
        ...dashboardData.map(item => ({
            no: index ++,
            name: item.name,
            revenue: item.revenue,
            spend: item.spend,
            profit: item.revenue - item.spend,
            roas: item.revenue / item.spend        
        }))
    ];
    var buffer = xlsx.build([{name: 'dashboard', data: data}]);
    download(buffer, 'demo.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}