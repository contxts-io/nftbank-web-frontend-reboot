'use client';
import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from './ThemeProvider';
import { ToastContainer } from 'react-toastify';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';
import { useTheme } from 'next-themes';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { mainnet, optimism } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { LedgerConnector } from '@wagmi/connectors/ledger';
import { NextUIProvider } from '@nextui-org/react';

import {
  ThirdwebProvider,
  // import the wallets you want
  metamaskWallet,
  rainbowWallet,
} from '@thirdweb-dev/react';
import { CookiesProvider } from 'react-cookie';
import ModalProvider from './ModalProvider';
import DataFreshnessProvider from './DataFreshnessProvider';

const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID || '';
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
);
export const metamaskConnector = new MetaMaskConnector({
  chains,
  options: {
    UNSTABLE_shimOnConnectSelectAccount: true,
    shimDisconnect: true,
  },
});
export const coinBaseConnector = new CoinbaseWalletConnector({
  chains: [mainnet, optimism],
  options: {
    appName: 'NFTBank',
    jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  options: {
    projectId: WC_PROJECT_ID,
    showQrModal: true,
  },
});
export const trustWalletConnector = new InjectedConnector({
  chains,
  options: {
    name: 'trustwallet',
    shimDisconnect: true,
    getProvider: () =>
      typeof window !== 'undefined' ? window.trustwallet : undefined,
  },
});
export const ledgerConnector = new LedgerConnector({
  chains: [mainnet],
  options: {
    projectId: WC_PROJECT_ID,
  },
});

export const zerionWalletConnector = new InjectedConnector({
  chains,
  options: {
    name: 'zerionWallet',
    shimDisconnect: true,
    getProvider: () =>
      typeof window !== 'undefined' ? window.zerionWallet : undefined,
  },
});
const config = createConfig({
  connectors: [
    metamaskConnector,
    coinBaseConnector,
    walletConnectConnector,
    trustWalletConnector,
    zerionWalletConnector,
    ledgerConnector,
  ],
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});
const contextClass = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-indigo-600',
  dark: 'bg-white-600 font-gray-300',
};
const THIRD_WEB_API_KEY = process.env.NEXT_PUBLIC_THIRD_WEB_API_KEY || '';
type Key = 'success' | 'error' | 'info' | 'warning' | 'default' | 'dark';
function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(ReactQueryClient);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <QueryClientProvider client={client}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <JotaiProvider>
          <WagmiConfig config={config}>
            <ThirdwebProvider
              supportedWallets={[metamaskWallet(), rainbowWallet()]}
              clientId={THIRD_WEB_API_KEY}
              autoConnect={false}
            >
              <DataFreshnessProvider>
                <ThemeProvider
                  attribute='class'
                  defaultTheme='system'
                  enableSystem
                >
                  <NextUIProvider>
                    <ModalProvider>
                      <ToastContainer />
                      {children}
                    </ModalProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </NextUIProvider>
                </ThemeProvider>
              </DataFreshnessProvider>
            </ThirdwebProvider>
          </WagmiConfig>
        </JotaiProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
export default Providers;
