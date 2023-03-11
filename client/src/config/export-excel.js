import download from 'downloadjs'
import xlsx from 'node-xlsx'

export const makeExcelAndDownload = (dashboardData) => {
    const data = [
        ['No', 'Name', 'Revenue', 'Spend', 'Profit', 'ROAS'],
        ...dashboardData
    ];
    // const range = {s: {c: 0, r: 0}, e: {c: 0, r: 3}}; // A1:A4
    // const sheetOptions = {'!merges': [range]};
    var buffer = xlsx.build([{name: 'dashboard', data: data}]);
    download(buffer, 'demo.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}