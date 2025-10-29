import { Outlet } from 'react-router-dom';

import Card from '../../components/Card/Card';
import { useGetAllCharactersQuery } from '../../store/rick-and-morty-api/rick-and-morty-api';

import styles from './Products.module.scss';

const Products = () => {
  const { data } = useGetAllCharactersQuery(undefined);

  console.log(data);

  return (
    <section className="container">
      <h1>Products</h1>
      <ul className={styles.card__list}>
        {data?.results.map((el) => (
          <li key={crypto.randomUUID()}>
            <Card
              img={el.image}
              name={el.name}
              gender={el.gender}
              species={el.species}
              status={el.status}
            />
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  );
};

export default Products;
