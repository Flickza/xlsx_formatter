import { blue } from '@mui/material/colors';
import { createStyles, makeStyles } from '@mui/styles';

const selectStyles = makeStyles((theme?: any) =>
  createStyles({
    select: {
      minWidth: 150,
      background: 'white',
      color: blue[500],
      fontWeight: 200,
      borderStyle: 'none',
      boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
      '&:focus': {
        borderRadius: 12,
        background: 'white',
        borderColor: blue[100],
      },
    },
    icon: {
      color: blue[300],
      right: 12,
      position: 'absolute',
      userSelect: 'none',
      pointerEvents: 'none',
    },
    paper: {
      borderRadius: 25,
      marginTop: 2,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      background: 'white',
      '& li': {
        fontWeight: 200,
      },
      '& li:hover': {
        background: blue[100],
      },
      '& li.Mui-selected': {
        color: 'white',
        background: blue[400],
      },
      '& li.Mui-selected:hover': {
        background: blue[500],
      },
    },
  })
);

export default selectStyles;
