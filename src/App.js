import Admin from './pages/Admin/AdminFoodManager';
import MenuAppBar from './components/MenuAppBar';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main:'#FF007F',
      light: '#ff77bb18'
    },
    secondary: {main:'#FFFF'},
  },
  
});

function App() {
  return (
    <><ThemeProvider theme={theme}>
      <MenuAppBar />
      <Admin />
    </ThemeProvider>
    </>
  );
}

export default App;
