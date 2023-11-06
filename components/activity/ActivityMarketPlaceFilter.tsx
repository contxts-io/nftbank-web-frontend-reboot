import CaretDown from '@/public/icon/CaretDown';
import { useEffect, useState } from 'react';
import styles from './ActivityMarketPlaceFilter.module.css';
import CheckBox from '../checkBox/CheckBox';

const MARKETPLACE: MarketPlace[] = [
  {
    name: 'OpenSea',
    id: 'opensea',
    img: '',
  },
  {
    name: 'Blur',
    id: 'blur',
    img: '',
  },
];
type MarketPlace = {
  name: string;
  id: string;
  img: string;
};
const ActivityMarketPlaceFilter = () => {
  const [marketplaceList, setMarketplaceList] =
    useState<(MarketPlace & { selected: boolean })[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedItemList, setCheckedItemList] = useState<MarketPlace[]>([]);
  useEffect(() => {
    setMarketplaceList(
      MARKETPLACE.map((item) => ({ ...item, selected: false }))
    );
  }, []);
  const handleClickCheck = (item: MarketPlace) => {
    setCheckedItemList((prev) => {
      if (prev.includes(item)) {
        return prev.filter((prevItem) => prevItem !== item);
      }
      return [...prev, item];
    });
  };
  const handleClickClear = () => {
    setCheckedItemList([]);
  };
  return (
    <div className='font-caption-medium mt-16'>
      <div className={`${styles.row} mb-12`} onClick={() => setIsOpen(!isOpen)}>
        <p className='font-button03-medium text-[var(--color-text-subtle)]'>
          Marketplace
        </p>
        <div className={`${isOpen ? 'rotate-180' : ''} ml-auto`}>
          <CaretDown />
        </div>
      </div>
      {isOpen && (
        <div className='w-full border-b-1 border-[var(--color-border-main)] pb-16'>
          {marketplaceList?.map((item, index) => {
            return (
              <div key={index} className={styles.row}>
                <CheckBox
                  checked={
                    checkedItemList.find((checkedItem) => checkedItem === item)
                      ? true
                      : false
                  }
                  onClick={() => handleClickCheck(item)}
                  className={`mr-8`}
                />
                {item.name}
              </div>
            );
          })}
          {checkedItemList.length > 0 && (
            <div
              className='w-fit mt-16 ml-auto cursor-pointer'
              onClick={() => handleClickClear()}
            >
              <p className='text-[var(--color-text-brand)]'>Clear</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ActivityMarketPlaceFilter;
