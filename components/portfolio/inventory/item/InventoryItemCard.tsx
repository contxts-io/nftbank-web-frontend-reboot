import Image from 'next/image';
import styles from './InventoryItemCard.module.css';
import { Token } from '@/interfaces/collection';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';

const InventoryItemCard = ({ token }: { token: Token }) => {
  const currency = useAtomValue(currencyAtom);
  return (
    <article
      className={`font-caption-medium ${styles.cardWrapper} dark:border-border-main-dark`}
    >
      <div className='w-full after:pb-[100%] flex items-center justify-center relative overflow-hidden'>
        <Image
          src={token.token.imageUrl}
          fill
          alt={`${token.collection.name}-${token.token.name}`}
        />
      </div>
      <div className='w-full flex flex-col justify-start my-12 px-12'>
        <p className={`${styles.tokenName} dark:text-text-subtle-dark mb-8`}>
          {token.token.name}
        </p>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Cost basis
          </p>
          <p className='text-text-main dark:text-text-main-dark'>
            {token.costBasis[currency].amount}
          </p>
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Realtime NAV
          </p>
          <p className='text-text-main dark:text-text-main-dark'>
            {token.costBasis[currency].amount}
          </p>
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Unrealized G&L
          </p>
          <p className='text-text-main dark:text-text-main-dark'>
            {token.costBasis[currency].amount}
          </p>
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Unrealized ROI
          </p>
          <p className='text-text-main dark:text-text-main-dark'>
            {token.costBasis[currency].amount}
          </p>
        </div>
      </div>
    </article>
  );
};
export default InventoryItemCard;
