import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteCard,
  fetchAllCards,
  selectCard,
} from '../../store/slices/cards-slice';

import styles from './Products.module.scss';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const { cards, isLoading } = useAppSelector((state) => state.cards);
  const favoriteCards = useAppSelector((state) => state.cards.selectedCards);

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(fetchAllCards());
    }
  }, [dispatch, cards.length]);

  const filteredCards =
    searchValue !== ''
      ? cards.filter((el) =>
          el.name.toLowerCase().startsWith(searchValue.toLowerCase())
        )
      : cards;

  const ITEMS_PER_PAGE = 20;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleCards = filteredCards.slice(startIndex, endIndex);

  const totalPages = Math.floor(visibleCards.length / ITEMS_PER_PAGE);

  const handleToggleFavorite = (id: number) => {
    const card = cards.find((el) => el.id === id);

    if (!card) return;

    dispatch(selectCard(card.id));
  };

  const handleToggleDelete = (id: number) => {
    const card = cards.find((el) => el.id === id);

    if (!card) return;

    dispatch(deleteCard(card));
  };

  const handlePageNumberClick = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <section className="container">
      <h1>Products</h1>
      <div className={styles.controls_panel}>
        <SearchInput callback={(value) => setSearchValue(value)} />
      </div>
      <ul className={styles.card__list}>
        {isLoading
          ? 'Loading'
          : visibleCards?.map((el) => (
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
      <Pagination
        pages={totalPages}
        pageCallback={handlePageNumberClick}
        currentPage={currentPage}
      />
      <Outlet />
    </section>
  );
};

export default Products;
