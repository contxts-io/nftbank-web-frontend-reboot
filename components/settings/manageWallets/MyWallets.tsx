import SearchInput from '@/components/searchInput/SearchInput';
import styles from './MyWallets.module.css';
import SubmitButton from '@/components/buttons/SubmitButton';
import { useInventoryValue } from '@/utils/hooks/queries/inventory';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency } from '@/utils/common';
import WalletListTable from './WalletListTable';
import { useEffect } from 'react';
const MyWallets = () => {
  const currency = useAtomValue(currencyAtom);
  const { data: walletList } = useMyWalletList();
  const { data: inventoryValue } = useInventoryValue(
    walletList?.data[0]?.walletAddress || ''
  );
  useEffect(() => {
    console.log('walletList', walletList?.data[0]?.walletAddress);
  }, [walletList]);
  return (
    <section className={styles.container}>
      <div className={styles.summary}>
        <span
          className={`font-caption-medium text-[var(--color-text-subtlest)]`}
        >
          Current Balance
        </span>
        <p className={`mt-8 font-header03-bold`}>
          {formatCurrency(
            inventoryValue?.value[currency].amount || '-',
            currency
          )}
        </p>
        <div className='w-full flex justify-between mt-32'>
          <div className='w-[320px]'>
            <SearchInput placeholder='Wallet Address, Wallet Name' />
          </div>
          <SubmitButton id=''>Add Wallets</SubmitButton>
        </div>
      </div>
      <WalletListTable />
    </section>
  );
};
export default MyWallets;
