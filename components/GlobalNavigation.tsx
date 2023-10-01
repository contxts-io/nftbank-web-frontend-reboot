'use client';
import Image from 'next/image';
import styles from './GlobalNavigation.module.css';
import Link from 'next/link';
import { ThemeSwitcher } from './buttons/ThemeSwitcher';
import NFTBankLogo from '@/public/logo/NFTBankLogo';
import { useAtom } from 'jotai';
import { currencyAtom } from '@/store/currency';
import Wallet from '@/public/icon/Wallet';
import Ghost from '@/public/icon/Ghost';
import Ethereum from '@/public/icon/Ethereum';

const GlobalNavigation = () => {
  const [currency, setCurrency] = useAtom(currencyAtom);
  const changeCurrency = () => {
    setCurrency((prev) => {
      return prev === 'eth' ? 'usd' : 'eth';
    });
  };
  return (
    <nav
      className={`${styles.navigation} border-border-main text-text-subtle dark:border-border-main-dark py-12`}
    >
      <div className='flex items-center  dark:text-text-subtle-dark'>
        <div className='font-body02-medium flex items-center mr-26'>
          <Image
            src={'/icon/nftbank_icon.svg'}
            width={20}
            height={20}
            alt='nftbank logo'
          />
          <NFTBankLogo className={`fill-icon-main dark:fill-icon-main-dark`} />
        </div>
        <Link
          href={'/portfolio'}
          className={` ${styles.link} text-text-main dark:text-text-main-dark`}
        >
          Portfolio
        </Link>
        <Link href={'/watchlist'} className={`${styles.link}`}>
          Watchlist
        </Link>
        <Link href={'/activitys'} className={` ${styles.link}`}>
          Activitys
        </Link>
        <Link href={'/report'} className={` ${styles.link}`}>
          Report
        </Link>
        <Link href={'/settings'} className={` ${styles.link}`}>
          Settings
        </Link>
      </div>
      <div className={`${styles.buttonBox} dark:border-border-main-dark`}>
        <button className='dark:border-border-main-dark dark:hover:border-border-main-dark'>
          <Wallet />
        </button>
        <button className='dark:border-border-main-dark dark:hover:border-border-main-dark'>
          <Ghost />
        </button>
        <ThemeSwitcher />
        <button
          className='dark:border-border-main-dark dark:hover:border-border-main-dark'
          onClick={() => changeCurrency()}
        >
          <Ethereum width={20} height={20} className='m-8' />
          {currency}
        </button>
      </div>
    </nav>
  );
};
export default GlobalNavigation;
