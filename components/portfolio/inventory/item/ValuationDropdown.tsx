'use client';
import Check from '@/public/icon/Check';
import styles from './ValuationDropdown.module.css';

import { useEffect, useState } from 'react';
import { TValuation, Token } from '@/interfaces/collection';
import { customValuationAtom } from '@/store/portfolio';
import { useAtom } from 'jotai';
import { formatPercent, mappingConstants } from '@/utils/common';
import CaretDown from '@/public/icon/CaretDown';
import ClockClockwise from '@/public/icon/ClockClockwise';

type Props = {
  token: Token;
  valuations: TValuation[];
};
const ValuationDropdown = ({ token, valuations }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [selectedValuation, setSelectedValuation] = useState<TValuation | null>(
    valuations.find((val) => val.selected) ||
      valuations.find((val) => val.default) ||
      null
  );

  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  useEffect(() => {
    const _valuation = customValuations.find(
      (item) =>
        item.assetContract === token.collection.assetContract &&
        item.networkId === token.collection.chain.name &&
        item.tokenId === token.token.tokenId
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
  const handleClickList = (valuationType: TValuation) => {
    setSelectedValuation(valuationType);
    setCustomValuations((prev) =>
      prev
        .filter(
          (item) =>
            !(
              item.assetContract === token.collection.assetContract &&
              item.networkId === token.collection.chain.name &&
              item.tokenId === token.token.tokenId
            )
        )
        .concat([
          {
            assetContract: token.collection.assetContract,
            networkId: token.collection.chain.name,
            tokenId: token.token.tokenId,
            valuationType: valuationType.type,
          },
        ])
    );
  };
  return (
    <div
      className={`relative cursor-pointer`}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
    >
      {selectedValuation && (
        <div className='flex justify-end items-center'>
          <p className='mr-8'>{`${mappingConstants(
            selectedValuation.type
          )}`}</p>
          <div className={`${isPopoverOpen && 'rotate-180'} mr-10`}>
            <CaretDown />
          </div>
          {valuations.find(
            (valuation) => valuation.type === selectedValuation.type
          )?.selected && (
            <ClockClockwise className='fill-[var(--color-icon-brand)]' />
          )}
        </div>
      )}
      {isPopoverOpen && (
        <ul className={`${styles.dropdown} z-50`}>
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
