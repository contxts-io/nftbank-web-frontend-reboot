'use client';
import Button from '@/components/buttons/Button';
import styles from './RecentActivityContainer.module.css';
import HandPointing from '@/public/icon/HandPointing';
import ShoppingCart from '@/public/icon/ShoppingCart';
import { TChain } from '@/interfaces/constants';
import Image from 'next/image';
import Tag from '@/public/icon/Tag';
import Jewel from '@/public/icon/Jewel';
import CaretDown from '@/public/icon/CaretDown';
import ActivityIcon from '@/components/activity/ActivityIcon';
type TActivity = 'BUY' | 'SELL' | 'MINT' | 'FREE MINT';
const ACTIVITY: { type: TActivity; chain: TChain; date: string }[] = [
  {
    type: 'BUY',
    chain: 'ethereum',
    date: 'Aug 31',
  },
  {
    type: 'SELL',
    chain: 'polygon',
    date: 'Aug 31',
  },
  {
    type: 'MINT',
    chain: 'ethereum',
    date: 'Aug 31',
  },
  {
    type: 'FREE MINT',
    chain: 'polygon',
    date: 'Aug 31',
  },
  {
    type: 'BUY',
    chain: 'ethereum',
    date: 'Aug 31',
  },
];
const RecentActivityContainer = () => {
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <p className={`font-subtitle02-bold ${styles.title}`}>
          Recent Activity Trend
        </p>
        <Button id={'/portfolio/overview/activity/showmore'}>
          Show more <HandPointing className='ml-4' />
        </Button>
      </div>
      <ul className={styles.listWrapper}>
        {ACTIVITY.map((item, index) => {
          return (
            <li className={styles.listRow} key={index}>
              <div className={`col-span-1 flex`}>
                <ActivityIcon type={item.type} chain={item.chain} />
                <div className='ml-18'>
                  <p className='font-caption-medium text-[var(--color-text-main)]'>
                    {item.type}
                  </p>
                  <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                    {item.date}
                  </p>
                </div>
              </div>
              <div className={`col-span-2 flex`}>
                <Image
                  src={'/icon/nftbank_icon.svg'}
                  width={32}
                  height={32}
                  alt={'nftbank'}
                  className='w-32 h-32 mr-8 '
                />
                <div className='w-full flex flex-col justify-center'>
                  <p className='font-caption-medium text-[var(--color-text-success)]'>
                    +1 Murakami.Flower #2480
                  </p>
                  <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                    $60.25
                  </p>
                </div>
              </div>
              <div className={`col-span-2 flex justify-between items-center`}>
                <div className='flex'>
                  <Image
                    src={'/logo/ETHLogo.svg'}
                    width={32}
                    height={32}
                    alt={'nftbank'}
                    className='w-32 h-32 mr-8 rounded-full'
                  />
                  <div className='w-full flex flex-col justify-center'>
                    <p className='font-caption-medium text-[var(--color-text-main)]'>
                      -0.08 ETH
                    </p>
                    <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                      $130.98
                    </p>
                  </div>
                </div>
                <div className='text-[var(--color-icon-subtle)] rotate-270'>
                  <CaretDown />
                </div>
              </div>
            </li>
          );
        })}
        <li className={styles.list}>
          <div className={`col-span-1`}>
            <div></div>
          </div>
        </li>
      </ul>
    </section>
  );
};
export default RecentActivityContainer;
