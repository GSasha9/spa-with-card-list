import { Outlet } from 'react-router-dom';

import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGetAllCharactersQuery } from '../../store/rick-and-morty-api/rick-and-morty-api';
import { deleteCard, selectCard } from '../../store/slices/cards-slice';

import styles from './Products.module.scss';

const Products = () => {
  const { data } = useGetAllCharactersQuery(undefined);
  const dispatch = useAppDispatch();

  console.log(data);

  const deletedCards = useAppSelector((state) => state.cards.deletedCards);
  const favoriteCards = useAppSelector((state) => state.cards.selectedCards);

  const visibleCards = data?.results.filter(
    (card) => !deletedCards.includes(card.id)
  );

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
        {visibleCards?.map((el) => (
          <li key={el.id}>
            <Card
              id={el.id}
              img={el.image}
              name={el.name}
              gender={el.gender}
              species={el.species}
              status={el.status}
              selected={favoriteCards.includes(el.id)}
              onToggleFavorite={handleToggleFavorite}
              onToggleDelete={handleToggleDelete}
            />
          </li>
        ))}
      </ul>
      <Pagination pages={data?.info.pages ?? 1} />
      <Outlet />
    </section>
  );
};

export default Products;
