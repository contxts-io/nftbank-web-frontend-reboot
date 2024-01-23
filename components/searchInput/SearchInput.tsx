'use client';
import { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import { twMerge } from 'tailwind-merge';
type Props = {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
};
const SearchInput = (props: Props) => {
  // const [searchText, setSearchText] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.onChange(value);
  };
  const handleFocus = () => {};
  return (
    <div
      className={`font-body02-regular fadeIn ${styles.inputContainer} 
      ${isActive ? styles.active : ''}
      ${props.className ? props.className : ''}
      ${props.isError ? styles.error : ''}
      `}
    >
      <MagnifyingGlass width={16} height={16} />
      <input
        type='text'
        placeholder={props.placeholder || 'Search by text'}
        className={`${styles.textInput} font-caption-regular`}
        onChange={handleInputText}
        value={props.value}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </div>
  );
};
export default SearchInput;
