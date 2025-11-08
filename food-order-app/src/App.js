import Admin from './pages/Admin/Admin';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';
import Customer from './pages/Customer/Customer';
import { useAuthContext } from './context/AuthContext';
import { CssBaseline } from '@mui/material';
import { FoodMngrProvider } from './context/FoodMngrContext';
import { CartContextProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  const { user } = useAuthContext();

  return (
    <><ThemeProvider theme={theme}>
      <CssBaseline />
      <FoodMngrProvider>
        <OrderProvider>
        {user === 'customer' ? <CartContextProvider><Customer /></CartContextProvider> : <Admin />}
        </OrderProvider>
      </FoodMngrProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
