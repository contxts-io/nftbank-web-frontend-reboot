import Image from 'next/image';
import ActivityIcon from './ActivityIcon';
import styles from './ActivityListRow.module.css';
import Copy from '@/public/icon/Copy';
import Dropdown from '../dropdown/Dropdown';
import { useState } from 'react';
type Props = {
  isOpened: boolean;
  isEdit: boolean;
};
const LIST = [
  {
    type: 'TRANSFER',
    selected: true,
  },
  {
    type: 'BUY',
    selected: false,
  },
  {
    type: 'MINT',
    selected: false,
  },
  {
    type: 'AIRDROP',
    selected: false,
  },
];
const ActivityListRow = (props: Props) => {
  const { isOpened, isEdit } = props;
  const [activityTypeList, setActivityTypeList] = useState<
    { type: string; selected: boolean }[]
  >([...LIST.map((item) => ({ ...item, selected: false }))]);
  const handleClickList = (type: string) => {
    setActivityTypeList((prev) =>
      prev?.map((item) => ({
        ...item,
        selected: item.type === type ? true : false,
      }))
    );
  };
  return (
    <div className={`${styles.row} ${styles.gridRow}`}>
      <div className={`col-span-2 flex items-center`}>
        <div
          className={`w-[50%] flex justify-between items-center ${
            isOpened ? 'pl-16' : ''
          }`}
        >
          <span className='text-[var(--color-text-subtle)] '>23:49 PM</span>
          <div className='w-40 h-32'>
            <ActivityIcon type={'BUY'} chain={'ethereum'} />
          </div>
        </div>

        <div className='w-[50%] flex items-start'>
          {isEdit ? (
            <div className='flex flex-col ml-9'>
              <Dropdown
                className='w-145 h-34'
                id='activityType'
                listStyle='w-full'
                list={LIST.map((item) => item.type)}
                selected={LIST.find((item) => item.selected)?.type || ''}
                onClick={(type) => handleClickList(type)}
              />
              <Dropdown
                className='flex items-center'
                id='activityType'
                isOpened={isOpened}
                setIsOpened={() => {}}
                isEdit={isEdit}
              />
            </div>
          ) : (
            <div className='flex flex-col ml-9'>
              <span className='font-caption-medium text-[var(--color-text-main)]'>
                BUY
              </span>
              <span>Buy</span>
            </div>
          )}
        </div>
      </div>
      <div className='col-span-2 flex items-center'>
        <Image
          src={'/logo/ETHLogo.svg'}
          width={32}
          height={32}
          alt='activity image'
          className='mr-8'
        />
        <span className={`font-caption-medium ${styles.activityAssets}`}>
          Murakami.Flower #2480
        </span>
      </div>
      <div className='col-span-2 flex items-center'>
        <Image
          src={'/logo/ETHLogo.svg'}
          width={32}
          height={32}
          alt='activity image'
          className='mr-8'
        />
        <span className={`font-caption-medium ${styles.activityAssets}`}>
          Murakami.Flower #2480
        </span>
      </div>
      <div>
        <span className='text-[var(--color-text-subtle)]'>Application</span>
        <div className='flex items-center mt-4'>
          <Image
            src={'/logo/opensea.png'}
            width={16}
            height={16}
            alt='opensea'
          />
          <span className='ml-4 text-[var(--color-text-main)]'>OpenSea</span>
          <Copy className='ml-4 fill-[var(--color-icon-subtle)]' />
        </div>
      </div>
    </div>
  );
};
export default ActivityListRow;
