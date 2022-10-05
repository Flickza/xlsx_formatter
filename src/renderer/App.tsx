import { Alert, Grid } from '@mui/material';
import { useState } from 'react';
import Fileupload from './Components/Fileupload/Fileupload';
import './App.css';
import ConfigYear from './Components/ConfigYear/ConfigYear';
import AppStyles from './AppStyles';

export default function App() {
  const [year, setYear] = useState('19');
  const classes = AppStyles();
  return (
    <>
      <Grid container className={classes.mainGrid}>
        <Grid xs={12} className={classes.secondGrid}>
          <Alert sx={{ mb: 3 }} severity="info">
            NB! - Regneark må følge den nye malen.
          </Alert>
          <ConfigYear changeYear={setYear} selectedYear={year} />
          <Fileupload selectedYear={year} />
        </Grid>
      </Grid>
    </>
  );
}
