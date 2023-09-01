'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { ThemeProvider } from './ThemeProvider';

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(ReactQueryClient);
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Providers;
