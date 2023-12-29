'use client';
import { useEffect, useState } from 'react';
import InventoryValue from '../portfolio/InventoryValue';
import SearchInput from '../searchInput/SearchInput';
import styles from './UpgradeNFTFinance.module.css';
import { useSetAtom } from 'jotai';
import { portfolioUserAtom } from '@/store/portfolio';
import InventoryItemTable from '../portfolio/inventory/item/InventoryItemTable';
import { inventoryItemListAtom } from '@/store/requestParam';
import { set } from 'cypress/types/lodash';
const UpgradeNFTFinance = () => {
  const [walletAddress, setWalletAddress] = useState<string>(
    '0xcfb3ee49c46ab8a5665aad3c03c4b3aef743e80c'
  );
  const setPortfolioUser = useSetAtom(portfolioUserAtom);
  const setRequestParam = useSetAtom(inventoryItemListAtom);
  useEffect(() => {
    setRequestParam((prev) => {
      return {
        ...prev,
        limit: 5,
        paging: false, // 페이징 처리 안하기
        walletAddress: walletAddress,
        networkId: 'ethereum',
      };
    });
    setPortfolioUser({
      walletAddress: walletAddress,
      networkId: 'ethereum',
    });
    return () => {
      setRequestParam((prev) => {
        return {
          ...prev,
          limit: 10,
          paging: true, // 페이징 처리 안하기
          walletAddress: '',
          networkId: 'ethereum',
        };
      });
    };
  }, []);
  useEffect(() => {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleClearInput();
      }
      if (e.key === 'Enter') {
        handleClickEnter();
      }
    });
    return () => {
      document.body.removeEventListener('keydown', () => {});
    };
  }, []);
  const handleClearInput = () => {
    setWalletAddress('');
  };
  const handleClickEnter = () => {
    setPortfolioUser({
      walletAddress: walletAddress,
      networkId: 'ethereum',
    });
    setRequestParam((prev) => {
      return {
        ...prev,
        walletAddress: walletAddress,
        networkId: 'ethereum',
      };
    });
  };
  return (
    <section className={styles.container}>
      <p className='font-header02-bold text-[var(--color-text-main)]'>
        Upgrade your NFT finance journey{' '}
      </p>
      <p className='font-header02-bold text-[var(--color-text-main)]'>
        with the most accurate NFT valuation???
      </p>
      <div className='mt-40 w-[600px] relative'>
        <SearchInput
          placeholder='Insert your wallet'
          value={walletAddress}
          onChange={(address) => setWalletAddress(address)}
        />
        <div className='absolute top-7 right-12 w-30 h-30 border-1 border-[var(--color-border-main)] flex items-center justify-center'>
          <p className='font-caption-regular text-[var(--color-text-subtle)]'>
            ESC
          </p>
        </div>
      </div>
      <div className='w-full mt-20'>
        <InventoryValue />
      </div>
      <div className='w-full mt-30'>
        <InventoryItemTable />
      </div>
    </section>
  );
};
export default UpgradeNFTFinance;
