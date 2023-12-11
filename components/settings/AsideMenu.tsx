'use client';
import { usePathname } from 'next/navigation';
import styles from './AsideMenu.module.css';
const AsideMenu = () => {
  const pathName = usePathname();
  return (
    <aside className={styles.container}>
      <ul className={`font-body02-medium ${styles.menuWrapper}`}>
        <li>
          <a href='#'>Account</a>
        </li>
        <li className={pathName.includes('manageWallets') ? styles.active : ''}>
          <a href='/settings/manageWallets'>Manage Wallets</a>
        </li>
        <li>
          <a href='#'>Newsletter</a>
        </li>
        <li>
          <a href='#'>Sign out</a>
        </li>
      </ul>
    </aside>
  );
};
export default AsideMenu;
