'use client';
import { useEffect, useRef, useState } from 'react';
import Button from './buttons/Button';
import Folder from '@/public/icon/Folder';
import BlockiesIcon from './BlockiesIcon';
import styles from './PortfolioSelector.module.css';
import WalletAndGroupManage from './wallet/WalletAndGroupManage';
import { TUser } from '@/interfaces/user';
import { BasicParam } from '@/interfaces/request';
type Props = {
  className?: string;
  position?: string;
  user: TUser;
  portfolioParam: BasicParam;
  setPortfolioParam: (param: BasicParam) => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log('props.portfolioParam @@@@@ : ', props.portfolioParam);
  }, [props.portfolioParam]);
  const listRef = useRef<HTMLDivElement>(null);
  return (
    <div className='relative' ref={listRef}>
      <Button
        id=''
        onClick={() => toggleOpen()}
        className={props.className || ''}
      >
        {!props.portfolioParam && (
          <div className='flex items-center text-[var(--color-text-subtle)]'>
            <Folder className={`mr-4`} />
            <p>All Wallets</p>
          </div>
        )}
        {props.portfolioParam?.nickname && (
          <div className='flex items-center text-[var(--color-text-main)]'>
            <Folder className={`mr-4`} />
            <p>All Wallets</p>
          </div>
        )}
        {props.portfolioParam?.walletAddress && (
          <div className='flex items-center text-[var(--color-text-subtle)]'>
            <BlockiesIcon
              walletAddress={props.portfolioParam.walletAddress}
              size={16}
              className={`mr-4`}
            />
            <p className='text-[var(--color-text-main)]'>
              {props.portfolioParam.walletAddress?.substring(0, 6)}
            </p>
          </div>
        )}
        {props.portfolioParam?.walletGroupId && (
          <div className='flex items-center text-[var(--color-text-subtle)]'>
            <Folder className={`${styles.blockIcon} mr-4`} />
            <p>{props.portfolioParam.walletGroupId}</p>
          </div>
        )}
      </Button>
      {isOpen && (
        <div className={`absolute z-50 ${props.position || 'top-40 right-0'}`}>
          <WalletAndGroupManage
            user={props.user}
            onClose={() => setIsOpen(false)}
            setPortfolioWallet={(param) => props.setPortfolioParam(param)}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioSelector;
