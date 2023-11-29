import SearchInput from '@/components/searchInput/SearchInput';
import styles from './MyWallets.module.css';
import SubmitButton from '@/components/buttons/SubmitButton';
const MyWallets = () => {
  return (
    <section className={styles.container}>
      <div className={styles.summary}>
        <span
          className={`font-caption-medium text-[var(--color-text-subtlest)]`}
        >
          Current Balance
        </span>
        <p className={`mt-8 font-header03-bold`}>$173,398.02</p>
        <div className='w-full flex justify-between mt-32'>
          <div className='w-[320px]'>
            <SearchInput placeholder='Wallet Address, Wallet Name' />
          </div>
          <SubmitButton id=''>Add Wallets</SubmitButton>
        </div>
      </div>
    </section>
  );
};
export default MyWallets;
