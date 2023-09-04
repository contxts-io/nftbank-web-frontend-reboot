'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from './ThemeProvider';

import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(ReactQueryClient);
  return (
    <QueryClientProvider client={client}>
      <JotaiProvider>
        <WagmiConfig config={config}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </WagmiConfig>
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Providers;
