'use client';
import { useAtom } from 'jotai';
import styles from './SpamModal.module.css';
import { inventorySpamCollectionAtom } from '@/store/requestParam';
import { ChangeEvent } from 'react';
const SpamModal = () => {
  const [spamCollectionParam, setSpamCollectionParam] = useAtom(
    inventorySpamCollectionAtom
  );
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSpamCollectionParam({
      ...spamCollectionParam,
      searchCollection: e.target.value,
    });
  };
  return (
    <div className={styles.container}>
      <p className={styles.pHeader}>NFT Spam Settings</p>
      <input
        type='text'
        className={styles.inputText}
        placeholder='Search by collection'
        value={spamCollectionParam.searchCollection}
        onChange={handleChangeInput}
      />
      <div className={styles.row}>
        <select className={styles.inputSelect}>
          <option value=''>All Status</option>
          <option value=''>All Status</option>
          <option value=''>All Status</option>
        </select>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};
export default SpamModal;
