'use client';
import { usePathname, useRouter } from 'next/navigation';
import styles from './AsideMenu.module.css';
import Link from 'next/link';
import { Cookies, useCookies } from 'react-cookie';
import { Button } from '@nextui-org/react';

const AsideMenu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['nb_session']);
  const handleSignOut = () => {
    try {
      removeCookie('nb_session', { path: '/' });
      router.push('/portfolio/overview/sample');
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <aside className={styles.container}>
      <ul className={`font-body02-medium ${styles.menuWrapper}`}>
        <Link
          href={'/settings/account'}
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
        {/* <Link
          href={''}
          className={`${styles.li} ${
            pathName.includes('newsletter') ? styles.active : ''
          }`}
        >
          Newsletter
        </Link> */}
        <Button className={styles.li} onClick={() => handleSignOut()}>
          Sign out
        </Button>
      </ul>
    </aside>
  );
};
export default AsideMenu;
