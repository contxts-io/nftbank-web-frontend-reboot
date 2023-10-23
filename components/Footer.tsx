import DiscordLogo from '@/public/logo/DiscordLogo';
import styles from './Footer.module.css';
import TwitterLogo from '@/public/logo/TwitterLogo';
const Footer = () => {
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
export default Footer;
