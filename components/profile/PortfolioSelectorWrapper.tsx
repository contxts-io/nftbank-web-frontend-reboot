'use client';
import { useUser } from '@/utils/hooks/queries/user';
import styles from './ProfileComponent.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { portfolioProfileAtom, portfolioUserAtom } from '@/store/portfolio';
import PortfolioSelector from '../PortfolioSelector';
import Wallet from '@/public/icon/Wallet';
import WalletAndGroupManage from '../wallet/WalletAndGroupManage';
import Button from '../buttons/Button';
import Folder from '@/public/icon/Folder';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { TWallet } from '@/interfaces/inventory';
import { useMyWalletGroup } from '@/utils/hooks/queries/walletGroup';
import { BasicParam } from '@/interfaces/request';
import { shortenAddress } from '@/utils/common';
import BlockiesIcon from '../BlockiesIcon';

const PortfolioSelectorWrapper = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const { data: user, status: userStatus } = useUser(nickname);
  const [portfolioProfile, setPortfolioProfile] = useAtom(portfolioProfileAtom);
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const [option, setOption] = useState<{
    type: 'all' | 'group' | 'wallet';
    value: string;
  }>({ type: 'all', value: '' });
  const { data: walletList } = useWalletList({
    nickname: portfolioProfile?.nickname || '',
  });
  const { data: groupWalletList } = useMyWalletGroup(option.value);
  const [selectedWallets, setSelectedWallets] = useState<TWallet[]>([]);
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
  useEffect(() => {
    option.type === 'all' && setSelectedWallets(walletList?.data || []);
    option.type === 'group' && setSelectedWallets(walletList?.data || []);
  }, [option]);
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
  return (
    <div className='relative' ref={listRef}>
      <div className='font-caption-regular flex items-center gap-x-4'>
        <Button
          className={`font-button03-medium ${styles.selectorButton}`}
          onClick={() => toggleOpen()}
        >
          <Folder className={`mr-4`} />
          {option.type === 'all' && <p>All Wallets</p>}
          {option.type === 'group' && <p>Group</p>}
          {option.type === 'wallet' && <p>Wallet</p>}
        </Button>
        {option.type === 'all' &&
          walletList?.data.splice(0, 5).map((wallet, index) => {
            return (
              <div
                key={index}
                className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'
              >
                <BlockiesIcon walletAddress={wallet.walletAddress} size={16} />
                {shortenAddress(wallet.walletAddress)}
              </div>
            );
          })}
        {walletList?.data && walletList?.paging.total - 5 > 0 && (
          <div className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'>
            {`+ ${walletList.paging.total - 5}`}
          </div>
        )}
        {option.type === 'group' &&
          groupWalletList?.wallets?.data.map((wallet, index) => {
            return (
              <div
                key={index}
                className='rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-elevation-sunken)] border-1 border-[var(--color-border-main)]'
              >
                <BlockiesIcon walletAddress={wallet.walletAddress} size={16} />
                {shortenAddress(wallet.walletAddress)}
              </div>
            );
          })}
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
