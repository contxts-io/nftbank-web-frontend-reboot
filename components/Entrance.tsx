'use client';
import NFTBankLogo from '@/public/logo/NFTBankLogo';
import Image from 'next/image';
import SearchInput from './searchInput/SearchInput';
import { useEffect, useState } from 'react';
import styles from './Entrance.module.css';
import Button from './buttons/Button';
import ArrowElbowDownLeft from '@/public/icon/ArrowElbowDownLeft';
import { useSearchUserList } from '@/utils/hooks/queries/search';
import { useRouter } from 'next/navigation';
import { getAddress } from 'ethers/lib/utils';
const Entrance = () => {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  // const { data: searchResult, status: searchStatus } =
  //   useSearchUserList(searchAddress);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const handleChangeInput = (text: string) => {
    console.log('value', text);
    setWalletAddress(() => text);
  };
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
        router.push(`/portfolio/overview/walletAddress/${walletAddress}`);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [walletAddress]);

  const handleClickEnter = () => {
    try {
      getAddress(walletAddress);
      setError(null);
      router.push(`/portfolio/overview/walletAddress/${searchAddress}`);
    } catch (error) {
      setError('Invalid wallet address');
      setSearchAddress(null);
    }
  };
  useEffect(() => {
    try {
      walletAddress !== '' && getAddress(walletAddress);
      setError(null);
      setSearchAddress(walletAddress);
    } catch (error) {
      setError('Invalid wallet address');
      setSearchAddress(null);
    }
  }, [walletAddress]);

  return (
    <div className={styles.container}>
      <div className='font-body02-medium flex h-56 items-center mr-26'>
        <Image
          src={'/icon/nftbank_icon.svg'}
          width={20}
          height={20}
          alt='nftbank logo'
          className='border-0 mr-8'
        />
        <NFTBankLogo className={`fill-[var(--color-icon-main)]`} />
      </div>
      <div className='mt-8 mb-40 flex flex-col gap-y-8'>
        <p>Welcome to NFTBank V2!</p>
        <p>Search your wallet to get started</p>
      </div>
      <SearchInput
        placeholder='Search any Wallet'
        value={walletAddress}
        onChange={(text) => handleChangeInput(text)}
        isError={error ? true : false}
      />
      {error && (
        <p className='font-caption-regular mt-8 text-[var(--color-text-danger)]'>
          {error}
        </p>
      )}
      <Button
        id='enterButton'
        className={`font-caption-regular ${styles.enterButton} 
        ${error && styles.disabled}
        ${searchAddress && styles.active}`}
        onClick={() => handleClickEnter()}
      >
        Enter
        <ArrowElbowDownLeft />
      </Button>
    </div>
  );
};
export default Entrance;
