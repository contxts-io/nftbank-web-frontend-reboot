import {
  coinBaseConnector,
  metamaskConnector,
  trustWalletConnector,
  walletConnectConnector,
  zerionWalletConnector,
  ledgerConnector,
} from '@/components/providers/Provider';
import { connectedWalletAddressAtom } from '@/store/account';
import {
  useConnect as useConnectThirdWeb,
  // wallet list
  rainbowWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

export type ConnectorName =
  | 'metamask'
  | 'coinbase'
  | 'wc'
  | 'trust'
  | 'rainbow'
  | 'zerion'
  | 'ledger';

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
      console.log('connector', connector);
      address &&
        connector?.name &&
        setConnectedWalletAddress({
          provider: connector.name,
          address: address,
        });
    }
  }, [address, isConnected, connector]);
  const {
    pendingConnector,
    connect: connectMetamask,
    isLoading: isMetamaskLoading,
  } = useConnect({
    connector: metamaskConnector,
  });
  const connectThirdWeb = useConnectThirdWeb();

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

  const { connect: connectLedger, isLoading: isLedgerLoading } = useConnect({
    connector: ledgerConnector,
  });

  const connect = async (connectorName: ConnectorName) => {
    switch (connectorName) {
      case 'metamask':
        const metamaskConfig = metamaskWallet();
        await connectThirdWeb(metamaskConfig);
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
      case 'ledger':
        onConnect();
        connectLedger();
        console.log('connect ledger');
        break;
      case 'zerion':
        onConnect();
        connectZerion();
        console.log('connect Zerion');
        break;
      case 'rainbow':
        const rainbowWalletConfig = rainbowWallet();
        await connectThirdWeb(rainbowWalletConfig);
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
      isZerionLoading ||
      isCoinbaseLoading ||
      isLedgerLoading,
  };
};
