'use client';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import BlockiesIcon from './BlockiesIcon';
import { useSearchUserList } from '@/utils/hooks/queries/search';
const RESULT = {
  user: [{ nickname: 'daram1', image: '/icon/nftbank_icon.svg' }],
  walletAddress: [
    { walletAddress: '0xcfb3ee49c46ab8a5665aad3c03c4b3aef743e80c' },
  ],
};
const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { data: searchResult, status: searchStatus } =
    useSearchUserList(searchText);
  return (
    <div className={`${styles.searchWrapper} font-caption-regular  relative`}>
      <div className={`${styles.container}`}>
        <input
          type='text'
          placeholder='User, Wallet, ENS'
          className={styles.textInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchStatus !== 'loading' && searchStatus !== 'success' && (
          <div className={styles.box}>F</div>
        )}
        {searchStatus === 'loading' && (
          <div>
            <Spinner />
          </div>
        )}
        {searchStatus === 'success' && <div className={styles.box}>ESC</div>}
      </div>
      <div className={`${styles.searchResult} absolute top-40 left-0`}>
        {RESULT.user.length > 0 && (
          <div>
            <div className={styles.resultHeader}>
              <p className='font-caption-medium text-[var(--color-text-subtlest)]'>
                User
              </p>
            </div>
            {RESULT.user.map((user, index) => {
              return (
                <div key={index} className={styles.resultBody}>
                  {user.image ? (
                    <Image
                      width={20}
                      height={20}
                      src={user.image}
                      alt=''
                      className='rounded-full border-1 border-[var(--color-border-main)]'
                    />
                  ) : (
                    <BlockiesIcon walletAddress={user.nickname} size={16} />
                  )}
                  <p className='font-caption-regular'>{user.nickname}</p>
                </div>
              );
            })}
          </div>
        )}
        {RESULT.walletAddress.length > 0 && (
          <div>
            <div className={styles.resultHeader}>
              <p className='font-caption-medium text-[var(--color-text-subtlest)]'>
                Wallet
              </p>
            </div>
            {RESULT.walletAddress.map((walletAddress, index) => {
              return (
                <div key={index} className={styles.resultBody}>
                  <BlockiesIcon
                    walletAddress={walletAddress.walletAddress}
                    size={16}
                  />
                  <p className='font-caption-regular'>
                    {walletAddress.walletAddress}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchBar;
