import DiscordLogo from '@/public/logo/DiscordLogo';
import styles from './Footer.module.css';
import TwitterLogo from '@/public/logo/TwitterLogo';
const Footer = () => {
  return (
    <footer
      className={`font-button03-regular ${styles.footerWrapper} dark:text-text-subtlest-dark dark:fill-background-accent-gray-bolder-dark dark:border-border-main-dark dark:bg-etc-footer-dark`}
    >
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
export default Footer;
