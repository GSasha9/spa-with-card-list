import { useState } from 'react';

import styles from './Card.module.scss';

interface CardProps {
  id: number;
  name: string;
  img: string;
  gender: string;
  species: string;
  status: string;
  onToggleFavorite: (id: number) => void;
  onToggleDelete: (id: number) => void;
}

const Card = ({
  id,
  name,
  img,
  gender,
  species,
  status,
  onToggleFavorite,
  onToggleDelete,
}: CardProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event?.preventDefault();
    setIsClicked(!isClicked);
    onToggleFavorite(id);
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event?.preventDefault();
    onToggleDelete(id);
  };

  const statusClasses: Record<string, string> = {
    Alive: styles.alive,
    Dead: styles.dead,
    unknown: styles.unknown,
  };

  const characterStatusClass = statusClasses[status] || '';

  return (
    <div className={styles.card} data-id={id}>
      <div className={styles.card_img}>
        <img src={img} alt={name}></img>
        <div className={styles.close} onClick={handleDelete}></div>
      </div>
      <div className={styles.card_text}>
        <h3 className={styles.card_name}>{name}</h3>
        <p>
          Gender: <span>{gender}</span>
        </p>
        <p>
          Species: <span>{species}</span>
        </p>
        <p>
          Status:
          <span className={characterStatusClass}>{status}</span>
        </p>
      </div>
      <div
        className={
          isClicked ? `${styles.heart} ${styles.active}` : `${styles.heart}`
        }
        onClick={handleClick}
      ></div>
    </div>
  );
};

export default Card;
