'use client';
import Image from 'next/image';
import ShareNetwork from '@/public/icon/ShareNetwork';
import Eye from '@/public/icon/Eye';
import { useMe } from '@/utils/hooks/queries/auth';
import { useEffect, useState } from 'react';
import styles from './ProfileComponent.module.css';
import PortfolioSelector from '../PortfolioSelector';
import { useAtom, useAtomValue } from 'jotai';
import { portfolioUserAtom } from '@/store/portfolio';
import { useUser } from '@/utils/hooks/queries/user';
import BlockiesIcon from '../BlockiesIcon';
import { myDefaultPortfolioAtom } from '@/store/settings';
import Wallet from '@/public/icon/Wallet';
import { BasicParam } from '@/interfaces/request';
const ProfileComponent = () => {
  const [isClient, setIsClient] = useState(false);
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  // const { data: me, status } = useMe();
  const { data: user, status: userStatus } = useUser(
    portfolioUser?.nickname || ''
  );

  const [mySelectedInformation, setMySelectedInformation] = useAtom(
    myDefaultPortfolioAtom
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    console.log('portfolioUser.walletAddress', portfolioUser.walletAddress);
    mySelectedInformation &&
      console.log('user user user', mySelectedInformation.walletAddress);
  }, [mySelectedInformation, portfolioUser.walletAddress]);
  // if (status === 'loading') return <div>loading</div>;
  // if (isClient && !user) return <section>loading</section>;
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
                {portfolioUser && (
                  <BlockiesIcon
                    walletAddress={`${
                      portfolioUser.walletAddress || portfolioUser.walletGroupId
                    }`}
                    size={56}
                  />
                )}
              </div>
            )}
            <div className='my-1 flex flex-col justify-between h-56'>
              <div className='flex items-center'>
                <h2
                  className={`font-subtitle01-bold mr-16 text-text-main dark:text-text-main-dark`}
                >
                  {user
                    ? user.nickname || 'Welcome'
                    : portfolioUser.walletAddress?.substring(0, 8)}
                </h2>
                <ShareNetwork className='mr-12 fill-[var(--color-icon-subtle)]' />
                <Eye className=' fill-[var(--color-icon-subtle)]' />
              </div>
              {/* <div className='font-caption-regular flex items-center text-[var(--color-text-subtle)]'>
                <span className='flex items-center mr-16'>
                  <WalletFilled
                    className='mr-4 fill-[var(--color-icon-disabled)]'
                    width={14}
                    height={14}
                  />
                  {`Wallet ${walletList?.data.length}`}
                </span>
                <span className='flex items-center'>
                  <FolderFilled
                    className='mr-4 fill-[var(--color-icon-disabled)] '
                    width={14}
                    height={14}
                  />
                  {`group ${walletGroupList?.data.length}`}
                </span>
              </div> */}
              <div className='mt-8'>
                {/* 누군가의 계정 */}
                {user ? (
                  <PortfolioSelector
                    className={styles.selectorButton}
                    position='left-0 top-36'
                    user={user}
                    portfolioParam={portfolioUser}
                    setPortfolioParam={setPortfolioUser}
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
