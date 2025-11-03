import { Navigate, Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import { ROUTES } from './shared/constants';

function App() {
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route
          path={ROUTES.default}
          element={<Navigate to={ROUTES.products} replace />}
        />
        <Route path={ROUTES.products} element={<Products />} />
        <Route path={`${ROUTES.products}/:id`} element={<Product />} />
        <Route path={ROUTES.createProduct} element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
