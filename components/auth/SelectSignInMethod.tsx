'use client';
import Wallet from '@/public/icon/Wallet';
import Button from '../buttons/Button';
import styles from './SelectSignInMethod.module.css';
import Google from '@/public/icon/Google';
import Email from '@/public/icon/Email';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import CloseX from '@/public/icon/CloseX';
import ConnectWallet from './ConnectWallet';
import { useRouter } from 'next/navigation';
import { getIdTokenByGoogle, logout } from '@/apis/firebase';
import { setCookie } from 'cookies-next';
import { getMe, sign } from '@/apis/auth';
import { useMe, useMeManual } from '@/utils/hooks/queries/auth';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { useDisconnect as useDisconnectThirdWeb } from '@thirdweb-dev/react';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';

const SelectSignInMethod = () => {
  const router = useRouter();
  const { data: me, refetch, status } = useMeManual();
  const [showModal, setShowModal] = useState(false);
  const disconnectThirdWeb = useDisconnectThirdWeb();
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();
  useEffect(() => {
    disconnectWallet();
  }, []);
  useEffect(() => {
    me && router.push('/portfolio');
  }, [me]);
  const handleClickEmail = () => {
    router.push('/auth/email');
  };

  const disconnectWallet = () => {
    disconnectThirdWeb();
    disconnectWagmi();
  };
  const handleClickGoogle = async () => {
    try {
      const token = await getIdTokenByGoogle();
      if (token) {
        // setCookie('accessToken', token);
        await sign({ token, provider: 'google.com' }).then(async () => {
          // const me = await checkMe();
          // me && router.push('/portfolio');
          (await refetch()).data && router.push('/portfolio');
        });
      } else {
        console.log('token is null');
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  return (
    <>
      <section className={styles.container}>
        <div className={styles.body}>
          <h2 className={`font-body01-regular ${styles.title}`}>
            Welcome to NFTBank! <br />
            Connect your wallet to get started
          </h2>
          <div className={`font-button03-medium ${styles.methodContainer}`}>
            <Button
              id=''
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              <Wallet className={styles.icon} />
              <p>Continue with Wallet</p>
            </Button>
            <Button
              id=''
              className={styles.button}
              onClick={() => handleClickGoogle()}
            >
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
