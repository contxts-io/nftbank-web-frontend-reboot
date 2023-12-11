'use client';

import { myDefaultPortfolioAtom } from '@/store/settings';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import Button from './buttons/Button';
import Folder from '@/public/icon/Folder';
import BlockiesIcon from './BlockiesIcon';
import styles from './PortfolioSelector.module.css';
import WalletAndGroupManage from './wallet/WalletAndGroupManage';
type Props = {
  className?: string;
  position?: string;
};
const PortfolioSelector = (props: Props) => {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const [mySelectedInformation, setMySelectedInformation] = useAtom(
    myDefaultPortfolioAtom
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const listRef = useRef<HTMLDivElement>(null);
  return (
    <div className='relative' ref={listRef}>
      <Button
        id=''
        onClick={() => toggleOpen()}
        className={props.className || ''}
      >
        {!mySelectedInformation && (
          <div className='flex items-center text-[var(--color-text-subtle)]'>
            <Folder className={`mr-4`} />
            <p>All Wallets</p>
          </div>
        )}
        {mySelectedInformation?.userId && (
          <div className='flex items-center text-[var(--color-text-main)]'>
            <Folder className={`mr-4`} />
            <p>All Wallets</p>
          </div>
        )}
        {mySelectedInformation?.walletAddress && (
          <div className='flex items-center text-[var(--color-text-subtle)]'>
            <BlockiesIcon
              walletAddress={mySelectedInformation.walletAddress}
              size={16}
              className={`mr-4`}
            />
            <p className='text-[var(--color-text-main)]'>
              {mySelectedInformation.walletAddress?.substring(0, 6)}
            </p>
          </div>
        )}
        {mySelectedInformation?.walletGroup && (
          <div className='flex items-center text-[var(--color-text-subtle)]'>
            <Folder className={`${styles.blockIcon} mr-4`} />
            <p>{mySelectedInformation.walletGroup}</p>
          </div>
        )}
      </Button>
      {isOpen && (
        <div className={`absolute z-50 ${props.position || 'top-40 right-0'}`}>
          <WalletAndGroupManage onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default PortfolioSelector;
