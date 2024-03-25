'use client';
import Wallet from '@/public/icon/Wallet';
import Button from '../buttons/Button';
import styles from './SelectSignInMethod.module.css';
import Google from '@/public/icon/Google';
import Email from '@/public/icon/Email';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import ConnectWallet from './ConnectWallet';
import { useRouter } from 'next/navigation';
import { getIdTokenByGoogle } from '@/apis/firebase';
import { sign } from '@/apis/auth';
import { useMe } from '@/utils/hooks/queries/auth';
import { useDisconnect as useDisconnectThirdWeb } from '@thirdweb-dev/react';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';
import CaretDown from '@/public/icon/CaretDown';

const SelectSignInMethod = () => {
  const router = useRouter();
  // const { data: me, refetch, status } = useMeManual();
  const { data: me, refetch } = useMe();
  const [showModal, setShowModal] = useState(false);
  const disconnectThirdWeb = useDisconnectThirdWeb();
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();
  useEffect(() => {
    disconnectWallet();
  }, []);
  useEffect(() => {
    me && console.log('SelectSignInMethod me : ', me ? me : 'null');
    me && router.push('/portfolio/overview');
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
          (await refetch()).data && router.push(`/portfolio/overview`);
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
      <section className={`${styles.container}`}>
        <div className={`${styles.body} relative`}>
          <Button
            className='absolute top-[30px] left-[8px] !border-transparent'
            onClick={() => router.push('/portfolio/overview')}
          >
            <div className='rotate-90'>
              <CaretDown />
            </div>
          </Button>
          <h2 className={`font-body01-regular ${styles.title}`}>
            Welcome to NFTBank! <br />
            Connect your wallet to get started
          </h2>
          <div className={`font-button03-medium ${styles.methodContainer}`}>
            <Button
              id='continue_with_wallet'
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              <Wallet className={styles.icon} />
              <p>Continue with Wallet</p>
            </Button>
            <Button
              id='continue_with_google'
              className={styles.button}
              onClick={() => handleClickGoogle()}
            >
              <Google className={styles.icon} />
              <p>Continue with Google</p>
            </Button>
            <Button
              id='continue_with_email'
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
