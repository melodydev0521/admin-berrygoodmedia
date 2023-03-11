import ExcelExport, { alignment, defaultDataType } from 'export-xlsx'
import download from 'downloadjs'
import xlsx from 'node-xlsx'

// Export settings
const SETTINGS_FOR_EXPORT = {
    // Table settings
    fileName: 'demo',
    workSheets: [
        {
            sheetName: 'member',
            startingRowNumber: 2,
            gapBetweenTwoTables: 2,
            headerGroups: [
                {
                    name: '',
                    key: 'void',
                    groupKey: 'directions',
                },
                {
                    name: 'Science',
                    key: 'science',
                    groupKey: 'directions',
                },
                {
                    name: 'Directions',
                    key: 'directions',
                },
            ],
            headerDefinition: [
                {
                    name: '#',
                    key: 'number',
                },
                {
                    name: 'Name',
                    key: 'name',
                },
                {
                    name: 'SUM',
                    key: 'sum',
                    groupKey: 'void',
                    rowFormula: '{math}+{physics}+{chemistry}+{informatics}+{literature}+{foreignLang}',
                },
                {
                    name: 'Mathematics',
                    key: 'math',
                    groupKey: 'science',
                },
                {
                    name: 'Physics',
                    key: 'physics',
                    groupKey: 'science',
                },
                {
                    name: 'Chemistry',
                    key: 'chemistry',
                    groupKey: 'science',
                },
                {
                    name: 'Informatics',
                    key: 'informatics',
                    groupKey: 'science',
                },
                {
                    name: 'Literature',
                    key: 'literature',
                    groupKey: 'science',
                },
                {
                    name: 'Foreign lang.',
                    key: 'foreignLang',
                    groupKey: 'science',
                },
                {
                    name: 'AVG',
                    key: 'avg',
                    groupKey: 'void',
                    rowFormula: '{sum}/6',
                }
            ],
        },
    ],
};

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