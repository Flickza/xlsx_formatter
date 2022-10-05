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
    <Grid container className={classes.mainGrid}>
      <Grid className={classes.secondGrid}>
        <Grid item>
          <Alert sx={{ mb: 3 }} severity="info">
            NB! - Regneark må følge den nye malen.
          </Alert>
        </Grid>
        <Grid item className={classes.inputs}>
          <ConfigYear changeYear={setYear} selectedYear={year} />
        </Grid>
        <Grid item>
          <Fileupload selectedYear={year} />
        </Grid>
      </Grid>
    </Grid>
  );
}
