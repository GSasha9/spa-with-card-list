import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  type?: 'submit' | 'button';
}

const Button = ({ text, callback, disabled, type = 'submit' }: ButtonProps) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={callback}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
