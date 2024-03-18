'use client';
import { useUser } from '@/utils/hooks/queries/user';
import styles from './ProfileComponent.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { portfolioProfileAtom, portfolioUserAtom } from '@/store/portfolio';
import PortfolioSelector from '../PortfolioSelector';
import Wallet from '@/public/icon/Wallet';
import WalletAndGroupManage from '../wallet/WalletAndGroupManage';
import Button from '../buttons/Button';
import Folder from '@/public/icon/Folder';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { TWallet } from '@/interfaces/inventory';
import {
  useWalletGroup,
  useWalletGroupList,
} from '@/utils/hooks/queries/walletGroup';
import { BasicParam } from '@/interfaces/request';
import { shortenAddress } from '@/utils/common';
import BlockiesIcon from '../BlockiesIcon';
import { Spinner } from '@nextui-org/react';

const LIMIT = 5;
const PortfolioSelectorWrapper = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const { data: user, status: userStatus } = useUser(nickname);
  const portfolioProfile = useAtomValue(portfolioProfileAtom);
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const [option, setOption] = useState<{
    type: 'all' | 'group' | 'wallet';
    value: string;
  }>({ type: 'all', value: '' });
  const { data: walletList } = useWalletList({
    nickname: portfolioProfile?.nickname || '',
    networkId: 'ethereum',
  });
  const { data: walletGroupList } = useWalletGroupList(
    portfolioProfile?.nickname || null
  );
  const { data: walletGroup } = useWalletGroup({
    id: option.value,
    nickname: nickname || '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
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
      setIsOpen(false);
    }
  };
  useEffect(() => {
    portfolioProfile?.nickname && setNickname(portfolioProfile.nickname);
  }, [portfolioProfile]);
  useEffect(() => {
    portfolioUser && handleChangeOption(portfolioUser);
  }, [portfolioUser]);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const handleChangeOption = (row: BasicParam) => {
    Boolean(row.nickname && row.nickname !== '') &&
      // (setOption({
      //   type: 'all',
      //   value: '',
      // }),
      // setPortfolioUser({
      //   nickname: row.nickname,
      //   networkId: 'ethereum',
      // }));
      setOption({
        type: 'all',
        value: '',
      }),
      Boolean(row.walletGroupId && row.walletGroupId !== '') &&
        setOption({
          type: 'group',
          value: row.walletGroupId || '',
        });
    // (setOption({
    //   type: 'group',
    //   value: row.walletGroupId || '',
    // }),
    // setPortfolioUser({
    //   walletGroupId: row.walletGroupId,
    //   networkId: 'ethereum',
    // }));
    Boolean(row.walletAddress && row.walletAddress !== '') &&
      setOption({
        type: 'wallet',
        value: row.walletAddress || '',
      });
    // (setOption({
    //   type: 'wallet',
    //   value: row.walletAddress || '',
    // }),
    // setPortfolioUser({
    //   walletAddress: row.walletAddress,
    //   networkId: 'ethereum',
    // }));
  };
  useEffect(() => {
    console.log('change : walletList : ', walletList);
  }, [walletList]);
  useEffect(() => {
    console.log('option : ', option);
  }, [option]);
  return (
    <div className='relative' ref={listRef}>
      <div className='font-caption-regular flex items-center gap-x-4'>
        <Button
          className={`font-button03-medium ${styles.selectorButton}`}
          onClick={() => toggleOpen()}
          isLoading={userStatus === 'loading'}
          disabled={!user}
        >
          <Folder className={`mr-4`} />
          {option.type === 'all' && <p>All Wallets</p>}
          {option.type === 'group' && (
            <p>
              {walletGroupList?.data.find((group) => group.id === option.value)
                ?.name || walletGroup?.name}
            </p>
          )}
          {option.type === 'wallet' && <p>Wallet</p>}
        </Button>
        {option.type === 'all' &&
          walletList?.data.map((wallet, index) => {
            if (index < LIMIT)
              return (
                <div
                  key={index}
                  className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'
                >
                  <BlockiesIcon
                    walletAddress={wallet.walletAddress}
                    size={16}
                  />
                  {shortenAddress(wallet.walletAddress)}
                </div>
              );
          })}
        {walletList?.data && walletList?.paging.total - LIMIT > 0 && (
          <div className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'>
            {`+ ${walletList.paging.total - 5}`}
          </div>
        )}
        {option.type === 'group' &&
          walletGroup?.wallets?.data.map((wallet, index) => {
            if (index < LIMIT)
              return (
                <div
                  key={index}
                  className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'
                >
                  <BlockiesIcon
                    walletAddress={wallet.walletAddress}
                    size={16}
                  />
                  {shortenAddress(wallet.walletAddress)}
                </div>
              );
          })}
        {walletGroup?.wallets?.data &&
          walletGroup?.wallets?.paging.total - LIMIT > 0 && (
            <div className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'>
              {`+ ${walletGroup?.wallets.paging.total - LIMIT}`}
            </div>
          )}
        {option.type === 'wallet' && (
          <div className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'>
            <BlockiesIcon walletAddress={option.value} size={16} />
            {shortenAddress(option.value)}
          </div>
        )}
      </div>
      {isOpen && (
        <div className={`absolute z-50 top-32 left-0`}>
          {user && (
            <WalletAndGroupManage
              user={user}
              onClose={() => setIsOpen(false)}
              setPortfolioWallet={(param) => setPortfolioUser(param)}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default PortfolioSelectorWrapper;
