import styles from './Select.module.scss';

interface SelectProps {
  variants: string[];
  callback: (value: string) => void;
}

const Select = ({ variants, callback }: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    callback(e.target.value);
  };

  return (
    <select onChange={handleChange} className={styles.select}>
      {variants.map((el) => (
        <option key={el}>{el}</option>
      ))}
    </select>
  );
};

export default Select;
