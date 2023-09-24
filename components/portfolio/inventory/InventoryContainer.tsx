'use client';
import styles from './InventoryContainer.module.css';
import { currencyAtom } from '@/store/currency';
import { inventoryCollectionAtom } from '@/store/requestParam';
import { inventoryTypeAtom } from '@/store/settings';
import { useAtom, useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InventoryCollectionSettings from './collection/InventoryCollectionSettings';
import InventoryCollectionTable from './collection/InventoryCollectionTable';
import InventoryItemSection from './item/InventoryItemSection';
import ReactModal from 'react-modal';
import SpamModal from './collection/SpamModal';

const InventoryContainer = () => {
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('walletAddress') || '';
  const inventoryType = useAtomValue(inventoryTypeAtom);
  const [inventoryCollection, setInventoryCollection] = useAtom(
    inventoryCollectionAtom
  );
  useEffect(() => {
    setInventoryCollection({
      ...inventoryCollection,
      walletAddress,
    });
  }, [walletAddress]);

  return (
    <section className='w-full'>
      {inventoryType === 'collection' && (
        <>
          <InventoryCollectionSettings />
          <InventoryCollectionTable />
        </>
      )}
      {inventoryType === 'item' && <InventoryItemSection />}
    </section>
  );
};
export default InventoryContainer;
