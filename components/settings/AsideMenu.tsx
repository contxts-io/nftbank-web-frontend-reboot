'use client';
import { usePathname } from 'next/navigation';
import styles from './AsideMenu.module.css';
import Link from 'next/link';
const AsideMenu = () => {
  const pathName = usePathname();
  return (
    <aside className={styles.container}>
      <ul className={`font-body02-medium ${styles.menuWrapper}`}>
        <Link
          href={''}
          className={`${styles.li} ${
            pathName.includes('account') ? styles.active : ''
          }`}
        >
          Account
        </Link>
        <Link
          className={`${styles.li} ${
            pathName.includes('manageWallets') ? styles.active : ''
          }`}
          href='/settings/manageWallets'
        >
          Manage Wallets
        </Link>
        <Link
          href={''}
          className={`${styles.li} ${
            pathName.includes('newsletter') ? styles.active : ''
          }`}
        >
          Newsletter
        </Link>
        <Link
          href={''}
          className={`${styles.li} ${
            pathName.includes('signout') ? styles.active : ''
          }`}
        >
          Sign out
        </Link>
      </ul>
    </aside>
  );
};
export default AsideMenu;
