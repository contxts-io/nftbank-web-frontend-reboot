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
import { useEffect, useState } from 'react';
import GhostOn from '@/public/icon/GhostOn';
import EthereumIcon from '@/public/icon/EthereumIcon';
import Usd from '@/public/icon/Usd';
import Button from './buttons/Button';
import { logout } from '@/apis/firebase';
import { useRouter } from 'next/navigation';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { signOut } from '@/apis/auth';
import { useMeManual } from '@/utils/hooks/queries/auth';

const GlobalNavigation = () => {
  const router = useRouter();
  const { data: me, refetch, status } = useMeManual();
  const [currency, setCurrency] = useAtom(currencyAtom);
  const [isGhost, setIsGhost] = useState<boolean>(false);
  const changeCurrency = () => {
    setCurrency((prev) => {
      return prev === 'eth' ? 'usd' : 'eth';
    });
  };
  const handleGhostMode = () => {
    setIsGhost((prev) => !prev);
  };
  const handleClickLogout = async () => {
    await signOut().then(async () => {
      console.log('logout');
      await ReactQueryClient.removeQueries(['me']);
      await ReactQueryClient.removeQueries(['walletList']);
      await ReactQueryClient.clear();
      console.log('logout 2');
    });
  };

  return (
    <nav
      className={`${styles.navigation} border-border-main text-text-subtle dark:bg-elevation-surface-dark dark:border-border-main-dark py-12`}
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
        <Link href={'/watch'} className={`${styles.link}`}>
          Watchlist
        </Link>
        <Link href={'/activity'} className={` ${styles.link}`}>
          Activities
        </Link>
        <Link href={'/report'} className={` ${styles.link}`}>
          Report
        </Link>
        <Link href={'/settings'} className={` ${styles.link}`}>
          Settings
        </Link>
      </div>
      <div className={`${styles.buttonBox}`}>
        <Button id={'/global/wallet'}>
          <Wallet />
        </Button>
        <Button id={'/global/ghost'} onClick={() => handleGhostMode()}>
          {isGhost ? <Ghost /> : <GhostOn />}
        </Button>
        <ThemeSwitcher />
        <Button id={'/global/currency'} onClick={() => changeCurrency()}>
          <div className='flex items-center justify-center border-1 border-border-bold dark:border-border-bold-dark rounded-full h-20 w-20 mr-8 '>
            {currency === 'eth' ? <EthereumIcon /> : <Usd />}
          </div>
          {currency.toUpperCase()}
        </Button>
        <Button id='logout' onClick={() => handleClickLogout()}>
          <p>Logout</p>
        </Button>
      </div>
    </nav>
  );
};
export default GlobalNavigation;
