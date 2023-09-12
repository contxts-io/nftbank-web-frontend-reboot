import Link from 'next/link';
import styles from './Navigation.module.css';
const Navigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <p className={styles.pLogo}>NFTBank</p>
        <Link href={'/'} className='ml-16'>
          home
        </Link>
        <Link href={'/portfolio/inventory'} className='ml-16'>
          Portfolio
        </Link>
      </div>
      <div></div>
    </div>
  );
};
export default Navigation;
