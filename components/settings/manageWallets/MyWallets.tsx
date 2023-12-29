import SearchInput from '@/components/searchInput/SearchInput';
import styles from './MyWallets.module.css';
import SubmitButton from '@/components/buttons/SubmitButton';
import { useInventoryValue } from '@/utils/hooks/queries/inventory';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency } from '@/utils/common';
import WalletListTable from './WalletListTable';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { networkIdAtom, portfolioUserAtom } from '@/store/portfolio';
import EditWallet from '@/components/wallet/EditWallet';
import { TWallet } from '@/interfaces/inventory';
import DeleteWallet from '@/components/wallet/DeleteWallet';
import { openModalAtom } from '@/store/settings';
import { useMe } from '@/utils/hooks/queries/auth';
const MyWallets = () => {
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const networkId = useAtomValue(networkIdAtom);
  const [showGlobalModal, setShowGlobalModal] = useAtom(openModalAtom);
  const [showModal, setShowModal] = useState<'edit' | 'delete' | null>(null);
  const { data: inventoryValue } = useInventoryValue({
    nickname: me?.nickname || '',
    networkId: networkId,
  });
  const [selectedWallet, setSelectedWallet] = useState<TWallet | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>('');

  const handleEditWallet = (wallet: TWallet, name: 'edit' | 'delete') => {
    setSelectedWallet(wallet);
    setShowModal(name);
  };
  const handleChangeInput = (text: string) => {
    setSearchAddress(text);
  };
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
            <SearchInput
              placeholder='Wallet Address, Wallet Name'
              value={searchAddress}
              onChange={handleChangeInput}
            />
          </div>
          <SubmitButton
            id=''
            onClick={() => setShowGlobalModal('walletConnect')}
          >
            Add Wallets
          </SubmitButton>
        </div>
      </div>
      <WalletListTable
        onClickWallet={handleEditWallet}
        searchAddress={searchAddress}
      />
      <ReactModal
        isOpen={showModal !== null}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModal(null);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-full h-full'>
          {showModal === 'edit' && selectedWallet && (
            <EditWallet
              searchAddress={searchAddress}
              onClose={() => setShowModal(null)}
              wallet={selectedWallet}
            />
          )}
          {showModal === 'delete' && selectedWallet && (
            <DeleteWallet
              searchAddress={searchAddress}
              onClose={() => setShowModal(null)}
              wallet={selectedWallet}
            />
          )}
        </div>
      </ReactModal>
    </section>
  );
};
export default MyWallets;
