import { useEffect, useState } from 'react';

import styles from './SearchInput.module.scss';

interface SearchInputProps {
  callback: (value: string) => void;
}

const SearchInput = ({ callback }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    callback(debouncedValue);
  }, [debouncedValue, callback]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="search..."
      className={styles.input}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
