'use client';
import { useState } from 'react';
import Button from '../buttons/Button';
import styles from './WalletAndGroupManage.module.css';
import Wallet from '@/public/icon/Wallet';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { shortenAddress } from '@/utils/common';
import Copy from '@/public/icon/Copy';
import Plus from '@/public/icon/Plus';
import Folder from '@/public/icon/Folder';
import { useAtom, useAtomValue } from 'jotai';
import { openModalAtom } from '@/store/settings';
import { useWalletGroupList } from '@/utils/hooks/queries/walletGroup';
import { networkIdAtom } from '@/store/portfolio';
import { BasicParam } from '@/interfaces/request';
import { useMe } from '@/utils/hooks/queries/auth';
import { TUser } from '@/interfaces/user';
import { useRouter } from 'next/navigation';
type Props = {
  onClose: () => void;
  setPortfolioWallet: (param: BasicParam) => void;
  user: TUser;
};
const WalletAndGroupManage = (props: Props) => {
  const { data: me } = useMe();
  const networkId = useAtomValue(networkIdAtom);
  const [selected, setSelected] = useState<'wallet' | 'group'>('wallet');
  const [showModal, setShowModal] = useAtom(openModalAtom);
  const router = useRouter();
  const { data: walletList } = useWalletList({ nickname: props.user.nickname });
  const { data: walletGroupList } = useWalletGroupList(props.user.nickname);
  const handleClickList = (param: BasicParam) => {
    // setMySelectedInformation(param);
    props.setPortfolioWallet(param);
    props.onClose();
  };
  const copyAddress = (walletAddress: string) => {
    navigator.clipboard.writeText(walletAddress);
  };
  return (
    <div className={styles.container}>
      <div className='w-full p-16'>
        <div className={styles.buttonWrapper}>
          <Button
            id=''
            className={`${styles.button} ${
              selected === 'wallet' ? styles.selected : ''
            }`}
            onClick={() => setSelected('wallet')}
          >
            Wallet
          </Button>
          <Button
            id=''
            className={`${styles.button} ${
              selected === 'group' && styles.selected
            }`}
            onClick={() => setSelected('group')}
          >
            Group
          </Button>
        </div>
        {selected === 'wallet' && (
          <div className={`font-caption-regular ${styles.body}`}>
            <div
              className='h-40 flex items-center px-10 w-full gap-x-8 bg-[var(--color-elevation-sunken)] text-[var(--color-text-main)] cursor-pointer'
              onClick={() =>
                handleClickList({
                  nickname: props.user?.nickname,
                  walletAddress: '',
                  networkId: networkId,
                })
              }
            >
              <Wallet />
              <p>All Wallet</p>
            </div>
            <div className={styles.listWrapper}>
              {walletList?.data.map((wallet, i) => {
                return (
                  <div
                    key={i}
                    className={styles.list}
                    onClick={() =>
                      handleClickList({
                        walletAddress: wallet.walletAddress,
                        nickname: '',
                        networkId: networkId,
                      })
                    }
                  >
                    <p className='text-[var(--color-text-main)]'>
                      {shortenAddress(wallet.walletAddress)}
                    </p>
                    <Button
                      id=''
                      className={`ml-auto ${styles.copyButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        copyAddress(wallet.walletAddress);
                      }}
                    >
                      <Copy className='w-16 h-16 fill-[var(--color-icon-main)]' />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {selected === 'group' && (
          <div className={`font-caption-regular ${styles.body}`}>
            <div className={styles.listWrapper}>
              {walletGroupList?.data.map((walletGroup, i) => {
                return (
                  <div
                    key={i}
                    className={`${styles.list} text-[var(--color-text-main)]`}
                    onClick={() =>
                      handleClickList({
                        walletGroupId: walletGroup.id,
                        nickname: '',
                        walletAddress: '',
                        networkId: networkId,
                      })
                    }
                  >
                    <Folder />
                    <p>{walletGroup.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {me?.id === props.user.id && (
        <div className={styles.footer}>
          <div
            className={styles.row}
            onClick={() => setShowModal('walletConnect')}
          >
            <Plus className='w-16 h-16' />
            <p>Add Wallet</p>
          </div>
          <div
            className={styles.row}
            onClick={() => setShowModal('walletGroup')}
          >
            <Folder className='w-16 h-16' />
            <p>Add Group</p>
          </div>
          <div
            className={styles.row}
            onClick={() => router.push('/settings/manageWallets')}
          >
            <Wallet className='w-16 h-16' />
            <p>Manage Wallets</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default WalletAndGroupManage;
