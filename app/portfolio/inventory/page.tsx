import InventoryCollectionList from '@/components/portfolio/InventoryCollectionList';
import InventoryValue from '@/components/portfolio/InventoryValue';
import styles from './page.module.css';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { IInventoryValue } from '@/interfaces/inventory';

const getInventoryValue = async <T = IInventoryValue,>(): Promise<T> => {
  try {
    const { data } = await instance.get<T>(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/inventory/value`
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const InventoryPage = async () => {
  const queryClient = ReactQueryClient;
  await queryClient.prefetchQuery(['inventoryValue'], () =>
    getInventoryValue()
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <div className={styles.container}>
        <InventoryValue />
        <InventoryCollectionList />
      </div>
    </Hydrate>
  );
};
export default InventoryPage;
