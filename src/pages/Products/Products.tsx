import { Outlet } from 'react-router-dom';

import Card from '../../components/Card/Card';
import { useAppDispatch } from '../../store/hooks';
import { useGetAllCharactersQuery } from '../../store/rick-and-morty-api/rick-and-morty-api';
import { deleteCard, selectCard } from '../../store/slices/cards-slice';

import styles from './Products.module.scss';

const Products = () => {
  const { data } = useGetAllCharactersQuery(undefined);
  const dispatch = useAppDispatch();

  console.log(data);

  const handleToggleFavorite = (id: number) => {
    dispatch(selectCard(Number(id)));
  };

  const handleToggleDelete = (id: number) => {
    dispatch(deleteCard(Number(id)));
  };

  return (
    <section className="container">
      <h1>Products</h1>
      <ul className={styles.card__list}>
        {data?.results.map((el) => (
          <li key={el.id}>
            <Card
              id={el.id}
              img={el.image}
              name={el.name}
              gender={el.gender}
              species={el.species}
              status={el.status}
              onToggleFavorite={handleToggleFavorite}
              onToggleDelete={handleToggleDelete}
            />
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  );
};

export default Products;
