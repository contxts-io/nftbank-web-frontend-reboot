import Image from 'next/image';
import styles from './GlobalNavigation.module.css';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ThemeSwitcher } from './buttons/ThemeSwitcher';
import NFTBankIcon from '@/public/icon/NFTBankIcon';
import NFTBankLogo from '@/public/logo/NFTBankLogo';

const GlobalNavigation = () => {
  return (
    <nav
      className={`${styles.navigation} border-border-main-light dark:border-border-main-dark`}
    >
      <div className='flex items-center'>
        <div className='flex items-center mr-26'>
          <Image
            src={'/icon/nftbank_icon.svg'}
            width={20}
            height={20}
            alt='nftbank logo'
          />
          <NFTBankLogo />
        </div>
        <Link
          href={'/portfolio'}
          className={twMerge(`font-body02-medium ${styles.link}`)}
        >
          Portfolio
        </Link>
        <Link
          href={'/watchlist'}
          className={twMerge(
            `font-body02-medium text-text-brand-light dark:text-text-warning-dark`
          )}
        >
          Watchlist
        </Link>
        <Link
          href={'/activitys'}
          className={twMerge(`font-body02-medium ${styles.link}`)}
        >
          Activitys
        </Link>
        <Link
          href={'/report'}
          className={twMerge(`font-body02-medium ${styles.link}`)}
        >
          Report
        </Link>
        <Link
          href={'/settings'}
          className={twMerge(`font-body02-medium ${styles.link}`)}
        >
          Settings
        </Link>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};
export default GlobalNavigation;
