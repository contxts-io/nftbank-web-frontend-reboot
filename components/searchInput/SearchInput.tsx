'use client';
import { useState } from 'react';
import styles from './SearchInput.module.css';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import { twMerge } from 'tailwind-merge';
type Props = {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};
const SearchInput = (props: Props) => {
  // const [searchText, setSearchText] = useState<string>('');
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.onChange(value);
  };
  return (
    <div
      className={twMerge(
        `font-body02-regular ${styles.inputContainer} ${
          props.className ? props.className : ''
        }`
      )}
    >
      <MagnifyingGlass width={16} height={16} />
      <input
        type='text'
        placeholder={props.placeholder || 'Search by text'}
        className={`${styles.textInput} font-caption-regular`}
        onChange={handleInputText}
        value={props.value}
      />
    </div>
  );
};
export default SearchInput;
