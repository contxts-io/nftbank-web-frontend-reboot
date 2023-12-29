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
  portfolioUserAtom,
} from '@/store/portfolio';
import { useUser } from '@/utils/hooks/queries/user';
import BlockiesIcon from '../BlockiesIcon';
import { myDefaultPortfolioAtom } from '@/store/settings';
import Wallet from '@/public/icon/Wallet';
import { BasicParam } from '@/interfaces/request';
import { TUser } from '@/interfaces/user';
import { usePathname } from 'next/navigation';
const ProfileComponent = () => {
  const { data: me } = useMe();
  const path = usePathname();
  const [isClient, setIsClient] = useState(false);
  const networkId = useAtomValue(networkIdAtom);

  const [nickname, setNickname] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  // const [user, setUser] = useState<TUser | null>(null);
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  // const { data: me, status } = useMe();
  const { data: user, status: userStatus } = useUser(nickname);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    path && setNickname(path.split('nickname/')[1] || null);
    path && setWalletAddress(path.split('walletAddress/')[1] || null);
    path &&
      !path.split('nickname/')[1] &&
      !path.split('walletAddress/')[1] &&
      me?.nickname &&
      setNickname(me.nickname);
  }, [path, me?.nickname]);
  useEffect(() => {
    nickname
      ? setPortfolioUser({ nickname: nickname, networkId: networkId })
      : walletAddress
      ? setPortfolioUser({ walletAddress: walletAddress, networkId: networkId })
      : null;
  }, [nickname, walletAddress]);
  return (
    <>
      {isClient ? (
        <section className='w-full px-24 py-24 flex items-center justify-between'>
          <div className='flex items-center'>
            {user?.image ? (
              <Image
                src={`${user.image || '/icon/nftbank_icon.svg'}`}
                width={56}
                height={56}
                alt='nftbank logo'
                className={`w-56 h-56 mr-20 rounded-full border-1 border-border-main dark:border-border-main-dark overflow-hidden`}
              />
            ) : (
              <div className='flex mr-20  items-center text-[var(--color-text-subtle)] rounded-full border-1 border-border-main dark:border-border-main-dark overflow-hidden'>
                <BlockiesIcon
                  walletAddress={`${nickname || walletAddress}`}
                  size={56}
                />
              </div>
            )}
            <div className='my-1 flex flex-col justify-between h-56'>
              <div className='flex items-center'>
                <h2
                  className={`font-subtitle01-bold mr-16 text-text-main dark:text-text-main-dark`}
                >
                  {walletAddress?.substring(0, 8) || nickname || 'Welcome'}
                </h2>
                <ShareNetwork className='mr-12 fill-[var(--color-icon-subtle)]' />
                <Eye className=' fill-[var(--color-icon-subtle)]' />
              </div>
              <div className='mt-8'>
                {/* 누군가의 계정 */}
                {user && portfolioUser ? (
                  <PortfolioSelector
                    className={styles.selectorButton}
                    position='left-0 top-36'
                    user={user}
                    portfolioParam={portfolioUser}
                    setPortfolioParam={(param) => setPortfolioUser(param)}
                  />
                ) : (
                  <div className='font-caption-regular text-[var(--color-text-subtle)] bg-[var(--color-elevation-sunken)] w-fit px-8 h-24 flex items-center justify-center gap-x-8'>
                    <Wallet />
                    <p>All Wallet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <p className='font-caption-medium mb-8 text-[var(--color-text-subtlest)]'>
              Current Balance
            </p>
            <p className='font-header03-bold mb-4 text-[var(--color-text-main)]'>
              $173,398
            </p>
            <div className='font-caption-medium flex'>
              <div className='px-8 py-4 bg-[var(--color-background-danger)]'>
                <p className='text-[var(--color-text-danger)]'>-2,117(2.3%)</p>
              </div>
              <div className='px-8 py-4 bg-[var(--color-elevation-surface-raised)]'>
                <p className='text-[var(--color-text-main)]'>24h</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>loading</section>
      )}
    </>
  );
};
export default ProfileComponent;
