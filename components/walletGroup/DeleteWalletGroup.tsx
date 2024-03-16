import Cancel from '@/public/icon/Cancel';
import Button from '../buttons/Button';
import styles from './DeleteWalletGroup.module.css';
import SubmitButton from '../buttons/SubmitButton';
import { TWallet, TWalletGroup } from '@/interfaces/inventory';
import { useMutationDeleteWallet } from '@/utils/hooks/mutations/wallet';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useQueryClient } from '@tanstack/react-query';
import { useWalletGroup } from '@/utils/hooks/queries/walletGroup';
import { deleteMyWalletGroup } from '@/apis/walletGroup';
import { useMutationDeleteWalletGroup } from '@/utils/hooks/mutations/walletGroup';
type Props = {
  walletGroup: TWalletGroup;
  onClose: () => void;
};
const DeleteWalletGroup = (props: Props) => {
  const queryClient = useQueryClient();
  // const { data: walletList, refetch } = useWalletGroup();
  const { mutate: deleteWallet, status: deleteStatus } =
    useMutationDeleteWalletGroup();
  // const handleClickDelete = () => {
  //   deleteWallet(
  //     { walletId: props.wallet.id },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({
  //           queryKey: ['myWalletList'],
  //         });
  //         queryClient.invalidateQueries({
  //           queryKey: ['walletList'],
  //         });
  //         props.onClose();
  //       },
  //     }
  //   );
  // };
  const handleClickDelete = () => {
    deleteWallet(
      { walletGroupId: props.walletGroup.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groupList'],
          });
          props.onClose();
        },
      }
    );
  };
  return (
    <div className={styles.container}>
      <div className='w-full flex justify-between mb-16'>
        <p className='font-subtitle02-medium text-[var(--color-text-main)]'>
          Group Delete
        </p>
        <Button id='' className={styles.button} onClick={() => props.onClose()}>
          <Cancel className='w-16 h-16' />
        </Button>
      </div>
      <p className='font-button03-regular text-[var(--color-text-subtle)]'>
        Are you sure you want to delete
        <span className='text-[var(--color-text-main)]'>
          {' '}
          {props.walletGroup.name}
        </span>
        ? When you delete a group, the wallet is not deleted
      </p>
      <div className='mt-auto flex justify-end gap-x-8'>
        <Button
          id=''
          className={styles.cancelButton}
          onClick={() => props.onClose()}
        >
          Cancel
        </Button>
        <SubmitButton
          id=''
          className={styles.deleteButton}
          onClick={() => handleClickDelete()}
          isLoading={deleteStatus === 'loading'}
        >
          <p>Delete</p>
        </SubmitButton>
      </div>
    </div>
  );
};
export default DeleteWalletGroup;
