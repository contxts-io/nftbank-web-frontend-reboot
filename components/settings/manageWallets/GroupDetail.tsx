import Folder from '@/public/icon/Folder';
import styles from './GroupDetail.module.css';
import Button from '@/components/buttons/Button';
import { TWalletGroup } from '@/interfaces/inventory';
import { useMyWalletGroup } from '@/utils/hooks/queries/walletGroup';
import SubmitButton from '@/components/buttons/SubmitButton';
import { useEffect } from 'react';
import BlockiesIcon from '@/components/BlockiesIcon';
type Props = {
  group: TWalletGroup;
  openManageGroup: () => void;
};
const GroupDetail = (props: Props) => {
  const { group } = props;
  console.log('group', group);
  const { data: walletGroup, status } = useMyWalletGroup(group.id);
  const handleOpenGroupManage = () => {
    props.openManageGroup();
  };
  useEffect(() => {
    console.log('walletGroup', walletGroup);
  }, [walletGroup]);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className='w-full text-[var(--color-text-main)] flex items-center'>
          <Folder className='w-24 h-24 mr-8' />
          <p className={`font-subtitle01-medium`}>{group.name}</p>
          <div className='flex gap-8 ml-auto'>
            <Button id='' className={styles.deleteButton}>
              Delete
            </Button>
            <Button id='' onClick={() => handleOpenGroupManage()}>
              Edit Group Name
            </Button>
            <Button id=''>Group Setting</Button>
          </div>
        </div>
        <div className='bg-[var(--color-elevation-sunken)] h-26 flex items-center w-fit px-8 mt-8'>
          <p className='font-caption-regular text-[var(--color-text-main)]'>{`${group.walletsCount} Addresses`}</p>
        </div>
      </div>
      {walletGroup && (
        <div className={styles.body}>
          <table className={`font-caption-regular ${styles.walletListTable}`}>
            <thead className='text-[var(--color-text-subtle)]'>
              <tr>
                <th className='pl-24 text-left mr-120'>Wallet</th>
                <th className='text-left  mr-120'>Balance</th>
                <th className='text-left'>Top Collections</th>
                <th />
              </tr>
            </thead>
            <tbody className='text-[var(--color-text-main)]'>
              {walletGroup.wallets?.data.map((wallet, i) => {
                return (
                  <tr key={i}>
                    <td className='pl-24 text-left mr-120'>
                      <div className='flex items-center'>
                        <BlockiesIcon
                          walletAddress={wallet.walletAddress}
                          size={20}
                          className={`${styles.blockIcon} mr-4`}
                        />
                        {wallet.name || wallet.walletAddress}
                      </div>
                    </td>
                    <td className='text-left  mr-120'>Balance</td>
                    <td className='text-left'>Top Collections</td>
                    <td />
                  </tr>
                );
              })}
            </tbody>
          </table>
          {walletGroup.wallets == null && (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <p className='font-button01-medium text-[var(--color-text-main)] mb-8'>
                No Wallets
              </p>
              <p className='font-body02-regular text-[var(--color-text-subtle)] mb-40'>
                No Wallets have been added to this group yet
              </p>
              <SubmitButton id=''>Group Setting</SubmitButton>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default GroupDetail;
