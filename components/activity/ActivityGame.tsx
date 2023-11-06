'use client';
import CaretDown from '@/public/icon/CaretDown';
import styles from './ActivityCollection.module.css';
import { useState } from 'react';
import CheckBox from '../checkBox/CheckBox';
type Game = {
  id: number;
  name: string;
};
const GAME_LIST: Game[] = [
  {
    id: 1,
    name: 'Axie Infinity',
  },
  {
    id: 2,
    name: 'CryptoKitties',
  },
  {
    id: 3,
    name: 'Aavegotchi',
  },
  {
    id: 4,
    name: 'Alpaca city',
  },
];
const ActivityGame = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedItemList, setCheckedItemList] = useState<Game[]>([]);

  const handleClickChecked = (item: Game) => {
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
          Game
        </p>
        <div className={`${isOpen ? 'rotate-180' : ''} ml-auto`}>
          <CaretDown />
        </div>
      </div>
      {isOpen && (
        <div className='w-full border-b-1 border-[var(--color-border-main)] pb-16'>
          {GAME_LIST &&
            GAME_LIST.map((item, index) => {
              return (
                <div key={index} className={styles.row}>
                  <CheckBox
                    checked={
                      checkedItemList.find(
                        (checkedItem) => checkedItem === item
                      )
                        ? true
                        : false
                    }
                    onClick={() => handleClickChecked(item)}
                    className='mr-8'
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
export default ActivityGame;
