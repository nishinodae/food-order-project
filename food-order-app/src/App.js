import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';
import { useAuthContext } from './context/AuthContext';
import { CssBaseline, LinearProgress } from '@mui/material';
import { FoodMngrProvider } from './context/FoodMngrContext';
import { CartContextProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { lazy, Suspense } from 'react';

const Customer = lazy(() => import('./pages/Customer/Customer'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

function App() {
  const { user } = useAuthContext();

  return (
    <><ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <FoodMngrProvider>
          <Suspense fallback={<LinearProgress/>}>
          {user === 'customer' ? <CartContextProvider><Customer /></CartContextProvider> : <Admin />}
          </Suspense>
        </FoodMngrProvider>
      </OrderProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
