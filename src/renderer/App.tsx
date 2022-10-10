import { Alert, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import FileUpload from './Components/FileUpload/FileUpload';
import ConfigDirectory from './Components/ConfigDirectory/ConfigDirectory';
import ConfigYear from './Components/ConfigYear/ConfigYear';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AppStyles from './AppStyles';

export default function App() {
  const [year, setYear] = useState('19');
  const [currentDirectory, setCurrentDirectory] = useState('');

  const classes = AppStyles();
  return (
    <Grid container className={classes.mainGrid}>
      <ToastContainer />
      <Grid item width="100%">
        <Alert sx={{ mb: 1, w: '100%' }} severity="info">
          NB! - Regneark må følge den nye malen.
        </Alert>
      </Grid>
      <Grid className={classes.secondGrid}>
        <Typography
          variant="h3"
          className={classes.title}
          sx={{ color: 'white', mb: 5, textAlign: 'center' }}
        >
          XLSX FORMATTER
        </Typography>
        <Grid item className={classes.inputs}>
          <ConfigYear changeYear={setYear} selectedYear={year} />
          <ConfigDirectory
            setDirectory={setCurrentDirectory}
            currentDirectory={currentDirectory}
          />
        </Grid>
        <Grid item>
          <FileUpload currentDirectory={currentDirectory} selectedYear={year} />
        </Grid>
      </Grid>
    </Grid>
  );
}
