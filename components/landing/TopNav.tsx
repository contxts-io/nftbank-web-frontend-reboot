import Image from 'next/image';
import styles from './TopNav.module.css';
import NFTBankLogo from '@/public/logo/NFTBankLogo';
import Link from 'next/link';
import Button from '../buttons/Button';
const TopNav = () => {
  return (
    <div className={styles.container}>
      <div className='font-body02-medium flex items-center mr-26'>
        <Image
          src={'/icon/nftbank_icon.svg'}
          width={20}
          height={20}
          alt='nftbank logo'
        />
        <NFTBankLogo className={`fill-[var(--color-icon-main)]`} />
      </div>
      <div className='flex items-center'>
        <ul className='font-button03-regular flex items-center gap-x-40'>
          <Link href={'/portfolio/overview'}>Portfolio</Link>
          <Link href={'/portfolio/overview'}>Reports</Link>
          <Link href={'/portfolio/overview'}>Chrome Extension</Link>
          <Link href={'/portfolio/overview'}>Developers</Link>
          <Link href={'/portfolio/overview'}>Blog</Link>
          <Link href={'/portfolio/overview'}>Help Center</Link>
        </ul>
        <Button id='' className={styles.startButton}>
          Get Started
        </Button>
      </div>
    </div>
  );
};
export default TopNav;
