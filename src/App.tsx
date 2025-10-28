import { Navigate, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { messages } from '../messages/messages';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import { ROUTES } from './shared/constants/routes';

function App() {
  return (
    <>
      <nav>
        <Link to={ROUTES.products}>{messages.en.nav.products}</Link>
        <Link to={ROUTES.createProduct}>{messages.en.nav.createProduct}</Link>
      </nav>
      <Routes>
        <Route
          path={ROUTES.default}
          element={<Navigate to={ROUTES.products} replace />}
        />
        <Route path={ROUTES.products} element={<Products />}>
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path={ROUTES.createProduct} element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
