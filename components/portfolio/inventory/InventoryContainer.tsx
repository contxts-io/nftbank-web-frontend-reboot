'use client';
import {
  inventoryCollectionAtom,
  inventoryItemFilterCollectionAtom,
  inventoryItemListAtom,
  inventorySpamCollectionAtom,
} from '@/store/requestParam';
import { inventoryTypeAtom } from '@/store/settings';
import { useAtom, useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InventoryCollectionSettings from './collection/InventoryCollectionSettings';
import InventoryCollectionTable from './collection/InventoryCollectionTable';
import InventoryItemSection from './item/InventoryItemSection';
import ReactModal from 'react-modal';
import SpamModal from './collection/SpamModal';
import { useMe } from '@/utils/hooks/queries/auth';
import SpamSaveToast from './collection/SpamSaveToast';
import { addedSpamListAtom } from '@/store/portfolio';

const InventoryContainer = () => {
  const searchParams = useSearchParams();
  const { data: me } = useMe();
  const walletAddress = searchParams.get('walletAddress');
  const inventoryType = useAtomValue(inventoryTypeAtom);
  const [inventoryCollection, setInventoryCollection] = useAtom(
    inventoryCollectionAtom
  );
  const [inventoryCollectionFilter, setInventoryCollectionFilter] = useAtom(
    inventoryItemFilterCollectionAtom
  );
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventorySpamCollectionAtom);
  const [inventoryItem, setInventoryItem] = useAtom(inventoryItemListAtom);
  const spamList = useAtomValue(addedSpamListAtom);
  useEffect(() => {
    setInventoryCollection({
      ...inventoryCollection,
      walletAddress: walletAddress || me?.walletAddress || '',
    });
    setInventoryCollectionFilter({
      ...inventoryCollectionFilter,
      walletAddress: walletAddress || me?.walletAddress || '',
    });
    setInventoryItem({
      ...inventoryItem,
      walletAddress: walletAddress || me?.walletAddress || '',
    });
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      walletAddress: walletAddress || me?.walletAddress || '',
    });
  }, [walletAddress, me?.walletAddress]);

  return (
    <section className='w-full'>
      {inventoryType === 'collection' && (
        <>
          <InventoryCollectionSettings />
          <InventoryCollectionTable />
          {spamList.length > 0 && <SpamSaveToast />}
        </>
      )}
      {inventoryType === 'item' && (
        <div className='sticky top-116'>
          <InventoryItemSection />
        </div>
      )}
    </section>
  );
};
export default InventoryContainer;
