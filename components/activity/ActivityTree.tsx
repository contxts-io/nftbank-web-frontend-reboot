'use client';
import styles from './ActivityTree.module.css';
import CaretDown from '@/public/icon/CaretDown';
import { useState } from 'react';
import CheckBox from '../checkBox/CheckBox';
import Button from '../buttons/Button';

const ACTIVITY_TREE = [
  {
    id: 1,
    name: 'SELL',
  },
  {
    id: 2,
    name: 'BUY',
    children: [
      {
        id: 21,
        name: 'Buy',
      },
      {
        id: 22,
        name: 'Batch Buy',
      },
      {
        id: 22,
        name: 'Bundle Buy',
      },
    ],
  },
  {
    id: 3,
    name: 'MINT',
    children: [
      {
        id: 31,
        name: 'Mint',
      },
      {
        id: 32,
        name: 'Free Mint',
      },
    ],
  },
  {
    id: 4,
    name: 'AIRDROP',
  },
  {
    id: 5,
    name: 'TRANSFER',
  },
  {
    id: 6,
    name: 'GAME ACTIVITY',
    children: [
      {
        id: 61,
        name: 'Breeding',
      },
      {
        id: 62,
        name: 'Presale',
      },
    ],
  },
];
type Item = {
  id: number;
  name: string;
  children?: Item[];
};
type Props = {
  item: Item;
  onClick: (value: Item) => void;
  onClickChecked: (value: Item) => void;
  selectedItems: Item[];
  checkedItemList: Item[];
};
const TreeItem = (props: Props) => {
  const { item, onClick, selectedItems, onClickChecked, checkedItemList } =
    props;
  const isOpen = selectedItems.find(
    (selectedItem) => selectedItem.id === item.id
  );
  const all = item.name === 'MINT';

  return (
    <article className={styles.article} onClick={() => onClick(item)}>
      <div className={`${styles.row} mb-8`}>
        <CheckBox
          checked={
            checkedItemList.find((checkedItem) => checkedItem === item)
              ? true
              : false
          }
          onClick={() => onClickChecked(item)}
          className={`mr-8 ${all && 'bg-[var(--color-background-brand-bold)]'}`}
        />
        <p>{item.name}</p>
        {item.children && (
          <div className={`${isOpen ? 'rotate-180' : ''} ml-auto`}>
            <CaretDown />
          </div>
        )}
      </div>
      <div className={styles.childList}>
        {item.children &&
          isOpen &&
          item.children.map((child, index) => {
            return (
              <TreeItem
                key={`${item.id}-${index}`}
                item={child}
                onClick={onClick}
                onClickChecked={(child: Item) => onClickChecked(child)}
                selectedItems={selectedItems}
                checkedItemList={checkedItemList}
              />
            );
          })}
      </div>
    </article>
  );
};
const ActivityTree = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [checkedItemList, setCheckedItemList] = useState<Item[]>([]);
  const handleClickItem = (item: Item) => {
    console.log('item', item);
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((prevItem) => prevItem !== item);
      }
      return [...prev, item];
    });
  };
  const handleClickChecked = (item: Item) => {
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
    <div className='font-caption-medium'>
      <div className={`${styles.row} mb-12`} onClick={() => setIsOpen(!isOpen)}>
        <p className='font-button03-medium text-[var(--color-text-subtle)]'>
          ActivityTree
        </p>
        <div className={`${isOpen ? 'rotate-180' : ''} ml-auto`}>
          <CaretDown />
        </div>
      </div>
      {isOpen && (
        <div className='w-full border-b-1 border-[var(--color-border-main)]'>
          {ACTIVITY_TREE.map((item, index) => {
            return (
              <TreeItem
                key={index}
                item={item}
                onClick={(item: Item) => handleClickItem(item)}
                onClickChecked={(item: Item) => handleClickChecked(item)}
                selectedItems={selectedItems}
                checkedItemList={checkedItemList}
              />
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
export default ActivityTree;
