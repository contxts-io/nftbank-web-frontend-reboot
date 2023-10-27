import InventoryValue from '@/components/portfolio/InventoryValue';
import styles from './page.module.css';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { IInventoryValue } from '@/interfaces/inventory';
import InventoryContainer from '@/components/portfolio/inventory/InventoryContainer';

const getInventoryValue = async <T = IInventoryValue,>(
  walletAddress?: string
): Promise<T> => {
  try {
    const URL = process.env.API_URL_SSR;
    const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
    const { data } = await instance.get<{ data: T }>(
      `${URL}/v1/performance/value${query}`
    );
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('Delayed result');
    //   }, 2000); // 2초 딜레이
    // });
    console.log('ssr ? getInventoryValue: ', data.data);
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const getCollectionCount = async <T = { count: number },>(
  walletAddress?: string
): Promise<T> => {
  try {
    const URL = process.env.API_URL_SSR;
    const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
    const { data } = await instance.get<{ data: T }>(
      `${URL}/v1/inventory/collection/stat${query}`
    );
    console.log('ssr ? getCollectionCount:', data.data);
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const InventoryPage = async (context: any) => {
  const queryClient = ReactQueryClient;
  const me = (await queryClient.getQueryData(['me'])) as {
    walletAddress: string;
  };
  const walletAddress =
    context.searchParams?.walletAddress || me?.walletAddress || undefined;

  // walletAddress &&
  //   queryClient.prefetchQuery(['inventoryValue', walletAddress], () =>
  //     getInventoryValue(walletAddress)
  //   );
  // walletAddress &&
  //   queryClient.prefetchQuery(['collectionCount', walletAddress], () =>
  //     getCollectionCount(walletAddress)
  //   );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <section className={styles.container}>
        <InventoryValue />
        <InventoryContainer />
      </section>
    </Hydrate>
  );
};
export default InventoryPage;
