'use client';

import { freshnessAtom, keepPreviousDataAtom } from '@/store/freshness';
import { portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useFreshnessAndUpdatePolling } from '@/utils/hooks/queries/freshness';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

const DataFreshnessProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useMe();
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const queryClient = useQueryClient();
  const setKeepPreviousData = useSetAtom(keepPreviousDataAtom);
  const [dataFreshness, setDataFreshness] = useAtom(freshnessAtom);
  const { data: walletList, status } = useMyWalletList({
    nickname: me?.nickname,
    networkId: 'ethereum',
  });
  const { data: freshness, status: statusFreshness } =
    useFreshnessAndUpdatePolling(portfolioUser);

  useEffect(() => {
    freshness &&
      (setKeepPreviousData(true),
      setDataFreshness((prev) =>
        freshness.status === 'ALL'
          ? prev.map((f) => ({ ...f, processedAt: freshness.processedAt }))
          : prev
              .filter((f) => f.status !== freshness?.status)
              .concat([freshness])
      ));
  }, [freshness]);
  useEffect(() => {
    console.log('walletList', walletList, new Date().toISOString());
    setDataFreshness((prev) =>
      prev.map((f) => ({ ...f, processedAt: new Date().toISOString() }))
    );

    queryClient.invalidateQueries({
      queryKey: ['inventoryRealizedTokens'],
    });
  }, [walletList]);

  return <>{children}</>;
};
export default DataFreshnessProvider;
