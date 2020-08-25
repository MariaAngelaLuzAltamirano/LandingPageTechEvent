const { GoogleSpreadsheet } = require('google-spreadsheet');

const credenciales = require('./json/credenciales.json')

let googleId = "1sxEpDb2KEt99kZIk3fTv7s7AqU_VSziR2zHSKJBXzB0";

async function accessGoogleSheet() {

  const document = new GoogleSpreadsheet(googleId);
  await document.useServiceAccountAuth(credenciales);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];
  const registry = await sheet.getRows();

  return registry;
}

async function saveRegistry(newRegistry){

  const document = new GoogleSpreadsheet(googleId);
  await document.useServiceAccountAuth(credenciales);
  await document.loadInfo();
  const sheet = document.sheetsById[0];

  await sheet.addRow(newRegistry);

}


module.exports = {
  accessGoogleSheet,
  saveRegistry,
}