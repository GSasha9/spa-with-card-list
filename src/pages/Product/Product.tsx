import { Link, useParams } from 'react-router';

import { messages } from '../../../messages/messages';
import { useGetCharacterByIdQuery } from '../../store/rick-and-morty-api/rick-and-morty-api';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCharacterByIdQuery(Number(id) | 0);

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
                <span>Gender:</span> <span>{data.gender}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>Species:</span> <span>{data.species}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>Status:</span>
                <span>{data.status}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>Location:</span>
                <span>{data.location.name}</span>
              </p>
              <p className={styles.detailed_card_text_p}>
                <span>Last known location:</span>
                <span>{data.origin.name}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Link to=".." relative="path">
          Go home
        </Link>
      )}
    </div>
  );
};

export default Product;
