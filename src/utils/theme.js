import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main:'#ff359aff',
      light: '#ff77bb18'
    },
    secondary: {main:'#FFFF'},
    error:{main: '#ff0000ff'}
  },
  typography:{
    fontFamily:'Roboto'
  }
  
});