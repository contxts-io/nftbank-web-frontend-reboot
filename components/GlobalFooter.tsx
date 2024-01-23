'use client';
import DiscordLogo from '@/public/logo/DiscordLogo';
import styles from './Footer.module.css';
import TwitterLogo from '@/public/logo/TwitterLogo';
import { usePathname } from 'next/navigation';
import Footer from './landing/Footer';
const GlobalFooter = () => {
  const path = usePathname();
  if (path.includes('/landing') || path.includes('/blog')) return <Footer />;
  return (
    <footer className={`font-button03-regular ${styles.footerWrapper}`}>
      <ul className='flex'>
        <li>
          <DiscordLogo />
        </li>
        <li>
          <TwitterLogo />
        </li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Feedback</li>
        <li>Blog</li>
      </ul>
      {/* <div className='ml-auto flex items-center gap-x-8'>
        <div className='border-1 border-[var(--color-border-success)] rounded-full w-16 h-16 relative'>
          <div
            className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-full animateBlink w-6 h-6 mr-4 bg-[var(--color-background-success-bold)]`}
          />
        </div>
        <p className='font-caption-regular text-[var(--color-text-success)]'>
          LIVE DATA
        </p>
      </div> */}
    </footer>
  );
};
export default GlobalFooter;
