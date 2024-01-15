'use client';
import Check from '@/public/icon/Check';
import styles from './ValuationDropdown.module.css';

import { useEffect, useRef, useState } from 'react';
import { Collection, TValuation } from '@/interfaces/collection';
import { customValuationAtom } from '@/store/portfolio';
import { useAtom } from 'jotai';
import { formatPercent, mappingConstants } from '@/utils/common';
import CaretDown from '@/public/icon/CaretDown';
import ClockClockwise from '@/public/icon/ClockClockwise';

type Props = {
  collection: Collection;
  valuations: TValuation[];
  card?: boolean;
};
const ValuationDropdown = ({ collection, valuations, card }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [selectedValuation, setSelectedValuation] = useState<TValuation | null>(
    valuations.find((val) => val.selected) ||
      valuations.find((val) => val.default) ||
      null
  );

  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const _valuation = customValuations.find(
      (item) =>
        item.assetContract === collection.collection.assetContract &&
        item.networkId === collection.collection.chain.name
    );
    // _valuation && setSelectedValuation(_valuation.valuationType);
  }, [customValuations]);
  // const handleClickSpam = (obj: TSpam) => {
  //   setSpamList((prev) =>
  //     prev
  //       .filter(
  //         (item) =>
  //           !(
  //             item.assetContract === obj.assetContract &&
  //             item.networkId === obj.networkId
  //           )
  //       )
  //       .concat(obj)
  //   );
  // };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsPopoverOpen(false);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsPopoverOpen(false);
    }
  };
  const handleClickList = (valuationType: TValuation) => {
    setSelectedValuation(valuationType);
    setCustomValuations((prev) =>
      prev
        .filter(
          (item) =>
            !(
              item.assetContract === collection.collection.assetContract &&
              item.networkId === collection.collection.chain.name
            )
        )
        .concat([
          {
            assetContract: collection.collection.assetContract,
            networkId: collection.collection.chain.name,
            valuationType: valuationType.type,
          },
        ])
    );
  };
  return (
    <div
      className={`${styles.container} ${card && styles.full}`}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
      ref={listRef}
    >
      {selectedValuation && (
        <div
          className={`flex justify-start items-center ${
            card && 'text-[var(--color-text-subtle)]'
          }`}
        >
          <p className={`mr-8 min-w-107`}>{`${mappingConstants(
            selectedValuation.type
          )}`}</p>
          <div
            className={`${isPopoverOpen && 'rotate-180'} ${
              card ? 'mr-auto' : 'mr-10'
            }`}
          >
            <CaretDown />
          </div>
          {valuations.find(
            (valuation) => valuation.type === selectedValuation.type
          )?.selected && (
            <ClockClockwise className={`fill-[var(--color-icon-brand)]`} />
          )}
        </div>
      )}
      {isPopoverOpen && (
        <ul className={`${styles.dropdown}`}>
          {valuations.map((valuation, index) => {
            return (
              <li
                key={index}
                onClick={() =>
                  handleClickList({ ...valuation, selected: true })
                }
              >
                <p>{`${mappingConstants(valuation.type)} (${formatPercent(
                  valuation.accuracy
                )})`}</p>
                {selectedValuation?.type === valuation.type && (
                  <Check className='fill-[var(--color-icon-success)]' />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default ValuationDropdown;
