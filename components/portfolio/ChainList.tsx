'use client';
import Image from 'next/image';
import styles from './ChainList.module.css';
import Button from '../buttons/Button';
import { Tooltip } from '@nextui-org/tooltip';
import { CHAIN_LIST } from '@/utils/supportedChains';
import { useAtom, useSetAtom } from 'jotai';
import { selectedChainAtom } from '@/store/settings';
import { TChain } from '@/interfaces/constants';

const ChainList = () => {
  const [selectedChain, setSelectedChain] = useAtom(selectedChainAtom);
  const handleClickChain = (chain: TChain | 'all') => {
    setSelectedChain(chain);
  };
  return (
    <div className={`font-button03-regular ${styles.container}`}>
      <ul className={styles.listWrapper}>
        <li
          onClick={() => handleClickChain('all')}
          className={selectedChain === 'all' ? styles.isActive : ''}
        >
          <div className={styles.logo}>
            <Image src={'/logo/Allchain.svg'} width={16} height={16} alt='' />
          </div>
          <span className='text-[var(--color-text-main)]'>All chain</span>
        </li>
        {CHAIN_LIST.map((chain, index) => (
          <li
            key={index}
            onClick={() => handleClickChain(chain.chain)}
            className={selectedChain === chain.chain ? styles.isActive : ''}
          >
            <Tooltip
              content={chain.name}
              className='bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] h-32 flex items-center justify-center p-8'
            >
              <div className={styles.logo}>
                <Image src={chain.symbol} width={22} height={22} alt='' />
              </div>
            </Tooltip>
            <div className='flex items-center gap-x-4'>
              <p className='text-[var(--color-text-main)]'>$2,770</p>
              <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                99%
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className='min-h-24 flex items-center justify-center py-12'>
        {/* <button id='' className={`font-body02-regular ${styles.moreButton}`}>
          +4 less chains
        </button> */}
      </div>
    </div>
  );
};
export default ChainList;
