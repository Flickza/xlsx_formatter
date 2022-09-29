/* eslint-disable @typescript-eslint/no-explicit-any */
const sheetInspector = (sheet: Array<any>) => {
  sheet.forEach((row) => {
    console.log(row?.ddmmyy);
  });
};

export default sheetInspector;
