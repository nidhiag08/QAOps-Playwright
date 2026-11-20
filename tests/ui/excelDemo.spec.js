const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async

  // stop here if searchText wasn't found, otherwise getCell(-1, ...) crashes
  if (output.row === -1) {
    console.log(`"${searchText}" not found in the sheet - nothing to update`);
    return;
  }
 
  const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
  console.log(`Updated row ${output.row + change.rowChange}, column ${output.column + change.colChange} to ${replaceText}`);
}
 
// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
//update Mango Price to 350. 
//writeExcelTest("Mango Mango",350,{rowChange:0,colChange:2},"/home/cepl/Downloads/ExcelDownloadTest.xlsx");

//Download file from the website, update the price of Mango to 350, 
//and upload it back to the website.
test('Upload download excel validation', { tag: '@regression' }, async ({ page }, testInfo) => 
    {
    const filePath = testInfo.outputPath('ExcelDownloadTest.xlsx');
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    //start waiting for the download before clicking, then save the file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs(filePath);
    await writeExcelTest("Mango",350,{rowChange:0,colChange:2},filePath);
    //the page uploads as soon as a file is chosen - there is no Upload button
    await page.locator('#fileinput').setInputFiles(filePath);
    await expect(page.getByRole('alert')).toHaveText('Updated Excel Data Successfully.');
    //check the table shows the new price
    const mangoRow = page.getByRole('row').filter({ has: page.getByText('Mango') });
    await expect(mangoRow).toContainText('350');
    });
