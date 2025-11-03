import { Link, useParams } from 'react-router';

import { messages } from '../../../messages/messages';
import { useAppSelector } from '../../store/hooks';
import { useGetCharacterByIdQuery } from '../../store/rick-and-morty-api/rick-and-morty-api';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const createdCards = useAppSelector((state) => state.cards.createdCard);

  const createdCard = createdCards.find((el) => el.id === Number(id));

  const { data: apiData, isLoading: isApiLoading } = useGetCharacterByIdQuery(
    createdCard ? undefined : Number(id),
    { skip: !!createdCard }
  );

  const data = createdCard || apiData;
  const isLoading = createdCard ? false : isApiLoading;

  if (isLoading) {
    return (
      <div className="container">
        <p className="info">{messages.en.loading}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {data ? (
        <div className={styles.detailed_card}>
          <h2>{data.name}</h2>
          <div className={styles.detailed_card_description}>
            <div>
              <img
                className={styles.detailed_card_img}
                src={data.image}
                alt={data.name}
              />
            </div>
            <div className={styles.detailed_card_text}>
              <p className={styles.detailed_card_text_p}>
                <span>{messages.en.gender}</span> <span>{data.gender}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>{messages.en.species}</span> <span>{data.species}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>{messages.en.status}</span>
                <span>{data.status}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>{messages.en.location}</span>
                <span>{data.location.name}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>{messages.en.lastKnown}</span>
                <span>{data.origin.name}</span>
              </p>
            </div>
          </div>
          <Link to=".." relative="path">
            {messages.en.backToProducts}
          </Link>
        </div>
      ) : (
        <Link to=".." relative="path">
          {messages.en.backToProducts}
        </Link>
      )}
    </div>
  );
};

export default Product;
