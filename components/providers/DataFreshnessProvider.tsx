'use client';

import { freshnessAtom } from '@/store/freshness';
import { useFreshnessAndUpdatePolling } from '@/utils/hooks/queries/freshness';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const DataFreshnessProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataFreshness, setDataFreshness] = useAtom(freshnessAtom);
  const { data: freshness, status: statusFreshness } =
    useFreshnessAndUpdatePolling({
      walletAddress: '0x4bbb41f61fffc1bbe65a2aa192c65281e16ea758',
      networkId: 'ethereum',
    });

  useEffect(() => {
    console.log('freshness', freshness?.status);
    freshness &&
      setDataFreshness((prev) =>
        prev.filter((f) => f.status !== freshness?.status).concat([freshness])
      );
  }, [freshness]);
  useEffect(() => {
    console.log('dataFreshness', dataFreshness);
  }, [dataFreshness]);

  return <>{children}</>;
};
export default DataFreshnessProvider;
