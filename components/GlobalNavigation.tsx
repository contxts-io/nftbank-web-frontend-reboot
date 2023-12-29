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
import { useEffect, useRef, useState } from 'react';
import GhostOn from '@/public/icon/GhostOn';
import EthereumIcon from '@/public/icon/EthereumIcon';
import Usd from '@/public/icon/Usd';
import Button from './buttons/Button';
import { useMe } from '@/utils/hooks/queries/auth';
import { useMutationSignOut } from '@/utils/hooks/mutations/auth';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';
import { useDisconnect as useDisconnectThirdWeb } from '@thirdweb-dev/react';
import { connectedWalletAddressAtom } from '@/store/account';
import { myDefaultPortfolioAtom } from '@/store/settings';
import PortfolioSelector from './PortfolioSelector';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

const GlobalNavigation = () => {
  const path = usePathname();
  const { data: me } = useMe();
  const { mutate: signOut } = useMutationSignOut();
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();
  const disconnectThirdWeb = useDisconnectThirdWeb();
  const [connectedWalletAddress, setConnectedWalletAddress] = useAtom(
    connectedWalletAddressAtom
  );
  const [mySelectedInformation, setMySelectedInformation] = useAtom(
    myDefaultPortfolioAtom
  );
  const [currency, setCurrency] = useAtom(currencyAtom);
  const [isGhost, setIsGhost] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    console.log('mySelectedInformation', mySelectedInformation);
  }, [mySelectedInformation]);
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const changeCurrency = () => {
    setCurrency((prev) => {
      return prev === 'eth' ? 'usd' : 'eth';
    });
  };
  const handleGhostMode = () => {
    setIsGhost((prev) => !prev);
  };
  const handleClickLogout = async () => {
    await disconnectWagmi();
    await disconnectThirdWeb().then(() => {
      console.log('disconnected disconnectThirdWeb');
    });
    setConnectedWalletAddress(null);
    signOut();
  };
  if (path.includes('/landing') || path.includes('/blog'))
    return (
      // <div className='w-full h-62 sticky top-0 z-10 '>
      //   <TopNav />
      // </div>
      null
    );
  return (
    <nav className={`${styles.navigation}`}>
      <div className='flex items-center'>
        <div className='font-body02-medium flex items-center mr-26'>
          <Image
            src={'/icon/nftbank_icon.svg'}
            width={20}
            height={20}
            alt='nftbank logo'
          />
          <NFTBankLogo className={`fill-[var(--color-icon-main)]`} />
        </div>
        <Link
          href={'/portfolio'}
          className={` ${styles.link} ${
            path.includes('/portfolio') ? 'text-[var(--color-text-main)]' : ''
          }`}
        >
          Portfolio
        </Link>
        <Link
          href={'/watch'}
          className={`${styles.link} ${
            path.includes('/watch') ? 'text-[var(--color-text-main)]' : ''
          }`}
        >
          Watchlist
        </Link>
        <Link
          href={'/activity'}
          className={` ${styles.link} ${
            path.includes('/activity') ? 'text-[var(--color-text-main)]' : ''
          }`}
        >
          Activities
        </Link>
        <Link
          href={'/report'}
          className={` ${styles.link} ${
            path.includes('/report') ? 'text-[var(--color-text-main)]' : ''
          }`}
        >
          Report
        </Link>
        <Link
          href={'/settings'}
          className={` ${styles.link} ${
            path.includes('/settings') ? 'text-[var(--color-text-main)]' : ''
          }`}
        >
          Settings
        </Link>
      </div>
      <div className='w-[360px]'>
        <SearchBar />
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
          <div className='flex items-center justify-center border-1 border-[var(--color-border-bold)] rounded-full h-20 w-20 mr-8 '>
            {currency === 'eth' ? <EthereumIcon /> : <Usd />}
          </div>
          {currency.toUpperCase()}
        </Button>
        <Button id='logout' onClick={() => handleClickLogout()}>
          <p>Logout</p>
        </Button>
        {/* 내계정 */}
        {me && mySelectedInformation && (
          <PortfolioSelector
            user={me}
            portfolioParam={mySelectedInformation}
            setPortfolioParam={setMySelectedInformation}
          />
        )}
      </div>
    </nav>
  );
};
export default GlobalNavigation;
