'use client';
import Image from 'next/image';
import styles from './TopNav.module.css';
import NFTBankLogo from '@/public/logo/NFTBankLogo';
import Link from 'next/link';
import Button from '../buttons/Button';
import { useEffect, useRef, useState } from 'react';
const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className='min-w-[1170px] flex items-center'>
        <div className='font-body02-medium flex items-center mr-[240px]'>
          <Image
            src={'/icon/nftbank_icon.svg'}
            width={20}
            height={20}
            alt='nftbank logo'
          />
          <NFTBankLogo className={`fill-[var(--color-icon-main)]`} />
        </div>
        <div className='flex flex-1 items-center'>
          <div className='font-button03-regular flex items-center gap-x-40'>
            <Link href={'/portfolio/overview'}>Portfolio</Link>
            <Link href={'/portfolio/overview'}>Reports</Link>
            <Link href={'/portfolio/overview'}>Chrome Extension</Link>
            <Link href={'/portfolio/overview'}>Developers</Link>
            <Link href={'/portfolio/overview'}>Blog</Link>
            <div
              className='cursor-pointer relative'
              ref={listRef}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Help Center
              {isOpen && (
                <div
                  className={`absolute top-30 left-[-50px] font-button03-medium ${styles.dropdown}`}
                >
                  <div>
                    <p>Contact Us via Discord</p>
                  </div>
                  <div>
                    <p>Contact Us via Email</p>
                  </div>
                  <div>
                    <p>FAQ</p>
                  </div>
                  <div>
                    <p>Terms of use</p>
                  </div>
                  <div>
                    <p>Privacy policy</p>
                  </div>
                  <div>
                    <p>Disclaimer</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button id='' className={styles.startButton}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TopNav;
