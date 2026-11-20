const ExcelJs = require('exceljs');
 
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
test('Upload download excel validation', async ({ page }) => 
    {
    const testSearchText = "Mango";
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    await page.getbyrole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/home/cepl/Downloads/ExcelDownloadTest.xlsx");
    
    await page.getByLabel('Upload file').setInputFiles('/home/cepl/Downloads/ExcelDownloadTest.xlsx');
    await page.getbyrole('button', { name: 'Upload' }).click();
     const text = await page.getbytext('textSearch');
     const desiredRow = await page.getbyrole('row').filter({has: textSearch});
      //await page.pause(); // uncomment to step through in the Inspector
      desiredRow.locator('#cell-4-undefined');
    await expect(desiredRow.locator('#cell-4-undefined')).toHaveText('updatedValue');

    });