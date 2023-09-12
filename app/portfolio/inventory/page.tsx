import InventoryCollectionList from '@/components/portfolio/InventoryCollectionList';
import InventoryValue from '@/components/portfolio/InventoryValue';
import styles from './page.module.css';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { IInventoryValue } from '@/interfaces/inventory';
import InventoryTypeSelector from '@/components/portfolio/InventoryTypeSelector';

const getInventoryValue = async <T = IInventoryValue,>(
  walletAddress?: string
): Promise<T> => {
  try {
    const query = walletAddress ? `?w=${walletAddress}` : '';
    const { data } = await instance.get<T>(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/inventory/value${query}`
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const InventoryPage = async (context: any) => {
  console.log('InventoryPage @@@context: ', context);
  const walletAddress = context.searchParams?.walletAddress;
  const queryClient = ReactQueryClient;
  await queryClient.prefetchQuery(['inventoryValue', walletAddress], () =>
    getInventoryValue(walletAddress)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <section className={styles.container}>
        <InventoryTypeSelector />
        <InventoryValue />
        <InventoryCollectionList />
      </section>
    </Hydrate>
  );
};
export default InventoryPage;
