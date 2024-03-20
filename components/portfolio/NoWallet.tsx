'use client';
import { useState } from 'react';
import Button from '../buttons/Button';
import styles from './NoWallet.module.css';
import WalletAddIcon from '@/public/icon/WalletAddIcon';
import ReactModal from 'react-modal';
import ConnectWallet from '../auth/ConnectWallet';

const NoWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    console.log('open modal');
    setShowModal(true);
  };
  return (
    <>
      <div className={styles.container}>
        <WalletAddIcon className='mb-12' />
        <p className='font-button01-medium text-[var(--color-text-main)] mb-8'>
          No Wallets
        </p>
        <p className='font-body02-regular text-[var(--color-text-subtle)] mb-40'>
          Connect your wallet and check your portfolio!
        </p>
        <Button
          id='add_wallets'
          className={`font-body02-medium ${styles.addButton}`}
          onClick={() => openModal()}
        >
          Add Wallets
        </Button>
      </div>

      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModal(false);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-full h-full'>
          <ConnectWallet onClose={() => setShowModal(false)} />
        </div>
      </ReactModal>
    </>
  );
};
export default NoWallet;
