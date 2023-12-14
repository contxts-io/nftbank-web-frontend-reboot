'use client';
import Image from 'next/image';
import styles from './ChainSelector.module.css';
import { CHAIN_LIST } from '@/utils/supportedChains';
import Info from '@/public/icon/Info';
import Check from '@/public/icon/Check';
import { selectedChainAtom } from '@/store/settings';
import { useAtom } from 'jotai';
import { TChain } from '@/interfaces/constants';

const ChainSelector = () => {
  const [selectedChain, setSelectedChain] = useAtom(selectedChainAtom);
  const handleClickChain = (chain: TChain | 'all') => {
    setSelectedChain(chain);
  };
  return (
    <div className={styles.container}>
      <ul className={styles.listWrapper}>
        <li onClick={() => handleClickChain('all')}>
          <div className={styles.logo}>
            <Image src={'/logo/Allchain.svg'} width={16} height={16} alt='' />
          </div>
          <span className='text-[var(--color-text-main)]'>All chain</span>
        </li>
        {CHAIN_LIST.map((chain, index) => (
          <li key={index} onClick={() => handleClickChain(chain.chain)}>
            <div className={styles.logo}>
              <Image src={chain.symbol} width={22} height={22} alt='' />
            </div>
            <div>
              <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                {`${chain.name} (99%)`}
              </p>
              <p className='text-[var(--color-text-main)]'>$2,770</p>
            </div>
            {selectedChain === chain.chain && (
              <div className='ml-auto'>
                <Check className='fill-[var(--color-icon-brand)]' />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className='p-12 flex items-center justify-between border-t-1 border-[var(--color-border-main)]'>
        <p>{`${CHAIN_LIST.length} Chain Supported`}</p>
        <Info />
      </div>
    </div>
  );
};
export default ChainSelector;
