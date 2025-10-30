import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Card from '../../components/Card/Card';
//import Pagination from '../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteCard,
  fetchAllCards,
  selectCard,
} from '../../store/slices/cards-slice';

import styles from './Products.module.scss';

const Products = () => {
  const dispatch = useAppDispatch();
  const { cards, isLoading } = useAppSelector((state) => state.cards);

  useEffect(() => {
    dispatch(fetchAllCards());
  }, [dispatch]);

  const favoriteCards = useAppSelector((state) => state.cards.selectedCards);

  const handleToggleFavorite = (id: number) => {
    const card = cards.find((el) => el.id === id);

    if (!card) return;

    dispatch(selectCard(card));
  };

  const handleToggleDelete = (id: number) => {
    const card = cards.find((el) => el.id === id);

    if (!card) return;

    dispatch(deleteCard(card));
  };

  return (
    <section className="container">
      <h1>Products</h1>
      <ul className={styles.card__list}>
        {isLoading
          ? 'Loading'
          : cards?.map((el) => (
              <li key={el.id}>
                <Card
                  id={el.id}
                  img={el.image}
                  name={el.name}
                  gender={el.gender}
                  species={el.species}
                  status={el.status}
                  selected={favoriteCards.includes(el)}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleDelete={handleToggleDelete}
                />
              </li>
            ))}
      </ul>
      {/* <Pagination pages={data?.info.pages ?? 1} /> */}
      <Outlet />
    </section>
  );
};

export default Products;
