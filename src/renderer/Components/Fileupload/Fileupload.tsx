import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import XLSX from 'xlsx';
import sheetInspector from './sheet';

const template: XLSX.WorkBook = require('./template.json');

interface Sheet {
  name?: string;
  parsed?: XLSX.WorkSheet;
}

const Fileupload = () => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const upload: Array<unknown> = [];
    Array.from(e?.target?.files).forEach((f) => {
      if (f === undefined && upload === undefined) return;
      upload.push(f);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sheets = upload.map(async (u: File | any) => {
      const fileName = u.name.replaceAll('.', '').replaceAll('xlsx', '');
      return Promise.resolve(
        await u?.arrayBuffer().then((b: Array<unknown>) => {
          return { name: fileName, parsed: XLSX.read(b) };
        })
      );
    });

    // eslint-disable-next-line promise/catch-or-return, @typescript-eslint/no-explicit-any
    const SheetHandler = Promise.all(sheets).then((s: Array<any>) => {
      return Array.from(s).map((el) => {
        return el;
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (await SheetHandler).forEach(async (x: Sheet) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inspect = sheetInspector(x.parsed!);
      const workbook: XLSX.WorkBook = template;
      XLSX.utils.sheet_add_json(template?.Sheets?.Ark1, inspect, {
        skipHeader: true,
        origin: 'A2',
      });
      XLSX.writeFile(workbook, `${x.name}_modified.xlsx`);
    });
  };

  return (
    <Button
      sx={{ width: '100%', height: '50px', marginTop: 5 }}
      variant="contained"
      component="label"
      startIcon={<UploadFileIcon />}
    >
      Last opp regneark
      <input
        hidden
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        multiple
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          handleUpload(e);
        }}
      />
    </Button>
  );
};

export default Fileupload;
