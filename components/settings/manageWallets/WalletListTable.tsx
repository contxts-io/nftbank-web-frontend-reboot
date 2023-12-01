import Check from '@/public/icon/Check';
import styles from './WalletListTable.module.css';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency, formatPercent } from '@/utils/common';
import Image from 'next/image';
import FolderFilled from '@/public/icon/FolderFilled';
import DotsThree from '@/public/icon/DotsThree';
import CheckCircle from '@/public/icon/CheckCircle';
import Identicon from '@polkadot/react-identicon';

const WalletListTable = () => {
  const { data: walletList } = useMyWalletList();
  const currency = useAtomValue(currencyAtom);
  return (
    <table className={`font-caption-regular ${styles.table}`}>
      <thead>
        <tr>
          <th className='text-left px-24'>wallet</th>
          <th className='text-left'>Balance</th>
          <th className='text-left'>Top Collections</th>
          <th className='text-left'>Group</th>
          <th className='text-right'></th>
        </tr>
      </thead>
      <tbody>
        {walletList?.data.map((wallet, i) => (
          <tr key={i}>
            <td className='text-left px-24'>
              <div className='flex items-center mr-111'>
                <Identicon
                  value={wallet.walletAddress}
                  size={32}
                  theme={'polkadot'}
                  className='w-32 h-32'
                />
                <p>{wallet.walletAddress}</p>
                <div className='ml-4 text-[var(--color-border-brand)]'>
                  <CheckCircle />
                </div>
              </div>
            </td>
            <td className='text-left'>
              <p className='mr-111'>
                {formatCurrency(wallet.value[currency], currency)}
              </p>
            </td>
            <td className='text-left'>
              <div className='flex gap-8 items-center mr-111'>
                {wallet.position.map((position, i) => {
                  const totalValue = wallet.position.reduce((a: number, b) => {
                    return a + parseFloat(b.value[currency].amount || '0');
                  }, 0);
                  console.log('totalValue', totalValue);
                  return (
                    <div
                      key={i}
                      className='h-32 flex bg-[var(--color-elevation-sunken)] px-8 items-center'
                    >
                      <Image
                        width={20}
                        height={20}
                        src={position.collection.imageUrl}
                        alt={position.collection.name}
                        className='rounded-full mr-8'
                      />
                      <p>
                        {totalValue > 0
                          ? formatPercent(
                              (
                                (parseFloat(
                                  position.value[currency].amount || '0'
                                ) /
                                  totalValue) *
                                100
                              ).toString()
                            )
                          : '-'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </td>
            <td className='text-left'>
              <div className='flex items-center gap-4'>
                <FolderFilled />
                {wallet.groups.map((group, i) => (
                  <p key={i}>{group.name}</p>
                ))}
              </div>
            </td>
            <td className='text-end w-16 pr-24'>
              <DotsThree />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default WalletListTable;
