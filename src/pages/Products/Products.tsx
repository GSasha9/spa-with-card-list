import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { messages } from '../../../messages/messages';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/SearchInput/SearchInput';
import Select from '../../components/Select/Select';
import { SELECT_OPTIONS } from '../../shared/constants';
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
  const [select, setSelect] = useState('all');
  const dispatch = useAppDispatch();
  const { cards, isLoading } = useAppSelector((state) => state.cards);
  const favoriteCards = useAppSelector((state) => state.cards.selectedCards);
  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(fetchAllCards());
    }
  }, [dispatch, cards.length]);

  const filteredCards = useMemo(() => {
    return cards.filter((el) => {
      const matchesSearch = el.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesFilter =
        select === SELECT_OPTIONS.favorite
          ? favoriteCards.includes(el.id)
          : true;

      return matchesSearch && matchesFilter;
    });
  }, [cards, searchValue, select, favoriteCards]);

  const ITEMS_PER_PAGE = 20;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleCards = filteredCards.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);

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

  const handleCardClick = (id: number) => {
    navigate(`${id}`);
  };

  const handlePageNumberClick = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <section className="container">
      <h1>Products</h1>
      <div className={styles.controls_panel}>
        <SearchInput callback={(value) => setSearchValue(value)} />
        <Select
          variants={Object.values(SELECT_OPTIONS)}
          callback={(value) => setSelect(value)}
        />
      </div>
      {isLoading ? (
        <p className="info">{messages.en.loading}</p>
      ) : filteredCards.length === 0 ? (
        <p className="info">{messages.en.noResults}</p>
      ) : (
        <>
          <ul className={styles.card__list}>
            {visibleCards.map((el) => (
              <li key={el.id} onClick={() => handleCardClick(el.id)}>
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
        </>
      )}
    </section>
  );
};

export default Products;
