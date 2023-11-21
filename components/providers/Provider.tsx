'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from './ThemeProvider';
import { ToastContainer } from 'react-toastify';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { useTheme } from 'next-themes';
import { AuthProvider } from './AuthProvider';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { mainnet, optimism } from 'wagmi/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);
const coinBaseConnector = new CoinbaseWalletConnector({
  chains: [mainnet, optimism],
  options: {
    appName: 'wagmi.sh',
    jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
  },
});
const config = createConfig({
  connectors: [
    coinBaseConnector,
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
  ],
  autoConnect: true,
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
type Key = 'success' | 'error' | 'info' | 'warning' | 'default' | 'dark';
function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(ReactQueryClient);
  const { theme } = useTheme();
  console.log('Providers theme', theme);
  return (
    <QueryClientProvider client={client}>
      <JotaiProvider>
        <WagmiConfig config={config}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastContainer />
            {children}
          </ThemeProvider>
        </WagmiConfig>
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Providers;
