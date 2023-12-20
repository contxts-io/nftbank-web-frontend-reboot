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
    </footer>
  );
};
export default GlobalFooter;
