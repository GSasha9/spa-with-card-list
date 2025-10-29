import styles from './Card.module.scss';

interface CardProps {
  name: string;
  img: string;
  gender: string;
  species: string;
  status: string;
}

const Card = ({ name, img, gender, species, status }: CardProps) => {
  let characterStatusClass: string = '';

  switch (status) {
    case 'Alive':
      characterStatusClass = styles.alive;

      break;
    case 'Dead':
      characterStatusClass = styles.dead;

      break;
    case 'unknown':
      characterStatusClass = styles.unknown;

      break;
    default:
      characterStatusClass = '';
  }

  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <img src={img} alt={name}></img>
      </div>
      <div className={styles.card_text}>
        <h3 className={styles.card_name}>{name}</h3>
        <p className={styles.card_gender}>
          Gender: <span>{gender}</span>
        </p>
        <p className={styles.card_species}>
          Species: <span>{species}</span>
        </p>
        <p className={styles.card_status}>
          Status:
          <span className={characterStatusClass}>{status}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
