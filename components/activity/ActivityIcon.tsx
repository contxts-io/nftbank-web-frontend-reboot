import ShoppingCart from '@/public/icon/ShoppingCart';
import styles from './ActivityIcon.module.css';
import { TChain } from '@/interfaces/constants';
import Tag from '@/public/icon/Tag';
import Jewel from '@/public/icon/Jewel';
import CaretDown from '@/public/icon/CaretDown';
import Image from 'next/image';

type TActivity = 'BUY' | 'SELL' | 'MINT' | 'FREE MINT';
const ActivityIcon = ({ type, chain }: { type: TActivity; chain: TChain }) => {
  return (
    <>
      {type === 'BUY' && (
        <div
          className={`${styles.iconWrapper} relative border-[var(--color-border-accent-green)] text-[var(--color-icon-accent-green)]`}
        >
          <ShoppingCart />
          <Image
            src={
              chain === 'polygon'
                ? '/logo/PolygonLogo.svg'
                : '/logo/ETHLogo.svg'
            }
            width={16}
            height={16}
            alt={'nftbank'}
            className='absolute top-[50%] right-[-30%] rounded-full'
          />
        </div>
      )}
      {type === 'SELL' && (
        <div
          className={`${styles.iconWrapper} relative border-[var(--color-border-accent-red)] text-[var(--color-icon-accent-red)]`}
        >
          <Tag />
          <Image
            src={
              chain === 'polygon'
                ? '/logo/PolygonLogo.svg'
                : '/logo/ETHLogo.svg'
            }
            width={16}
            height={16}
            alt={'nftbank'}
            className='absolute top-[50%] right-[-30%] rounded-full'
          />
        </div>
      )}
      {type === 'MINT' && (
        <div
          className={`${styles.iconWrapper} relative border-[var(--color-border-accent-teal)] text-[var(--color-icon-accent-teal)]`}
        >
          <Jewel />
          <Image
            src={
              chain === 'polygon'
                ? '/logo/PolygonLogo.svg'
                : '/logo/ETHLogo.svg'
            }
            width={16}
            height={16}
            alt={'nftbank'}
            className='absolute top-[50%] right-[-30%] rounded-full'
          />
        </div>
      )}
      {type === 'FREE MINT' && (
        <div
          className={`${styles.iconWrapper} relative border-[var(--color-border-accent-blue)] text-[var(--color-icon-accent-blue)]`}
        >
          <Jewel />
          <Image
            src={
              chain === 'polygon'
                ? '/logo/PolygonLogo.svg'
                : '/logo/ETHLogo.svg'
            }
            width={16}
            height={16}
            alt={'nftbank'}
            className='absolute top-[50%] right-[-30%] rounded-full'
          />
        </div>
      )}
    </>
  );
};
export default ActivityIcon;
