import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  callback?: () => void;
}

const Button = ({ text, callback }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={callback}>
      {text}
    </button>
  );
};

export default Button;
