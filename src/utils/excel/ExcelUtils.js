const ExcelJS = require('exceljs');

class ExcelUtils {

    //finds the first cell whose value matches searchText
    //returns {row, column}, or null if not found
    static async readExcel(filePath, sheetName, searchText)
    {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);

        let output = null;
        worksheet.eachRow((row, rowNumber) =>
        {
            row.eachCell((cell, colNumber) =>
            {
                if (!output && cell.value === searchText)
                {
                    output = {row: rowNumber, column: colNumber};
                }
            });
        });
        return output;
    }

    //finds searchText, then writes newValue into the cell offset from it
    //change {rowChange: 0, colChange: 1} = the cell to the right (e.g. update a price next to a name)
    //default {0, 0} replaces the matched cell itself
    static async writeExcel(filePath, sheetName, searchText, newValue, change = {rowChange: 0, colChange: 0})
    {
        const position = await ExcelUtils.readExcel(filePath, sheetName, searchText);
        if (!position) throw new Error(`"${searchText}" not found in sheet "${sheetName}" of ${filePath}`);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);
        const cell = worksheet.getCell(position.row + change.rowChange, position.column + change.colChange);
        cell.value = newValue;
        await workbook.xlsx.writeFile(filePath);
    }

    //returns the value of one cell (row and column start at 1)
    static async getCellValue(filePath, sheetName, row, column)
    {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
        return worksheet.getCell(row, column).value;
    }
}

module.exports = { ExcelUtils };
