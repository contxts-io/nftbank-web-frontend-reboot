'use client';
import Button from '@/components/buttons/Button';
import { TWallet } from '@/interfaces/inventory';
import DotsThree from '@/public/icon/DotsThree';
import { useEffect, useRef, useState } from 'react';
import styles from './WalletEditOptions.module.css';
type Props = {
  wallet: TWallet;
  handleClickList: (value: 'edit' | 'delete') => void;
};
const WalletEditOptions = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  return (
    <div className='flex items-center justify-end relative' ref={listRef}>
      <Button id='' className={`${styles.button}`} onClick={() => toggleList()}>
        <DotsThree />
      </Button>
      {isOpen && (
        <ul className={`absolute ${styles.floatingList}`}>
          <li
            className='text-[var(--color-text-subtle)'
            onClick={() => props.handleClickList('edit')}
          >
            Edit Wallet Name
          </li>
          <li
            className='text-[var(--color-text-danger)]'
            onClick={() => props.handleClickList('delete')}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};
export default WalletEditOptions;
