'use client';

import { freshnessAtom } from '@/store/freshness';
import { portfolioUserAtom } from '@/store/portfolio';
import { useFreshnessAndUpdatePolling } from '@/utils/hooks/queries/freshness';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

const DataFreshnessProvider = ({ children }: { children: React.ReactNode }) => {
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const [dataFreshness, setDataFreshness] = useAtom(freshnessAtom);
  const { data: freshness, status: statusFreshness } =
    useFreshnessAndUpdatePolling(portfolioUser);

  useEffect(() => {
    freshness &&
      setDataFreshness((prev) =>
        freshness.status === 'ALL'
          ? prev.map((f) => ({ ...f, processedAt: freshness.processedAt }))
          : prev
              .filter((f) => f.status !== freshness?.status)
              .concat([freshness])
      );
  }, [freshness]);

  return <>{children}</>;
};
export default DataFreshnessProvider;
