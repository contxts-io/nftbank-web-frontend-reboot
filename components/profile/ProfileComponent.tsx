'use client';
import Image from 'next/image';
import ShareNetwork from '@/public/icon/ShareNetwork';
import Eye from '@/public/icon/Eye';
import { useMe } from '@/utils/hooks/queries/auth';
import { useEffect, useState } from 'react';
import styles from './ProfileComponent.module.css';
import PortfolioSelector from '../PortfolioSelector';
import { useAtom, useAtomValue } from 'jotai';
import {
  networkIdAtom,
  portfolioNicknameAtom,
  portfolioProfileAtom,
  portfolioUserAtom,
} from '@/store/portfolio';
import { useUser } from '@/utils/hooks/queries/user';
import BlockiesIcon from '../BlockiesIcon';
import Wallet from '@/public/icon/Wallet';
import { BasicParam } from '@/interfaces/request';
import { TUser } from '@/interfaces/user';
import { usePathname, useRouter } from 'next/navigation';
import { useInventoryValue } from '@/utils/hooks/queries/inventory';
import { currencyAtom } from '@/store/currency';
import { difference, formatCurrency, isPlus } from '@/utils/common';
import CurrencyComponent from '../p/Currency';
import SearchInput from '../searchInput/SearchInput';
import { getAddress } from 'ethers/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { verifyWalletAddress } from '@/apis/wallet';
import PortfolioSelectorWrapper from './PortfolioSelectorWrapper';
import SkeletonLoader from '../SkeletonLoader';
const ProfileComponent = () => {
  const { data: me, status } = useMe();
  const portfolioProfile = useAtomValue(portfolioProfileAtom);

  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const path = usePathname();
  const router = useRouter();
  const currency = useAtomValue(currencyAtom);
  const [isClient, setIsClient] = useState(false);
  const networkId = useAtomValue(networkIdAtom);

  const [nickname, setNickname] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>('');
  // const [user, setUser] = useState<TUser | null>(null);
  // const { data: me, status } = useMe();
  const { data: user, status: userStatus } = useUser(
    portfolioProfile?.nickname || ''
  );
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const { data: inventoryValue, status: statusInventoryValue } =
    useInventoryValue(portfolioUser);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (path.includes('/sample')) {
      setNickname('Welcome to NFTBank.ai');
      // setPortfolioUser({
      //   nickname: 'Welcome to NFTBank.ai',
      //   networkId: 'ethereum',
      // });
      return;
    }
    path && setNickname(path.split('nickname/')[1] || null);
    path && setWalletAddress(path.split('walletAddress/')[1] || null);
    path &&
      !path.split('nickname/')[1] &&
      !path.split('walletAddress/')[1] &&
      me?.nickname &&
      setNickname(me.nickname);
  }, [path, me?.nickname]);
  // useEffect(() => {
  //   portfolioUser?.nickname && setNickname(portfolioUser.nickname);
  //   portfolioUser?.walletAddress &&
  //     setWalletAddress(portfolioUser.walletAddress);
  // }, [portfolioUser]);
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
    if (searchAddress == '') {
      setError(null);
      return;
    }
    try {
      Boolean(searchAddress !== '') && getAddress(searchAddress);
      // handleClickEnter();
    } catch (error) {
      setError('Invalid wallet address');
    }
  }, [searchAddress]);
  useEffect(() => {
    console.log('ProfileComponent portfolioUser', portfolioUser);
  }, [portfolioUser]);
  const handleChangeInput = (text: string) => {
    console.log('value', text);
    setSearchAddress(text);
  };
  const handleClickEnter = async () => {
    setIsChecking(true);
    walletAddress !== '' &&
      sendGTMEvent({
        event: 'inputTextChanged',
        name: 'top_nav_search',
        parameter: `search_${walletAddress}`,
      });
    try {
      getAddress(searchAddress);
      const result = await verifyWalletAddress(searchAddress);
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
      setIsChecking(false);
    } finally {
    }
  };
  return (
    <>
      {isClient ? (
        <section className='w-full px-24 pt-20 md:pt-34 pb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-y-20'>
          {/* 모바일 전용 */}
          <div className='block md:hidden h-40 w-full'>
            <SearchInput
              placeholder='Search any Wallet'
              value={searchAddress || ''}
              onChange={(text) => handleChangeInput(text)}
              isError={error ? true : false}
              className={styles.searchInput}
              isLoading={isChecking}
              handleClose={() => setSearchAddress('')}
            />
          </div>
          <div>
            <div className='flex items-center'>
              {user?.image ? (
                <Image
                  src={`${user.image || '/icon/nftbank_icon.svg'}`}
                  width={56}
                  height={56}
                  alt='nftbank logo'
                  className={`w-56 h-56 mr-12 md:mr-20 rounded-full border-1 border-border-main dark:border-border-main-dark overflow-hidden`}
                />
              ) : (
                <div className='flex mr-12 md:mr-20 items-center text-[var(--color-text-subtle)] rounded-full border-1 border-[var(--color-border-main)] overflow-hidden'>
                  <BlockiesIcon
                    walletAddress={`${nickname || walletAddress}`}
                    size={56}
                  />
                </div>
              )}
              <h2
                className={`font-subtitle01-bold md:text-24 text-18 mr-16 text-text-main dark:text-text-main-dark`}
              >
                {walletAddress?.substring(0, 8) || nickname || 'Welcome'}
              </h2>
              {/**
                 * 
                 * 
                 * sprint 1
                 * 
                 * <ShareNetwork className='mr-12 fill-[var(--color-icon-subtle)]' />
                <Eye className=' fill-[var(--color-icon-subtle)]' /> */}
            </div>
            <div className='mt-12'>
              <PortfolioSelectorWrapper />
            </div>
          </div>
          <div className='flex flex-col md:items-end'>
            <p className='font-caption-medium mb-8 text-[var(--color-text-subtlest)]'>
              Current Balance
            </p>
            {statusInventoryValue === 'loading' ? (
              <SkeletonLoader className='w-200 h-40' />
            ) : (
              <CurrencyComponent
                value={formatCurrency(
                  inventoryValue?.value[currency]?.amount || '0',
                  currency
                )}
                className='font-header03-bold mb-4'
              />
            )}
            {/* <div className='font-caption-medium flex'>
              <div
                className={`px-8 py-4 bg-[var(--color-background-danger)] ${
                  isPlus(inventoryValue?.value[currency].difference.amount || 0)
                    ? 'bg-[var(--color-background-success)]'
                    : 'bg-[var(--color-background-danger)]'
                }`}
              >
                <p
                  className={`${
                    isPlus(
                      inventoryValue?.value[currency].difference.amount || 0
                    )
                      ? 'text-[var(--color-text-success)]'
                      : 'text-[var(--color-text-danger)]'
                  }`}
                >
                  {`${difference(
                    inventoryValue?.value[currency].difference.amount || '0',
                    currency
                  )}
                  (${difference(
                    inventoryValue?.value[currency].difference.percentage ||
                      '0',
                    'percent'
                  )})`}
                </p>
              </div>
              <div className='px-8 py-4 bg-[var(--color-elevation-surface-raised)]'>
                <p className='text-[var(--color-text-main)]'>24h</p>
              </div>
            </div> */}
          </div>
        </section>
      ) : (
        <section />
      )}
    </>
  );
};
export default ProfileComponent;
