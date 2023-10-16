'use client';
import Check from '@/public/icon/Check';
import styles from './SpamInsertDropdown.module.css';

import { useState } from 'react';
import { TSpam } from '@/interfaces/spam';
import { CollectionMetadata } from '@/interfaces/collection';
import { addedSpamListAtom } from '@/store/portfolio';
import { useAtom } from 'jotai';
import Button from '@/components/buttons/Button';
import DotsThree from '@/public/icon/DotsThree';

type Props = {
  collection: CollectionMetadata;
  icon?: boolean;
};
const SpamInsertDropdown = ({ collection, icon }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [spamList, setSpamList] = useAtom(addedSpamListAtom);
  const obj = {
    assetContract: collection.assetContract,
    networkId: collection.chain.name,
    isSpam:
      spamList.find(
        (item) =>
          item.assetContract === collection.assetContract &&
          item.networkId === collection.chain.name
      )?.isSpam === false
        ? false
        : true,
  };
  const handleClickSpam = (obj: TSpam) => {
    setSpamList((prev) =>
      prev
        .filter(
          (item) =>
            !(
              item.assetContract === obj.assetContract &&
              item.networkId === obj.networkId
            )
        )
        .concat(obj)
    );
  };
  return (
    <div
      className={`relative cursor-pointer ${
        icon ? 'border-1' : 'border-0 p-0 w-100'
      }`}
      id={`/spam/insert/${collection.chain.name}/${collection.assetContract}`}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
    >
      {icon ? (
        <DotsThree />
      ) : obj.isSpam ? (
        <p className={styles.pSpam}>Spam</p>
      ) : (
        <p className={styles.pNonSpam}>Non Spam</p>
      )}
      {isPopoverOpen && (
        <ul className={`${styles.dropdown} z-50`}>
          <li
            onClick={() =>
              handleClickSpam({
                ...obj,
                isSpam: true,
              })
            }
          >
            <p>Spam</p>
            {obj.isSpam && (
              <Check className='fill-[var(--color-icon-success)]' />
            )}
          </li>
          <li
            onClick={() =>
              handleClickSpam({
                ...obj,
                isSpam: false,
              })
            }
          >
            Non Spam
            {!obj.isSpam && (
              <Check className='fill-[var(--color-icon-success)]' />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};
export default SpamInsertDropdown;
