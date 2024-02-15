'use client';
import DiscordLogo from '@/public/logo/DiscordLogo';
import styles from './Footer.module.css';
import TwitterLogo from '@/public/logo/TwitterLogo';
import { usePathname } from 'next/navigation';
import Footer from './landing/Footer';
import siteMetadata from '@/utils/siteMetadata';
const GlobalFooter = () => {
  const path = usePathname();
  if (path.includes('/landing') || path.includes('/blog')) return <Footer />;
  return (
    <footer className={`font-button03-regular ${styles.footerWrapper}`}>
      <ul className='flex'>
        <li onClick={() => window.open(siteMetadata.discord, '_blank')}>
          <DiscordLogo />
        </li>
        <li onClick={() => window.open(siteMetadata.twitter, '_blank')}>
          <TwitterLogo />
        </li>
        <li onClick={() => window.open(siteMetadata.privacyPolicy, '_blank')}>
          Privacy
        </li>
        <li onClick={() => window.open(siteMetadata.termsOfUse, '_blank')}>
          Terms
        </li>
        <li
          onClick={() =>
            window.open(`mailto:${siteMetadata.contactEmail}`, '_blank')
          }
        >
          Feedback
        </li>
        <li onClick={() => window.open(siteMetadata.medium, '_blank')}>Blog</li>
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
