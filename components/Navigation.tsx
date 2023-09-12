import Link from 'next/link';
import styles from './Navigation.module.css';
const Navigation = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.menu}>
        <p className={styles.pLogo}>NFTBank</p>
        <ul>
          <Link href={'/'} className='ml-16'>
            home
          </Link>
        </ul>
        <ul>
          <Link href={'/portfolio/inventory'} className='ml-16'>
            Portfolio
          </Link>
        </ul>
      </div>
      <div></div>
    </nav>
  );
};
export default Navigation;
