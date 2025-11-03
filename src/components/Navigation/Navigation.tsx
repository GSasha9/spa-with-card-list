import { Link, useLocation } from 'react-router-dom';

import { messages } from '../../../messages/messages';
import { ROUTES } from '../../shared/constants';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="container">
      {' '}
      <nav className={styles.navigation}>
        <Link
          className={
            location.pathname.slice(1) === ROUTES.products
              ? `${styles.active}`
              : ''
          }
          to={ROUTES.products}
        >
          {messages.en.nav.products}
        </Link>
        <Link
          className={
            location.pathname.slice(1) === ROUTES.createProduct
              ? `${styles.active}`
              : ''
          }
          to={ROUTES.createProduct}
        >
          {messages.en.nav.createProduct}
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
