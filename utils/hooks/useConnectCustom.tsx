import {
  coinBaseConnector,
  metamaskConnector,
  trustWalletConnector,
  walletConnectConnector,
  zerionWalletConnector,
} from '@/components/providers/Provider';
import { connectedWalletAddressAtom } from '@/store/account';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

export type ConnectorName =
  | 'metamask'
  | 'coinbase'
  | 'wc'
  | 'trust'
  | 'rainbow'
  | 'zerion';

interface UseConnectProps {
  onConnect: () => void;
}

export const useConnectCustom = ({
  onConnect,
}: UseConnectProps): {
  isLoading: boolean;
  connect: (connectorName: ConnectorName) => void;
  isTWConnecting: boolean;
} => {
  const setConnectedWalletAddress = useSetAtom(connectedWalletAddressAtom);
  const { address, connector, isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setConnectedWalletAddress(address);
    }
  }, [address]);
  const {
    pendingConnector,
    connect: connectMetamask,
    isLoading: isMetamaskLoading,
  } = useConnect({
    connector: metamaskConnector,
  });

  const { connect: connectWalletConnect, isLoading: isWalletConnectLoading } =
    useConnect({
      connector: walletConnectConnector,
    });

  const { connect: connectCoinbaseConnect, isLoading: isCoinbaseLoading } =
    useConnect({
      connector: coinBaseConnector,
    });

  const { connect: connectTrustWallet, isLoading: isTrustWalletLoading } =
    useConnect({
      connector: trustWalletConnector,
    });

  const { connect: connectZerion, isLoading: isZerionLoading } = useConnect({
    connector: zerionWalletConnector,
  });

  const connect = (connectorName: ConnectorName) => {
    switch (connectorName) {
      case 'metamask':
        connectMetamask();
        break;
      case 'coinbase':
        connectCoinbaseConnect();
        break;
      case 'wc':
        connectWalletConnect();
        break;
      case 'trust':
        onConnect();
        connectTrustWallet();
        console.log('connect trust');
        break;
      case 'zerion':
        onConnect();
        connectZerion();
        console.log('connect Zerion');
        break;
    }
  };

  return {
    connect,
    isTWConnecting: pendingConnector === trustWalletConnector,
    isLoading:
      isMetamaskLoading ||
      isWalletConnectLoading ||
      isTrustWalletLoading ||
      isZerionLoading,
  };
};
