'use client';
import { Item } from '@/interfaces/collection';
import styles from './InventoryItemActivity.module.css';
import Image from 'next/image';
import { useActivityItem } from '@/utils/hooks/queries/activity';
import SkeletonLoader from '@/components/SkeletonLoader';

const TableBodyCell = ({ address }: { address: string }) => {
  return (
    <div className='flex items-center'>
      <div className='bg-gray-300 rounded-full w-50 h-50 mr-10' />
      <p>{address}</p>
    </div>
  );
};

type Props = {
  item: Item;
};
const InventoryItemActivity = ({ item, ...props }: Props) => {
  const { data: activityItem, status } = useActivityItem({
    networkId: item.collection.chain.name,
    assetContract: item.collection.assetContract,
    tokenId: item.item.tokenId,
  });
  return (
    <section className={styles.container}>
      <div className='w-full border-1 border-gray-300 p-10 rounded-lg'>
        <h2 className={styles.pTitle}>Activity</h2>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.tableCell}></th>
              <th className={styles.tableCell2}>Activity</th>
              <th className={styles.tableCell}>Receiver</th>
              <th className={styles.tableCell}>Sender</th>
              <th className={styles.tableCell}>other fee</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <SkeletonLoader className='w-full h-100' />
              </tr>
            )}
            {status === 'success' &&
              activityItem &&
              activityItem.activity.map((item, index) => {
                return (
                  <tr className={styles.tableRow} key={index}>
                    <td className={`h-full justify-start items-start py-15`}>
                      <p>{item.functionName}</p>
                    </td>
                    <td className='col-span-5'>
                      {item.send.map((transfer, index) => {
                        return (
                          <tr className='w-full grid' key={`send-${index}`}>
                            <div className='grid grid-cols-5'>
                              <td className={styles.tableCell2}>
                                {`<-${transfer.amount} ${transfer.tokenId}`}
                              </td>
                              <td className={styles.tableCell}>
                                <TableBodyCell address={transfer.toAddress} />
                              </td>
                              <td className={styles.tableCell}>
                                <TableBodyCell address={transfer.fromAddress} />
                              </td>
                              <td className={styles.tableCell}></td>
                            </div>
                          </tr>
                        );
                      })}
                      {item.receive.map((transfer, index) => {
                        return (
                          <tr className='w-full grid' key={`receive-${index}`}>
                            <div className='grid grid-cols-5'>
                              <td className={styles.tableCell2}>
                                {`->${transfer.amount} ${transfer.tokenId}`}
                              </td>
                              <td className={styles.tableCell}>
                                <TableBodyCell address={transfer.fromAddress} />
                              </td>
                              <td className={styles.tableCell}>
                                <TableBodyCell address={transfer.toAddress} />
                              </td>
                              <td className={styles.tableCell}></td>
                            </div>
                          </tr>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default InventoryItemActivity;
