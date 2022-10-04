import { Container, Grid, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Fileupload from './Components/Fileupload/Fileupload';
import './App.css';
import ConfigForm from './Components/ConfigForm/ConfigForm';
import theme from './theme';

export default function App() {
  const [year, setYear] = useState('19');

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="lg"
          className="color-900"
          sx={{ display: 'flex', justifyContent: 'center', height: '600px' }}
        >
          <Grid
            container
            mt={5}
            className="color-800"
            sx={{
              m: 25,
              p: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={12}>
              <ConfigForm changeYear={setYear} selectedYear={year} />
              <Fileupload selectedYear={year} />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
