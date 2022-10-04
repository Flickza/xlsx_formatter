import { Container, Grid, ThemeProvider } from '@mui/material';
import theme from './theme';
import Fileupload from './Components/Fileupload/Fileupload';
import './App.css';
import ConfigForm from './Components/ConfigForm/ConfigForm';

export default function App() {
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
              <ConfigForm />
              <Fileupload />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
