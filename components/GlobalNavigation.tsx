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
import {
  useMutationSignOut,
  useMutationUpdateMe,
} from '@/utils/hooks/mutations/auth';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';
import { useDisconnect as useDisconnectThirdWeb } from '@thirdweb-dev/react';
import { connectedWalletAddressAtom } from '@/store/account';
import { myDefaultPortfolioAtom } from '@/store/settings';
import PortfolioSelector from './PortfolioSelector';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { getAddress } from 'ethers/lib/utils';
import SearchInput from './searchInput/SearchInput';
import { verifyWalletAddress } from '@/apis/wallet';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCookies } from 'react-cookie';
import { BasicParam } from '@/interfaces/request';
import { TCurrency } from '@/interfaces/constants';

const GlobalNavigation = () => {
  const router = useRouter();
  const path = usePathname();
  const { data: me, status: signInStatus } = useMe();
  const { mutate: signOut } = useMutationSignOut();
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();
  const disconnectThirdWeb = useDisconnectThirdWeb();
  const [connectedWalletAddress, setConnectedWalletAddress] = useAtom(
    connectedWalletAddressAtom
  );
  const [myDefaultPortfolio, setMyDefaultPortfolio] = useAtom(
    myDefaultPortfolioAtom
  );
  const [currency, setCurrency] = useAtom(currencyAtom);
  const [isGhost, setIsGhost] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [verify, setVerify] = useState<Boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const { mutate: updateMe, status: updateMeStatus } = useMutationUpdateMe();
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setError(null);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    me && setCurrency(me.config.currency);
  }, [me]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
        // verify &&
        //   isChecking === false &&
        //   router.push(`/portfolio/overview/walletAddress/${walletAddress}`);
        handleClickEnter();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [walletAddress, error]);

  useEffect(() => {
    // updateMe({ currency: currency });
  }, [currency]);
  useEffect(() => {
    setWalletAddress('');
    setError(null);
  }, [path]);
  useEffect(() => {
    setVerify(false);
    if (walletAddress == '') {
      setError(null);
      return;
    }
    try {
      Boolean(walletAddress !== '') && getAddress(walletAddress);
      // handleClickEnter();
    } catch (error) {
      setError('Invalid wallet address');
      setSearchAddress(null);
    }
  }, [walletAddress]);
  // const handleClickEnter = async () => {
  //   setIsChecking(true);
  //   try {
  //     getAddress(walletAddress);
  //     const result = await verifyWalletAddress(walletAddress);
  //     if (result.data.verified === true) {
  //       console.log('handleClickEnter result verified', result);
  //       console.log();
  //       setError(null);
  //       // router.push(`/portfolio/overview/walletAddress/${walletAddress}`);
  //       setVerify(true);
  //       setIsChecking(false);
  //     } else {
  //       console.log('handleClickEnter result unverified', result);
  //       setError('Invalid wallet address');
  //       setVerify(false);
  //       setIsChecking(false);
  //     }
  //   } catch (error) {
  //     setError('Invalid wallet address');
  //     setSearchAddress(null);
  //     setVerify(false);
  //     setIsChecking(false);
  //   }
  // };

  const handleClickEnter = async () => {
    setIsChecking(true);
    walletAddress !== '' &&
      sendGTMEvent({
        event: 'inputTextChanged',
        name: 'top_nav_search',
        parameter: `search_${walletAddress}`,
      });
    try {
      getAddress(walletAddress);
      const result = await verifyWalletAddress(walletAddress);
      if (result.data.verified === true) {
        setError(null);
        setIsChecking(false);
        router.push(`/portfolio/overview/walletAddress/${walletAddress}`);
      } else {
        setError('Invalid wallet address');
        setIsChecking(false);
      }
    } catch (error) {
      setError('Invalid wallet address');
      setSearchAddress(null);
      setIsChecking(false);
    } finally {
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const changeCurrency = (currency: TCurrency) => {
    updateMe({ currency: currency === 'eth' ? 'usd' : 'eth' });
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
  const handleChangeInput = (text: string) => {
    console.log('value', text);
    setWalletAddress(text);
  };
  const [isClient, setIsClient] = useState(false);

  const handleClickRow = (row: BasicParam) => {
    Boolean(row.nickname && row.nickname !== '') &&
      setMyDefaultPortfolio({
        nickname: row.nickname,
        networkId: 'ethereum',
      });
    Boolean(row.walletGroupId && row.walletGroupId !== '') &&
      setMyDefaultPortfolio({
        walletGroupId: row.walletGroupId,
        networkId: 'ethereum',
      });
    Boolean(row.walletAddress && row.walletAddress !== '') &&
      setMyDefaultPortfolio({
        walletAddress: row.walletAddress,
        networkId: 'ethereum',
      });
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
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
            className='border-0'
          />
          <NFTBankLogo className={`fill-[var(--color-icon-main)]`} />
          <div className='ml-6 rounded-full px-8 flex items-center justify-center bg-[var(--color-background-brand-bold)] '>
            <p className='font-caption-medium text-[var(--color-text-inverse)]'>
              V2
            </p>
          </div>
        </div>
        {path !== '/' && !path.includes('/auth') && (
          <>
            <Link
              href={'/portfolio'}
              className={` ${styles.link} ${
                path.includes('/portfolio')
                  ? 'text-[var(--color-text-main)]'
                  : ''
              }`}
            >
              Portfolio
            </Link>
            {isClient && me && (
              <Link
                href={'/settings'}
                className={` ${styles.link} ${
                  path.includes('/settings')
                    ? 'text-[var(--color-text-main)]'
                    : ''
                }`}
              >
                Settings
              </Link>
            )}
          </>
        )}
        {/* <Link
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
        </Link> */}
      </div>
      {/* <div className='w-[360px]'>
        <SearchBar />
        
      </div> */}
      {path !== '/' && !path.includes('/auth') && (
        <div className='hidden md:block'>
          <SearchInput
            placeholder='Search any Wallet'
            value={walletAddress}
            onChange={(text) => handleChangeInput(text)}
            isError={error ? true : false}
            className={styles.searchInput}
            isLoading={isChecking}
            handleClose={() => setWalletAddress('')}
          />
        </div>
      )}

      <div className={`${styles.buttonBox}`}>
        <div className='border-1 border-[var(--color-border-main)] mr-12 hidden md:inline'>
          <Button onClick={() => window.open('https://nftbank.ai')} id=''>
            Back to V1
          </Button>
        </div>
        {/* <Button id={'/global/wallet'}>
          <Wallet />
        </Button> 
        <Button id={'/global/ghost'} onClick={() => handleGhostMode()}>
          {isGhost ? <Ghost /> : <GhostOn />}
        </Button>*/}

        {path !== '/' && !path.includes('/auth') && (
          <>
            <div className='border-t-1 border-b-1 border-l-1 border-[var(--color-border-main)]'>
              <ThemeSwitcher />
            </div>
            <div className='border-1 border-[var(--color-border-main)]'>
              <Button
                id={'/global/currency'}
                onClick={() => changeCurrency(currency)}
                className='border-l-0'
              >
                <div className='flex items-center justify-center border-1 border-[var(--color-border-bold)] rounded-full h-20 w-20'>
                  {currency === 'eth' ? <EthereumIcon /> : <Usd />}
                </div>
              </Button>
            </div>
            <>
              {isClient && !me && (
                <Button
                  className='bg-[var(--color-background-brand-bold)] !h-34'
                  onClick={() => router.push('/auth/signin')}
                  id='get_started_top_nav'
                >
                  <p className='font-body02-regular text-[var(--color-text-inverse)]'>
                    Get Started
                  </p>
                </Button>
              )}
            </>
          </>
        )}
        {/* 내계정 */}
        {me && myDefaultPortfolio && (
          <div className='border-[var(--color-border-main)] border-1 border-l-0'>
            <PortfolioSelector
              user={me}
              portfolioParam={myDefaultPortfolio}
              setPortfolioParam={(param) => handleClickRow(param)}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
export default GlobalNavigation;
