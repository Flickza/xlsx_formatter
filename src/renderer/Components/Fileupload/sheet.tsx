/* eslint-disable @typescript-eslint/no-explicit-any */
// example date: 14052001

const dateValidator = (date: any) => {
  if (date.length !== 8) {
    return false;
  }
  const day = date.substring(0, 2);
  const month = date.substring(2, 4);
  const year = date.substring(4, 8);
  if (day < 1 || day > 31) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (year < 0 || year > new Date().getFullYear()) {
    return false;
  }
  return true;
};
const sheetInspector = (sheet: Array<any>) => {
  sheet.forEach((row) => {
    console.log(row?.ddmmyy);
  });
};

export default sheetInspector;
