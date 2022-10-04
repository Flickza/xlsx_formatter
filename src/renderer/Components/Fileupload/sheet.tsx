/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DateIsValid from 'renderer/Functions/DateIsValid';
import GetDateProperty from 'renderer/Functions/GetDateProperty';
import GetPersonNrProperty from 'renderer/Functions/GetPersonNrProperty';
import GetYear from 'renderer/Functions/GetYear';
import checkMissing from 'renderer/Functions/checkMissing';

import XLSX from 'xlsx';

const sheetInspector = (sheet: XLSX.WorkSheet) => {
  const temp: Array<any> = XLSX.utils.sheet_to_json(sheet?.Sheets?.Ark1, {
    defval: '',
  });
  temp.forEach((row: any, index: any) => {
    // get personNr key from object
    const pnrKey: string = GetPersonNrProperty(row)!;

    // get Fødselsdato key from object
    const dateKey: string = GetDateProperty(row)!;

    // calculate birthyear from fødselsdato + personnr
    const year = GetYear(row[dateKey], row[pnrKey], '19');

    // Strip all invalid characters
    temp[index][dateKey] = row[dateKey].toString().replaceAll(/\W/g, '');

    if (!DateIsValid(temp[index][dateKey])) {
      // date missing trailing 0
      if (temp[index][dateKey].length === 7 &&checkMissing.trailing?.(temp[index][dateKey])) {
        const modified = `0${temp[index][dateKey]}`;
        if (DateIsValid(modified)) {
          temp[index][dateKey] = modified;
        } else {
          throw new Error(
            `Something is not right... @ line: ${index} \n Reading: ${modified}`
          );
        }
      }
      // date missing trailing 0 and year
      if (
        temp[index][dateKey].length === 5 &&
        checkMissing.yearAndTrailing?.(temp[index][dateKey])
      ) {
        const modified = `0${temp[index][dateKey]}${year}`;
        if (DateIsValid(modified)) {
          temp[index][dateKey] = modified;
        } else {
          throw new Error(`Something is not right... @ line: ${index} \n Reading: ${modified}`);
        }
      }
      // check if date missing year
      if (temp[index][dateKey].length === 6 && checkMissing.year?.(temp[index][dateKey])) {
        // split date string and add year to string
        const modified = temp[index][dateKey].substring(0, 4) + year +temp[index][dateKey].substring(4, 6);
        // check if date is after year has been added
        if (DateIsValid(modified)) {
          // set new date
          temp[index][dateKey] = modified;
        } else {
          throw new Error(`Something is not right... @ line: ${index} \n Reading: ${modified}`);
        }
      }
    }
  });
  return temp;
};

export default sheetInspector;
