import InventoryCollectionList from '@/components/portfolio/inventory/collection/InventoryCollectionList';
import InventoryValue from '@/components/portfolio/InventoryValue';
import styles from './page.module.css';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { IInventoryValue } from '@/interfaces/inventory';
import InventoryTypeSelector from '@/components/portfolio/InventoryTypeSelector';
import InventoryContainer from '@/components/portfolio/inventory/InventoryContainer';

const getInventoryValue = async <T = IInventoryValue,>(
  walletAddress?: string
): Promise<T> => {
  try {
    const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
    const { data } = await instance.get<{ data: T }>(
      `https://web-api-reboot.dev.nftbank.tools/v1/inventory/value${query}`
    );
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const getCollectionCount = async <T = { count: number },>(
  walletAddress?: string
): Promise<T> => {
  try {
    const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
    const { data } = await instance.get<{ data: T }>(
      `https://web-api-reboot.dev.nftbank.tools/v1/inventory/collection/stat${query}`
    );
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const InventoryPage = async (context: any) => {
  const walletAddress = context.searchParams?.walletAddress;
  const queryClient = ReactQueryClient;
  await queryClient.prefetchQuery(['inventoryValue', walletAddress], () =>
    getInventoryValue(walletAddress)
  );
  await queryClient.prefetchQuery(['collectionCount', walletAddress], () =>
    getCollectionCount(walletAddress)
  );
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
