'use client';
import { useEffect, useState } from 'react';
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
import Spinner from '@/public/icon/Spinner';
import { sendGTMEvent } from '@next/third-parties/google';
import { TWallet, TWalletGroup } from '@/interfaces/inventory';
import BlockiesIcon from '../BlockiesIcon';
type Props = {
  onClose: () => void;
  setPortfolioWallet: (param: BasicParam) => void;
  portfolioParam: BasicParam | null;
  user: TUser;
};
const WalletAndGroupManage = (props: Props) => {
  const { data: me } = useMe();
  const networkId = useAtomValue(networkIdAtom);
  const [selected, setSelected] = useState<'wallet' | 'group'>(
    props.portfolioParam?.walletGroupId ? 'group' : 'wallet'
  );
  const [showModal, setShowModal] = useAtom(openModalAtom);
  const [nickname, setNickname] = useState(props.user.nickname);
  const router = useRouter();
  const { data: walletList, status } = useWalletList({
    nickname: nickname,
    networkId: 'ethereum',
  });
  const { data: walletGroupList } = useWalletGroupList(props.user.nickname);
  const handleClickEvent = (param: BasicParam) => {
    // setMySelectedInformation(param);
    props.setPortfolioWallet(param);
    props.onClose();
  };
  const handleClickWallet = (wallet: TWallet) => {
    sendGTMEvent({
      event: 'buttonClicked',
      name: 'portfolio_wallet_view_select',
      parameter: wallet.name,
    });
    handleClickEvent({
      nickname: '',
      walletGroupId: '',
      walletAddress: wallet.walletAddress,
      networkId: networkId,
    });
  };
  const handleClickGroup = (walletGroup: TWalletGroup) => {
    sendGTMEvent({
      event: 'buttonClicked',
      name: 'portfolio_wallet_group_view_select',
      parameter: walletGroup.name,
    });
    handleClickEvent({
      nickname: '',
      walletAddress: '',
      walletGroupId: walletGroup.id,
      networkId: networkId,
    });
  };
  const copyAddress = (walletAddress: string) => {
    navigator.clipboard.writeText(walletAddress);
  };
  useEffect(() => {
    console.log('status', status);
    console.log('walletList wrapper', walletList?.data);
    console.log('nickname', nickname);
  }, [status, walletList, nickname]);
  useEffect(() => {
    console.log('props.user : ', props.user);
    props.user?.nickname && setNickname(props.user.nickname);
  }, [props.user]);
  useEffect(() => {
    console.log('props.portfolioParam : ', props.portfolioParam);
    props.portfolioParam?.walletGroupId
      ? setSelected('group')
      : setSelected('wallet');
  }, [props.portfolioParam]);
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
            <div className={styles.listWrapper}>
              <div
                className={`${styles.list} ${
                  props.portfolioParam?.nickname &&
                  props.portfolioParam.nickname !== ''
                    ? 'bg-[var(--color-elevation-sunken)]'
                    : ''
                } flex items-center gap-x-4 hover:bg-[var(--color-elevation-sunken)] pl-8`}
                onClick={() =>
                  handleClickEvent({
                    nickname: props.user?.nickname,
                    walletAddress: '',
                    walletGroupId: '',
                    networkId: networkId,
                  })
                }
              >
                <Wallet />
                <p>All Wallet</p>
              </div>
              {status === 'loading' ? (
                <div
                  className={`${styles.listWrapper} flex justify-center pt-20`}
                >
                  <Spinner />
                </div>
              ) : (
                walletList?.data.map((wallet, i) => {
                  const isSelect =
                    props.portfolioParam?.walletAddress ===
                    wallet.walletAddress;
                  return (
                    <div
                      key={i}
                      className={styles.list}
                      onClick={() => handleClickWallet(wallet)}
                    >
                      <div
                        className={`h-full flex-1 flex items-center gap-x-4 hover:bg-[var(--color-elevation-sunken)] pl-8 ${
                          isSelect ? 'bg-[var(--color-elevation-sunken)]' : ''
                        }`}
                      >
                        <BlockiesIcon
                          walletAddress={wallet.walletAddress}
                          size={16}
                        />
                        <p className='text-[var(--color-text-main)]'>
                          {shortenAddress(wallet.walletAddress)}
                        </p>
                      </div>
                      <Button
                        id=''
                        className={`ml-auto ${styles.copyButton} hover:bg-[var(--color-elevation-sunken)]`}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyAddress(wallet.walletAddress);
                        }}
                      >
                        <Copy className='w-16 h-16 fill-[var(--color-icon-main)]' />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        {selected === 'group' && (
          <div className={`font-caption-regular ${styles.body}`}>
            <div className={styles.listWrapper}>
              {walletGroupList?.data.map((walletGroup, i) => {
                const isSelect =
                  props.portfolioParam?.walletGroupId === walletGroup.id;
                return (
                  <div
                    key={i}
                    className={`${styles.list}
                    ${
                      isSelect ? 'bg-[var(--color-elevation-sunken)]' : ''
                    } flex items-center gap-x-4 hover:bg-[var(--color-elevation-sunken)] pl-8 text-[var(--color-text-main)]`}
                    onClick={() => handleClickGroup(walletGroup)}
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
