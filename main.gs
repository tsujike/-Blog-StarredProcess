function myFunctionByArray() {

  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getDataRange().getValues();
  values.shift();

  //スター処理
  for (const [i, value] of values.entries()) {
    if (value[0] === "★") continue;
    console.log(value[3]);
    values[i][0] = "★";
  }

  //貼り付け
  sheet.getRange(2, 1, values.length, values[0].length).setValues(values);

}


function myFunctionByObject() {

  const sheet = SpreadsheetApp.getActiveSheet();
  const [header, ...records] = sheet.getDataRange().getValues();

  //連想配列型に変換する
  const keyValueArray = records.map(record => {
    const obj = {};
    header.map((key, index) => obj[key] = record[index]);
    return obj;
  });

  //スター無しのrecords
  const withoutStarRecords = keyValueArray.filter(record => record['処理済み'] !== '★');

  //営業部のみのrecords
  const eigyobuRecords = withoutStarRecords.filter(record => record['部署'] === '営業部');

  //スター処理
  eigyobuRecords.forEach(record => {
    record['処理済み'] = '★';
    return record;
  });

  //2次元配列に戻す
  const newRrecords = keyValueArray.map(record => Object.values(record));
  
  //貼り付け
  sheet.getRange(2, 1, newRrecords.length, newRrecords[0].length).setValues(newRrecords);
}
