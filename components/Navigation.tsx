import Link from 'next/link';
import styles from './Navigation.module.css';
const Navigation = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.menu}>
        <p className='font-header01-bold'>NFTBank</p>
        <ul>
          <Link href={'/'} className='ml-16'>
            <p className='text-background-brand-bold'>home</p>
            <p className='text-slate-500'>home</p>
          </Link>
        </ul>
        <ul>
          <Link href={'/portfolio'} className='ml-16'>
            Portfolio
          </Link>
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;
