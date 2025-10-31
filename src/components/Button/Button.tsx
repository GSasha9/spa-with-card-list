import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  callback: () => void;
  disabled?: boolean;
}

const Button = ({ text, callback, disabled }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={callback} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
