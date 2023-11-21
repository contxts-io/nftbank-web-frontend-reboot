'use client';
import Wallet from '@/public/icon/Wallet';
import Button from '../buttons/Button';
import styles from './SelectSignInMethod.module.css';
import Google from '@/public/icon/Google';
import Email from '@/public/icon/Email';
import ReactModal from 'react-modal';
import { useState } from 'react';
import CloseX from '@/public/icon/CloseX';
import ConnectWallet from './ConnectWallet';
import { useRouter } from 'next/navigation';
const SelectSignInMethod = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleClickEmail = () => {
    router.push('/auth/email');
  };
  return (
    <>
      <section className={styles.container}>
        <div className={styles.body}>
          <h2 className={`font-body01-regular ${styles.title}`}>
            Welcome to NFTBank! <br />
            Connect your wallet to get started
          </h2>
          <div className={styles.methodContainer}>
            <Button
              id=''
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              <Wallet className={styles.icon} />
              <p>Continue with Wallet</p>
            </Button>
            <Button id='' className={styles.button}>
              <Google className={styles.icon} />
              <p>Continue with Google</p>
            </Button>
            <Button
              id=''
              className={styles.button}
              onClick={() => handleClickEmail()}
            >
              <Email className={styles.icon} />
              <p>Continue with Email</p>
            </Button>
          </div>
        </div>
      </section>
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
export default SelectSignInMethod;
