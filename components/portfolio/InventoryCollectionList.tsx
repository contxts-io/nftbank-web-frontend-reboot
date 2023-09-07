'use client';
import { ChangeEvent, useState } from 'react';
import styles from './InventoryCollectionList.module.css';
import InventoryCollectionTable from './InventoryCollectionTable';
import { useAtom } from 'jotai';
import { inventoryCollectionAtom } from '@/store/requestParam';

const InventoryCollectionList = () => {
  const [inventoryCollection, setInventoryCollection] = useAtom(
    inventoryCollectionAtom
  );
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInventoryCollection({
      ...inventoryCollection,
      cursor: 0,
      searchCollection: e.target.value,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <input
          type='text'
          placeholder='Search by collection'
          className={styles.inputSearch}
          onChange={handleChangeInput}
          value={inventoryCollection.searchCollection}
        />
        <button>Spam settings</button>
      </div>
      <InventoryCollectionTable />
    </div>
  );
};
export default InventoryCollectionList;
