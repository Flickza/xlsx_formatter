import { Box, Button, Tooltip, Typography } from '@mui/material';
import React from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const ConfigDirectory = ({
  setDirectory,
  currentDirectory,
}: {
  setDirectory: React.Dispatch<React.SetStateAction<string>>;
  currentDirectory: string;
}) => {
  const newDirectory = async () => {
    const path: string | boolean = await window.dialog.getDir();
    if (path) {
      setDirectory(path);
    }
  };
  return (
    <Box
      sx={{
        width: '30%',
        height: '100%',
        ml: 3,
        display: 'flex-inline',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ color: 'white', textAlign: 'center' }}>
        Velg mappe for lagring
      </Typography>
      <Tooltip title={currentDirectory} arrow sx={{ m: 0 }}>
        <Button
          sx={{ height: '56px', width: '100%' }}
          variant="contained"
          component="label"
          startIcon={<CreateNewFolderIcon />}
        >
          Velg
          <input
            hidden
            type="submit"
            value={currentDirectory}
            onClick={newDirectory}
          />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default ConfigDirectory;
