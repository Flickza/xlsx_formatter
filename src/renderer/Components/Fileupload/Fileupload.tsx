import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import XLSX from 'xlsx';

const template: XLSX.WorkBook = require('./template.json');

interface Sheet {
  name?: string;
  parsed?: XLSX.WorkSheet;
}

const Fileupload = ({
  selectedYear,
  currentDirectory,
}: {
  selectedYear: string;
  currentDirectory: string;
}) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || currentDirectory === '') return;
    // capture uploaded files
    const fileObj = e.target.files;

    // create array of files
    const upload: Array<unknown> = [];

    // handle array of files
    Array.from(fileObj).forEach((f) => {
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
    (await SheetHandler).map(async (x: Sheet) => {
      const process = await toast.promise(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        window.processer.sheet(x.parsed!, selectedYear),
        {
          pending: `Formatterer ${x.name}.xlsx.`,
          success: `Formattering av ${x.name}.xlsx fullført.`,
          error: 'Feil oppsto! Kontakt @ Adel Johan',
        }
      );
      const workbook: XLSX.WorkBook = template;
      XLSX.utils.sheet_add_json(template?.Sheets?.Ark1, process, {
        skipHeader: false,
        origin: 'A1',
      });
      await toast.promise(
        window.save.save(workbook, `${x.name}_modified.xlsx`, currentDirectory),
        {
          pending: `Lagrer ${x.name}_modified.xlsx...`,
          success: {
            render({ data }) {
              return `${data.message}`;
            },
          },
          error: 'Feil oppsto! Kontakt @ Adel Johan',
        }
      );
    });
    // reset file input
    e.target.value = '';
  };

  return (
    <Button
      sx={{ width: '100%', height: '50px', marginTop: 5 }}
      variant="contained"
      component="label"
      disabled={currentDirectory === ''}
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
