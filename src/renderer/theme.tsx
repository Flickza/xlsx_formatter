import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: !""
    // },
    background: {
      paper: '#3e4c59',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#5496ff',
    },
  },
});

export default theme;
