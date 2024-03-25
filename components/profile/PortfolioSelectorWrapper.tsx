'use client';
import { useUser } from '@/utils/hooks/queries/user';
import styles from './ProfileComponent.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  networkIdAtom,
  portfolioProfileAtom,
  portfolioUserAtom,
} from '@/store/portfolio';
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
import { useMe } from '@/utils/hooks/queries/auth';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { usePathname, useRouter } from 'next/navigation';

const LIMIT = 5;
const PortfolioSelectorWrapper = () => {
  const { data: me } = useMe();
  const path = usePathname();
  const router = useRouter();
  const networkId = useAtomValue(networkIdAtom);
  const [nickname, setNickname] = useState<string | null>(null);
  const { data: user, status: userStatus } = useUser(nickname);
  const portfolioProfile = useAtomValue(portfolioProfileAtom);
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const setMyDefaultPortfolio = useSetAtom(myDefaultPortfolioAtom);
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
    id: option.type === 'group' ? option.value : '',
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
    console.log('portfolioProfile : ', portfolioProfile);
    portfolioProfile?.nickname && setNickname(portfolioProfile.nickname);
  }, [portfolioProfile]);
  useEffect(() => {
    console.log('wrapper portfolioUser', portfolioUser);
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
    console.log('row : ', row);
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
    console.log('portfolioUser changed ? ', portfolioUser);
    portfolioProfile === me &&
      path.split('/').length === 3 &&
      setMyDefaultPortfolio(portfolioUser);
  }, [portfolioProfile, portfolioUser]);
  const handleClickAddWallet = () => {
    router.push('/auth/signin');
  };
  const handleClickWallet = (param: BasicParam) => {
    setPortfolioUser(param);
  };
  return (
    <div className='relative' ref={listRef}>
      <div className='font-caption-regular flex items-center gap-x-4'>
        <Button
          className={`font-button03-medium ${styles.selectorButton}`}
          onClick={() => toggleOpen()}
          isLoading={Boolean(nickname) && userStatus === 'loading'}
          disabled={!user || path.includes('/walletAddress')}
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
                <Button
                  key={index}
                  className={`${styles.walletAddressButton} !hidden !md:flex`}
                  onClick={() =>
                    handleClickWallet({
                      nickname: '',
                      walletGroupId: '',
                      walletAddress: wallet.walletAddress,
                      networkId: networkId,
                    })
                  }
                >
                  <BlockiesIcon
                    walletAddress={wallet.walletAddress}
                    size={16}
                  />
                  {shortenAddress(wallet.walletAddress)}
                </Button>
              );
          })}
        {option.type === 'all' &&
          walletList?.data &&
          walletList?.paging.total - LIMIT > 0 && (
            <Button
              className={`${styles.walletAddressButton} !hidden !md:flex`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {`+ ${walletList.paging.total - 5}`}
            </Button>
          )}
        {option.type === 'group' &&
          walletGroup?.wallets?.data.map((wallet, index) => {
            if (index < LIMIT)
              return (
                <Button
                  key={index}
                  className={`${styles.walletAddressButton} !hidden !md:flex`}
                  onClick={() =>
                    handleClickWallet({
                      nickname: '',
                      walletGroupId: '',
                      walletAddress: wallet.walletAddress,
                      networkId: networkId,
                    })
                  }
                >
                  <BlockiesIcon
                    walletAddress={wallet.walletAddress}
                    size={16}
                  />
                  {shortenAddress(wallet.walletAddress)}
                </Button>
              );
          })}
        {option.type === 'group' &&
          walletGroup?.wallets?.data &&
          walletGroup?.wallets?.paging.total - LIMIT > 0 && (
            <Button
              className={`${styles.walletAddressButton} !hidden !md:flex`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {`+ ${walletGroup?.wallets.paging.total - LIMIT}`}
            </Button>
          )}
        {option.type === 'wallet' && (
          <Button
            className={`${styles.walletAddressButton}`}
            onClick={() =>
              handleClickWallet({
                nickname: '',
                walletGroupId: '',
                walletAddress: option.value,
                networkId: networkId,
              })
            }
          >
            <BlockiesIcon walletAddress={option.value} size={16} />
            {shortenAddress(option.value)}
          </Button>
        )}
        {path.includes('/sample') && (
          <Button
            className='!rounded-[4px] h-28 p-4 gap-x-4 flex items-center bg-[var(--color-background-brand-bold)] border-0 !text-[var(--color-text-inverse)]'
            onClick={() => handleClickAddWallet()}
            id='add_my_wallet_sample'
          >
            + Add Wallet
          </Button>
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
