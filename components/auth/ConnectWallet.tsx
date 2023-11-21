'use client';
import Wallet from '@/public/icon/Wallet';
import styles from './ConnectWallet.module.css';
import Button from '../buttons/Button';
import CloseX from '@/public/icon/CloseX';
import Image from 'next/image';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
type Props = {
  onClose: () => void;
};
const ConnectWallet = (props: Props) => {
  // const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  const { connector: activeConnector, isConnected } = useAccount();
  const { disconnect, disconnectAsync } = useDisconnect({
    onSuccess(data) {
      console.log('Success', data);
    },
  });

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const handleClickButton = ({ connector }: any) => {
    console.log(connector);
    connect({ connector });
  };
  const handleClickDisconnect = async () => {
    await disconnectAsync().then(() => {
      console.log('disconnectAsync');
    });
    console.log('done');
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Wallet className='mr-8 fill-[var(--color-icon-subtle)]' />
        <p className={`font-body01-regular ${styles.title}`}>Connect Wallet</p>
        <Button
          id=''
          onClick={() => props.onClose()}
          className={styles.closeButton}
        >
          <CloseX />
        </Button>
      </div>
      <div className={`font-button03-medium ${styles.body}`}>
        <Button id='' className={styles.button} onClick={() => connect()}>
          <Image src={'/logo/Metamask.svg'} width='16' height='16' alt='' />{' '}
          <p>Metamask</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image
            src={'/logo/WalletConnect.svg'}
            width='16'
            height='16'
            alt=''
          />{' '}
          <p>WalletConnect</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Fortmatic.svg'} width='16' height='16' alt='' />{' '}
          <p>Fortmatic</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/WalletLink.svg'} width='16' height='16' alt='' />{' '}
          <p>Walletlink</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Portis.svg'} width='16' height='16' alt='' />{' '}
          <p>Portis</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Arkane.svg'} width='16' height='16' alt='' />{' '}
          <p>Arkane</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Klaytn.svg'} width='16' height='16' alt='' />{' '}
          <p>Kaikas</p>
        </Button>
      </div>
      <div className={`${styles.footer} font-caption-regular `}>
        <p className={`text-[var(--color-text-main)] mb-8`}>
          Non-custodial & Secure
        </p>
        <p className={`text-[var(--color-text-subtle)]`}>
          We do not own your private keys and cannot access your funds without
          your confirmation.
        </p>
      </div>
    </div>
  );
};
export default ConnectWallet;
