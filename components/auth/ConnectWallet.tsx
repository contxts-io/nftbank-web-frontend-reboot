'use client';
import Wallet from '@/public/icon/Wallet';
import styles from './ConnectWallet.module.css';
import Button from '../buttons/Button';
import CloseX from '@/public/icon/CloseX';
import Image from 'next/image';

import {
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
  useWallet,
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

import { useEffect, useState } from 'react';
import { useAccount, useDisconnect as useDisconnectWagmi } from 'wagmi';
import {
  ConnectorName,
  useConnectCustom,
} from '@/utils/hooks/useConnectCustom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { connectedWalletAddressAtom } from '@/store/account';
import { useMutationSignInUp } from '@/utils/hooks/mutations/auth';
import { formatToken } from '@/utils/common';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter } from 'next/navigation';
import ManualWalletAdd from './ManualAddWallet';
import { useMutationInsertWalletBulk } from '@/utils/hooks/mutations/wallet';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { showToastMessage } from '@/utils/toastify';
import { openModalAtom } from '@/store/settings';
import { portfolioUserAtom } from '@/store/portfolio';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { sendGTMEvent } from '@next/third-parties/google';

type Props = {
  onClose: () => void;
};
type TWallet = {
  name: string;
  icon: string;
};
const ConnectWallet = (props: Props) => {
  const router = useRouter();
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const queryClient = useQueryClient();
  const { data, mutate: signInUp, status } = useMutationSignInUp();
  const {
    data: insertData,
    mutate: insertWallet,
    status: insertStatus,
  } = useMutationInsertWalletBulk();
  const { data: me, refetch } = useMe();
  const [step, setStep] = useState<'walletConnect' | 'manual'>('walletConnect');
  const [connectedWalletAddress, setConnectedWalletAddress] = useAtom(
    connectedWalletAddressAtom
  );
  const setShowModal = useSetAtom(openModalAtom);
  const address = useAddress();

  const { disconnect: disconnectWagmi } = useDisconnectWagmi();

  // const disconnect = useDisconnect();
  const chain = useChain();
  const walletInstance = useWallet();

  const setIsWalletModalOpen = useSetIsWalletModalOpen();

  //wagmi
  const connectCustom = useConnectCustom({
    onConnect: () => console.log('onConnect'),
  });
  const disconnect = useDisconnect();
  const handleCustom = (wallet: ConnectorName) => {
    connectCustom.connect(wallet);
  };
  const handleClickButton = async (wallet: TWallet) => {
    console.log('wallet', wallet);
    try {
      if (wallet.name === 'Metamask') {
        handleCustom('metamask');
        console.log('metamask connected to ', wallet);
      } else if (wallet.name === 'WalletConnect') {
        handleCustom('wc');
      } else if (wallet.name === 'Trust') {
        handleCustom('trust');
      } else if (wallet.name === 'Rainbow') {
        handleCustom('rainbow');
      } else if (wallet.name === 'Zerion') {
        handleCustom('zerion');
      } else if (wallet.name === 'Ledger') {
        handleCustom('ledger');
      } else if (wallet.name === 'Coinbase') {
        handleCustom('coinbase');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    disconnectWallet();
    return () => {
      disconnectWallet();
      setConnectedWalletAddress(null);
    };
  }, []);
  // useEffect(() => {
  //   console.log('me', me);
  //   me && router.push('/portfolio');
  // }, [me]);

  useEffect(() => {
    address?.startsWith('0x') &&
      walletInstance?.walletId &&
      setConnectedWalletAddress({
        provider: walletInstance.walletId,
        address: address as `0x${string}`,
      });
  }, [address, walletInstance]);
  useEffect(() => {
    console.log('connectedWalletAddress', connectedWalletAddress);
    if (connectedWalletAddress) {
      const token = formatToken({
        walletAddress: connectedWalletAddress.address,
        provider: connectedWalletAddress.provider,
        type: 'ethereum',
      });
      me
        ? insertWallet(
            [
              {
                name: connectedWalletAddress.address,
                walletAddress: connectedWalletAddress.address,
                provider: connectedWalletAddress.provider,
                networkName: 'ethereum',
              },
            ],
            {
              onError: (error) => {
                console.log('error', error);
                showToastMessage({
                  message: error.message,
                  code: 'error',
                  toastId: 'insertWalletError',
                });
                disconnectWallet();
                setConnectedWalletAddress(null);
              },
              onSuccess: async (data) => {
                // const me = await checkMe();
                console.log('add success & refetch');
                sendGTMEvent({
                  event: 'buttonClicked',
                  name: 'verified_wallet_add_success',
                });
                queryClient.invalidateQueries({
                  queryKey: ['myWalletList'],
                });
                queryClient.invalidateQueries({
                  queryKey: ['walletList'],
                });
                me &&
                  queryClient.invalidateQueries({
                    queryKey: [me.nickname],
                  });
                setShowModal(null);
                disconnectWallet();
                setConnectedWalletAddress(null);
              },
              onSettled: () => {
                disconnectWallet();
                setConnectedWalletAddress(null);
              },
            }
          )
        : signInUp(
            {
              token: token,
              provider: 'wallet',
            },
            {
              onSuccess: async (data) => {
                // const me = await checkMe();
                sendGTMEvent({
                  event: 'buttonClicked',
                  name: 'verified_wallet_add_success',
                });
                console.log('sign success & refetch wallet ~!@@');
                (await refetch()).data && router.push(`/portfolio/overview`);
                // console.log('sign success & refetch');
                // router.push('/portfolio/overview');
              },
              onError: (error) => {
                console.error('error', error);
                disconnectWallet();
                setConnectedWalletAddress(null);
              },
            }
          );
    }
  }, [connectedWalletAddress, chain, walletInstance]);

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
    {
      name: 'Ledger',
      icon: '/logo/Ledger.svg',
    },
  ];
  const disconnectWallet = async () => {
    console.log('disconnect wallet @@');
    await disconnect().then(() => console.log('disconnected thirdweb'));
    // await _useDisconnectWagmi.disconnect();
    disconnectWagmi();
    console.log('disconnected wagmi');
  };
  return step === 'walletConnect' ? (
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
        {WALLETS.map((wallet, index) => (
          <Button
            id=''
            className={`${styles.button} ${
              wallet.name === 'WalletConnect' && styles.mobileConnectButton
            }`}
            onClick={() => handleClickButton(wallet)}
            key={index}
          >
            <img
              src={wallet.icon}
              width='16'
              height='16'
              alt=''
              className='!border-transparent'
            />{' '}
            <p>{wallet.name}</p>
          </Button>
        ))}

        {me && (
          <>
            <span className='font-body02-medium mb-16 mt-8 text-[var(--color-text-main)]'>
              OR
            </span>
            <Button
              id=''
              className={`${styles.button} ${styles.mobileConnectButton}`}
              onClick={() => setStep('manual')}
            >
              Register as Wallet Address
            </Button>
          </>
        )}
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
  ) : (
    step === 'manual' && (
      <ManualWalletAdd
        goBack={() => setStep('walletConnect')}
        onClose={() => props.onClose()}
      />
    )
  );
};
export default ConnectWallet;
