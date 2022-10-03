/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
// example date: 14052001
import XLSX from 'xlsx';

const DateIsValid = (date: any) => {
  return /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(18|19|20)\d\d$/.test(date);
};
const GetDateProperty = (a: Array<any>) => {
  let property;
  if (Object.prototype.hasOwnProperty.call(a, 'ddmmyy')) {
    property = 'ddmmyy';
  }
  if (Object.prototype.hasOwnProperty.call(a, 'Fødselsdato (ddmmyyyy)')) {
    property = 'Fødselsdato (ddmmyyyy)';
  }
  return property;
};
const GetPersonNrProperty = (a: Array<any>) => {
  let key;
  Object.keys(a).forEach((x) => {
    if (/^(person)|(Person)/g.test(x)) {
      key = x;
    }
  });
  return key;
};
const GetYear = (fdato?: string, pnr?: string, def?: string) => {
  if (pnr === undefined) {
    return def;
  }
  let year;
  // 1900 - 1999
  if (/^([0-4]\d\d)/g.test(pnr.toString().substring(0, 3))) {
    year = 19;
  }
  // 2000 - 2099
  if (/^([5-9]\d\d)/g.test(pnr.toString().substring(0, 3))) {
    year = 20;
  }
  return year;
};
const sheetInspector = (sheet: Array<any>) => {
  const temp: Array<any> = sheet;
  temp.forEach((row: any, index: any) => {
    const pnrKey: string = GetPersonNrProperty(row)!;
    const dateKey: string = GetDateProperty(row)!;
    const year = GetYear(row[dateKey], row[pnrKey], '19');
    temp[index][dateKey] = row[dateKey].toString().replaceAll(/\W/g, '');
    if (!DateIsValid(temp[index][dateKey])) {
      // date missing trailing 0
      if (
        temp[index][dateKey].length === 7 &&
        /^([1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(18|19|20)\d\d$/g.test(
          temp[index][dateKey]
        )
      ) {
        if (DateIsValid(`0${temp[index][dateKey]}`)) {
          temp[index][dateKey] = `0${temp[index][dateKey]}`;
        } else {
          throw new Error(`Something is not right... @ line: ${index}`);
        }
      }
      // date missing trailing 0 and year
      if (
        temp[index][dateKey].length === 5 &&
        /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])([1-9][0-9])/g.test(
          temp[index][dateKey]
        )
      ) {
        if (DateIsValid(`0${temp[index][dateKey]}${year}`)) {
          temp[index][dateKey] = `0${temp[index][dateKey]}${year}`;
        } else {
          throw new Error(`Something is not right... @ line: ${index}`);
        }
      }
      // date missing year
      if (
        temp[index][dateKey].length === 6 &&
        /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d\d$/g.test(
          temp[index][dateKey]
        )
      ) {
        if (
          DateIsValid(
            `${temp[index][dateKey].substring(0, 4)}${year}${temp[index][
              dateKey
            ].substring(4, 6)}`
          )
        ) {
          temp[index][dateKey] = `${temp[index][dateKey].substring(
            0,
            4
          )}${year}${temp[index][dateKey].substring(4, 6)}`;
        } else {
          throw new Error(`Something is not right... @ line: ${index}`);
        }
      }
    }
  });
  return temp;
};

export default sheetInspector;
