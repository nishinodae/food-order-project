import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main:'#E60071',
      light: '#ff77bb18'
    },
    secondary: {main:'#FFFF'},
    error:{main: '#ff0000'}
  },
  typography:{
    fontFamily:'Roboto'
  }
});