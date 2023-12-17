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
import { usePathname, useRouter } from 'next/navigation';
import { useMeManual } from '@/utils/hooks/queries/auth';
import { useMutationSignOut } from '@/utils/hooks/mutations/auth';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';
import { useDisconnect as useDisconnectThirdWeb } from '@thirdweb-dev/react';
import { connectedWalletAddressAtom } from '@/store/account';
import WalletAndGroupManage from './wallet/WalletAndGroupManage';
import { portfolioUserAtom } from '@/store/portfolio';
import BlockiesIcon from './BlockiesIcon';
import { myDefaultPortfolioAtom } from '@/store/settings';
import Folder from '@/public/icon/Folder';
import PortfolioSelector from './PortfolioSelector';
import SearchBar from './SearchBar';

const GlobalNavigation = () => {
  const path = usePathname();
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
  if (path === '/landing') return null;
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
          className={` ${styles.link} text-[var(--color-text-main)]`}
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
      <SearchBar />
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
        <PortfolioSelector />
      </div>
    </nav>
  );
};
export default GlobalNavigation;
