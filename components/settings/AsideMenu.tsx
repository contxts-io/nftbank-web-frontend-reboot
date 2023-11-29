import styles from './AsideMenu.module.css';
const AsideMenu = () => {
  return (
    <aside className={styles.container}>
      <ul className={`font-body02-medium ${styles.menuWrapper}`}>
        <li>
          <a href='#'>Account</a>
        </li>
        <li>
          <a href='#'>Manage Wallets</a>
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
