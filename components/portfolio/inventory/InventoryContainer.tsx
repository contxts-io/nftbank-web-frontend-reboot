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
import { useEffect } from 'react';
import InventoryCollectionSettings from './collection/InventoryCollectionSettings';
import InventoryCollectionTable from './collection/InventoryCollectionTable';
import InventoryItemSection from './item/InventoryItemSection';
import SpamSaveToast from './collection/SpamSaveToast';
import {
  addedSpamListAtom,
  customValuationAtom,
  portfolioUserAtom,
} from '@/store/portfolio';
import CustomValuationSaveToast from './item/CustomValuationSaveToast';

const InventoryContainer = () => {
  const searchParams = useSearchParams();
  const portfolioUser = useAtomValue(portfolioUserAtom);
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
    setInventoryCollection({
      ...inventoryCollection,
      ...portfolioUser,
    });
    setInventoryCollectionFilter({
      ...inventoryCollectionFilter,
      ...portfolioUser,
    });
    setInventoryItem({
      ...inventoryItem,
      ...portfolioUser,
    });
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      ...portfolioUser,
    });
  }, [walletAddress, portfolioUser]);

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
      {inventoryType === 'item' && <InventoryItemSection />}
    </section>
  );
};
export default InventoryContainer;
