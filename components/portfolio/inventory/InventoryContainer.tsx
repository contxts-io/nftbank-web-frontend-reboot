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
import { addedSpamListAtom, customValuationAtom } from '@/store/portfolio';
import CustomValuationSaveToast from './item/CustomValuationSaveToast';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';

const InventoryContainer = () => {
  const searchParams = useSearchParams();
  const { data: walletList } = useMyWalletList();
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
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  useEffect(() => {
    setCustomValuations([]);
  }, []);
  const spamList = useAtomValue(addedSpamListAtom);
  useEffect(() => {
    const wallet = walletList?.[0].walletAddress;
    setInventoryCollection({
      ...inventoryCollection,
      walletAddress: walletAddress || wallet || '',
    });
    setInventoryCollectionFilter({
      ...inventoryCollectionFilter,
      walletAddress: walletAddress || wallet || '',
    });
    setInventoryItem({
      ...inventoryItem,
      walletAddress: walletAddress || wallet || '',
    });
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      walletAddress: walletAddress || wallet || '',
    });
  }, [walletAddress, walletList]);

  return (
    <section className='w-full'>
      {inventoryType === 'collection' && (
        <>
          <InventoryCollectionSettings />
          <InventoryCollectionTable />
          {spamList.length > 0 && <SpamSaveToast />}
          {customValuations.length > 0 && <CustomValuationSaveToast />}
        </>
      )}
      {inventoryType === 'item' && (
        <div className='sticky top-116 mt-20'>
          <InventoryItemSection />
        </div>
      )}
    </section>
  );
};
export default InventoryContainer;
