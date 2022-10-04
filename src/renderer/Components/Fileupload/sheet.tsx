/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DateIsValid from 'renderer/Functions/DateIsValid';
import GetProperty from 'renderer/Functions/GetProperty';
import GetYear from 'renderer/Functions/GetYear';
import checkMissing from 'renderer/Functions/checkMissing';

import XLSX from 'xlsx';

const sheetInspector = (sheet: XLSX.WorkSheet) => {
  const temp: Array<any> = XLSX.utils.sheet_to_json(sheet?.Sheets?.Ark1, {
    defval: '',
  });
  temp.forEach((row: { [index: string]: string }, index: any) => {

    // get personNr key from object
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const pnrKey: string = GetProperty.PersonNr?.(row)!;

    // get Fødselsdato key from object
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const dateKey: string = GetProperty.Date?.(row)!;

    // calculate birthyear from fødselsdato + personnr
    const year = GetYear(row[dateKey], row[pnrKey], '19');

    if (pnrKey === undefined || dateKey === undefined) {
      throw new Error(`Some headers were not found...`);
    }
    // Strip all invalid characters
    temp[index][dateKey] = row[dateKey].toString().replaceAll(/\W|-|_/g, '');

    if (!DateIsValid(temp[index][dateKey])) {
      // date missing trailing 0
      if (
        temp[index][dateKey].length === 7 &&
        checkMissing.trailing?.(temp[index][dateKey])
      ) {
        const modified = `0${temp[index][dateKey]}`;
        // check if date is valid after modification
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

        // check if date is valid after modification
        if (DateIsValid(modified)) {
          // set new value to modified value
          temp[index][dateKey] = modified;
        } else {
          throw new Error(
            `Something is not right... @ line: ${index} \n Reading: ${modified}`
          );
        }
      }
      // check if date missing year
      if (
        temp[index][dateKey].length === 6 &&
        checkMissing.year?.(temp[index][dateKey])
      ) {
        // split date string and add year to string
        const modified =
          temp[index][dateKey].substring(0, 4) +
          year +
          temp[index][dateKey].substring(4, 6);
        // check if date is after year has been added
        if (DateIsValid(modified)) {
          // set new value to modified value
          temp[index][dateKey] = modified;
        } else {
          throw new Error(
            `Something is not right... @ line: ${index} \n Reading: ${modified}`
          );
        }
      }
    }
  });
  return temp;
};

export default sheetInspector;
