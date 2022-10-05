import { createStyles, makeStyles } from '@mui/styles';

const AppStyles = makeStyles((theme?: any) =>
  createStyles({
    mainGrid: {
      maxWidth: '1024px',
      maxHeight: '728px',
      paddingTop: '12.5%',
      paddingLeft: 100,
      paddingRight: 100,
    },
    secondGrid: {
      backgroundColor: '#323f4b',
      borderRadius: 30,
      padding: 50,
    },
  })
);

export default AppStyles;
