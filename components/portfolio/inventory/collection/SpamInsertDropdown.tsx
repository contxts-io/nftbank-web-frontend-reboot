'use client';
import Check from '@/public/icon/Check';
import styles from './SpamInsertDropdown.module.css';

import { useEffect, useState } from 'react';
import { TSpam } from '@/interfaces/spam';
import { Collection, CollectionMetadata } from '@/interfaces/collection';
import { addedSpamListAtom } from '@/store/portfolio';
import { useAtom } from 'jotai';
import Button from '@/components/buttons/Button';
import DotsThree from '@/public/icon/DotsThree';

type Props = {
  collection: Collection;
  icon?: boolean;
};
const SpamInsertDropdown = ({ collection, icon }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [spamList, setSpamList] = useAtom(addedSpamListAtom);
  const [selectedCollection, setSelectedCollection] =
    useState<Collection>(collection);

  const handleClickSpam = (isSpam: boolean) => {
    setSelectedCollection((prev) => ({
      ...prev,
      collection: { ...prev.collection, isSpam: isSpam },
    }));
    setSpamList((prev) =>
      prev
        .filter(
          (item) =>
            !(
              item.assetContract ===
                selectedCollection.collection.assetContract &&
              item.networkId === selectedCollection.collection.chain.name
            )
        )
        .concat({
          assetContract: selectedCollection.collection.assetContract,
          networkId: selectedCollection.collection.chain.name,
          isSpam: isSpam,
        })
    );
  };
  // useEffect(() => {
  //   const item = spamList.find(
  //     (item) =>
  //       item.assetContract === collection.collection.assetContract &&
  //       item.networkId === collection.collection.chain.name
  //   );
  //   console.log('item', item);
  //   setSelectedCollection((prev) => ({
  //     ...prev,
  //     collection: {
  //       ...prev.collection,
  //       isSpam: item ? item.isSpam : prev.collection.isSpam,
  //     },
  //   }));
  // }, [spamList]);
  return (
    <div
      className={`relative cursor-pointer ${
        icon
          ? 'border-1 border-[var(--color-border-bold)] hover:border-[var(--color-border-selected)] text-[var(--color-icon-subtle)] hover:text-[var(--color-icon-main)] right-0'
          : 'border-0 p-0 w-100'
      }`}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
    >
      {icon ? (
        <DotsThree />
      ) : selectedCollection.collection.isSpam ? (
        <p className={styles.pSpam}>Spam</p>
      ) : (
        <p className={styles.pNonSpam}>Non Spam</p>
      )}
      {isPopoverOpen && (
        <ul className={`${styles.dropdown} z-50`}>
          <li onClick={() => handleClickSpam(true)}>
            <p>Spam</p>
            {selectedCollection.collection.isSpam && (
              <Check className='fill-[var(--color-icon-success)]' />
            )}
          </li>
          <li onClick={() => handleClickSpam(false)}>
            Non Spam
            {!selectedCollection.collection.isSpam && (
              <Check className='fill-[var(--color-icon-success)]' />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};
export default SpamInsertDropdown;
