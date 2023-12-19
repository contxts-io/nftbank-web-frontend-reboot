import styles from './Footer.module.css';
import DiscordLogo from '@/public/logo/DiscordLogo';
import TwitterLogo from '@/public/logo/TwitterLogo';
import Image from 'next/image';
import Button from '../buttons/Button';

const Footer = () => {
  return (
    <div className='font-caption-regular w-full h-195 py-40 flex justify-center'>
      <div className='w-[1170px] flex justify-between items-start'>
        <div>
          <Image
            src='/logo/NFTBankLogoFull.svg'
            width='136'
            height='27'
            alt=''
          />
          <p className='mt-8 text-[var(--color-text-subtlest)]'>
            Copyright © Contxts.io. Ltd. All rights reserved.
          </p>
          <ul className='mt-26 flex items-center gap-x-20'>
            <li className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'>
              Contact Us via Discord
            </li>
            <li className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'>
              Contact Us via Email
            </li>
            <li className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'>
              Terms of Use
            </li>
            <li className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'>
              Privacy Policy
            </li>
            <li className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'>
              Disclaimer
            </li>
            <li className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'>
              FAQ
            </li>
          </ul>
        </div>
        <div className='flex items-center gap-x-8'>
          <Button id='' className={styles.snsButton}>
            <DiscordLogo className='fill-[var(--color-background-brand-boldest)]' />
          </Button>
          <Button id='' className={styles.snsButton}>
            <TwitterLogo className='fill-[var(--color-background-brand-boldest)]' />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Footer;
