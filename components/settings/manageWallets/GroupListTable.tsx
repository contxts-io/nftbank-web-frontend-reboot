import styles from './GroupListTable.module.css';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency, formatPercent } from '@/utils/common';
import Image from 'next/image';
import DotsThree from '@/public/icon/DotsThree';
import { useWalletGroupList } from '@/utils/hooks/queries/walletGroup';
import { TWalletGroup } from '@/interfaces/inventory';
import CheckCircle from '@/public/icon/CheckCircle';
import Folder from '@/public/icon/Folder';
import { useMe } from '@/utils/hooks/queries/auth';
type Props = {
  handleClickGroup: (group: TWalletGroup) => void;
};
const GroupListTable = (props: Props) => {
  const { data: me } = useMe();
  const { data: groupList } = useWalletGroupList(me?.nickname || '');
  const currency = useAtomValue(currencyAtom);
  return (
    <table className={`font-caption-regular ${styles.table}`}>
      <thead>
        <tr>
          <th className='text-left px-24'>Group</th>
          <th className='text-left'>Addresses</th>
          <th className='text-left'>Balance</th>
          <th className='text-left'>Top Collections</th>
          <th className='text-right pr-24'></th>
        </tr>
      </thead>
      <tbody>
        {groupList?.data.map((group, i) => (
          <tr
            key={i}
            className='cursor-pointer'
            onClick={() => props.handleClickGroup(group)}
          >
            <td className='text-left px-24'>
              <div className='flex items-center mr-111'>
                <Folder />
                <p className='ml-8'>{group.name}</p>
                {/* <div className='ml-4 text-[var(--color-border-brand)]'>
                  <CheckCircle />
                </div> */}
              </div>
            </td>
            <td className='text-left'>
              <p className='mr-111'>{group.walletsCount}</p>
            </td>
            <td className='text-left'>
              <p className='mr-111'>
                {formatCurrency(group.value?.[currency] || '0', currency)}
              </p>
            </td>
            <td className='text-left'>
              <div className='flex gap-8 items-center mr-111'>
                {group.position?.map((position, i) => {
                  return (
                    <div
                      key={i}
                      className='h-32 flex bg-[var(--color-elevation-sunken)] px-8 items-center'
                    >
                      <img
                        width={20}
                        height={20}
                        src={position.collection}
                        className='rounded-full mr-8'
                      />
                      <p>
                        {formatCurrency(
                          position.valuation?.[currency] || '0',
                          currency
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </td>
            <td className='text-right pr-24 w-16'>
              <DotsThree width={16} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default GroupListTable;
