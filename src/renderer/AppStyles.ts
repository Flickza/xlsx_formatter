import { createStyles, makeStyles } from '@mui/styles';
import svg from '../../assets/background/layered-waves-haikei.svg';

const AppStyles = makeStyles(() =>
  createStyles({
    mainGrid: {
      height: '100%',
      paddingTop: '12.5%',
      paddingBottom: '20%',
      paddingLeft: 100,
      paddingRight: 100,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: `url(${svg})`,
    },
    secondGrid: {
      width: '100%',
      backgroundColor: '#323f4b67',
      border: '5px solid #323f4b',
      borderRadius: 30,
      padding: 50,
    },
    inputs: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export default AppStyles;
