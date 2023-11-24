'use client';
import Wallet from '@/public/icon/Wallet';
import styles from './ConnectWallet.module.css';
import Button from '../buttons/Button';
import CloseX from '@/public/icon/CloseX';
import Image from 'next/image';
import jwt from 'jsonwebtoken';

import {
  useConnect,
  useDisconnect,
  useAddress,

  // import the wallet you want to connect
  useSetIsWalletModalOpen,
  // wallet hooks
  useMetamask,
  useChain,
  useRainbowWallet,
  useWalletConnect,
  useTrustWallet,
  useCoinbaseWallet,
  // WalletConfig,

  // wallet list
  rainbowWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import {
  // MetaMaskWallet,
  CoinbaseWallet,
} from '@thirdweb-dev/wallets';

import { useEffect } from 'react';
import { useAccount, useDisconnect as useDisconnectWagmi } from 'wagmi';
import {
  ConnectorName,
  useConnectCustom,
} from '@/utils/hooks/useConnectCustom';
import { useAtom } from 'jotai';
import { connectedWalletAddressAtom } from '@/store/account';
import { useMutationSignInUp } from '@/utils/hooks/mutations/auth';
import { formatToken } from '@/utils/common';
import { getMe } from '@/apis/auth';
import { useMeManual } from '@/utils/hooks/queries/auth';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
};
type TWallet = {
  name: string;
  icon: string;
};
const ConnectWallet = (props: Props) => {
  const router = useRouter();
  const { data, mutate: signInUp, status } = useMutationSignInUp();
  const { data: me, refetch } = useMeManual();
  const [connectedWalletAddress, setConnectedWalletAddress] = useAtom(
    connectedWalletAddressAtom
  );
  const connect = useConnect();
  const address = useAddress();
  const _useDisconnectWagmi = useDisconnectWagmi();
  // const disconnect = useDisconnect();
  const chain = useChain();
  const connectWithRainbow = useRainbowWallet();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithTrust = useTrustWallet();
  const connectWithCoinbase = useCoinbaseWallet();
  const walletConfig = {
    // Add your wallet configuration options here
  };
  // const address = useAddress();
  const connectWithMetamask = useMetamask();

  const rainbowWalletConfig = rainbowWallet();

  const setIsWalletModalOpen = useSetIsWalletModalOpen();
  const openModal = () => {
    setIsWalletModalOpen(true);
  };

  //wagmi
  const connectCustom = useConnectCustom({
    onConnect: () => console.log('onConnect'),
  });
  const disconnect = useDisconnect();
  const handleCustom = (wallet: ConnectorName) => {
    connectCustom.connect(wallet);
  };
  const checkMe = async () => {
    const result = await getMe();
    return result.data.data;
  };
  const handleClickButton = async (wallet: TWallet) => {
    console.log('wallet', wallet);
    try {
      if (wallet.name === 'Metamask') {
        // *metamask useConnect* //
        const metamaskConfig = metamaskWallet();
        const wallet = await connect(metamaskConfig);

        // *metamask wagmi* //
        // handleCustom('metamask');
        console.log('connected to ', wallet);
      } else if (wallet.name === 'WalletConnect') {
        handleCustom('wc');
        console.log('connected to ', wallet);
      } else if (wallet.name === 'Trust') {
        console.log('trust');
        handleCustom('trust');
      } else if (wallet.name === 'Rainbow') {
        // *rainbow useConnect* //
        await connect(rainbowWalletConfig);

        // *rainbow hooks* //
        // connectWithRainbow()
        //   .then((wallet) => {
        //     console.log('wallet', wallet);
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });

        // *rainbow wagmi* //
        // handleCustom('rainbow');
      } else if (wallet.name === 'Zerion') {
        handleCustom('zerion');
      } else if (wallet.name === 'Coinbase') {
        console.log('coinbase');
        //* coinbase useConnect* //
        // const _wallet = new CoinbaseWallet();
        // _wallet
        //   .connect()
        //   .then((wallet) => {
        //     console.log('wallet', wallet);
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });

        // *coinbase hooks* //
        // connectWithCoinbase()
        //   .then((wallet) => {
        //     console.log('wallet', wallet);
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });
        handleCustom('coinbase');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    me && router.push('/portfolio');
  }, [me]);
  useEffect(() => {
    address?.startsWith('0x') &&
      setConnectedWalletAddress(address as `0x${string}`);
  }, [address]);
  useEffect(() => {
    console.log('connectedWalletAddress', connectedWalletAddress);
    console.log('chain', chain);
    if (connectedWalletAddress) {
      const token = formatToken({
        walletAddress: connectedWalletAddress,
        provider: 'metamask',
        type: 'evm',
      });
      signInUp(
        {
          token: token,
          provider: 'wallet',
        },
        {
          onSuccess: async (data) => {
            const me = await checkMe();
            me && router.push('/portfolio');
          },
        }
      );
    }
  }, [connectedWalletAddress, chain]);
  const checkWallet = async () => {
    console.log('afdasdfd');
    if (window.ethereum) {
      // Ethereum provider가 존재하는 경우
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('accounts', accounts);

      if (accounts.length > 0) {
        console.log('현재 연결된 지갑 주소들:', accounts);
      } else {
        console.log('현재 연결된 지갑이 없습니다.');
      }
    } else {
      console.log('Ethereum provider가 지원되지 않습니다.');
    }
  };
  useEffect(() => {
    // checkWallet();
    typeof window !== 'undefined'
      ? console.log('window', window)
      : console.log('winodw', 'no window');
  }, []);
  const WALLETS: TWallet[] = [
    {
      name: 'Metamask',
      icon: '/logo/Metamask.svg',
    },
    {
      name: 'WalletConnect',
      icon: '/logo/WalletConnect.svg',
    },
    {
      name: 'Coinbase',
      icon: '/logo/Coinbase.svg',
    },
    {
      name: 'Rainbow',
      icon: '/logo/Rainbow.svg',
    },
    {
      name: 'Trust',
      icon: '/logo/Trust.svg',
    },
    {
      name: 'Zerion',
      icon: '/logo/Zerion.svg',
    },
  ];
  const disconnectWallet = () => {
    disconnect();
    _useDisconnectWagmi.disconnect();
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Wallet className='mr-8 fill-[var(--color-icon-subtle)]' />
        <p className={`font-body01-regular ${styles.title}`}>Connect Wallet</p>
        {/* <button onClick={openModal}> open modal </button> */}
        {/* <button onClick={disconnect}>Disconnect</button> */}
        <Button
          id=''
          onClick={() => props.onClose()}
          className={styles.closeButton}
        >
          <CloseX />
        </Button>
      </div>
      <div className={`font-button03-medium ${styles.body}`}>
        <div>
          <button onClick={() => disconnectWallet()}>Disconnect</button>
        </div>

        {/* {connectors.map((connector) => (
          <Button
            id=''
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </Button>
        ))}
        {error && <div>{error.message}</div>} */}
        {WALLETS.map((wallet, index) => (
          <Button
            id=''
            className={styles.button}
            onClick={() => handleClickButton(wallet)}
            key={index}
          >
            <Image src={wallet.icon} width='16' height='16' alt='' />{' '}
            <p>{wallet.name}</p>
          </Button>
        ))}
        {/* <Button id='' className={styles.button}>
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
        <Button
          id=''
          className={styles.button}
          onClick={() => coinBaseWallet.connect()}
        >
          <Image src={'/logo/Coinbase.svg'} width='16' height='16' alt='' />{' '}
          <p>Coinbase Wallet</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Rainbow.svg'} width='16' height='16' alt='' />{' '}
          <p>Rainbow</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Trust.svg'} width='16' height='16' alt='' />{' '}
          <p>Trust</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Zerion.svg'} width='16' height='16' alt='' />{' '}
          <p>Zerion</p>
        </Button>
        <Button
          id=''
          className={styles.button}
          onClick={() => coinBaseWallet.connect()}
        >
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
          <Image src={'/logo/Portis.svg'} width='16' height='16' alt='' />{' '}
          <p>Walletlink</p>
        </Button>
        <Button id='' className={styles.button}>
          <Image src={'/logo/Arkane.svg'} width='16' height='16' alt='' />{' '}
          <p>Arkane</p>
        </Button> */}
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
