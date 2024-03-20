import Cancel from '@/public/icon/Cancel';
import Button from '../buttons/Button';
import styles from './DeleteWallet.module.css';
import SubmitButton from '../buttons/SubmitButton';
import { TWallet } from '@/interfaces/inventory';
import { useMutationDeleteWallet } from '@/utils/hooks/mutations/wallet';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useQueryClient } from '@tanstack/react-query';
import { shortenAddress } from '@/utils/common';
type Props = {
  wallet: TWallet;
  onClose: () => void;
};
const DeleteWallet = (props: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteWallet, status: deleteStatus } =
    useMutationDeleteWallet();
  const handleClickDelete = () => {
    deleteWallet(
      { walletId: props.wallet.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['myWalletList'],
          });
          queryClient.invalidateQueries({
            queryKey: ['walletList'],
          });
          props.onClose();
        },
      }
    );
  };
  const walletName = props.wallet.name
    ? props.wallet.name.startsWith('0x')
      ? shortenAddress(props.wallet.name)
      : props.wallet.name
    : shortenAddress(props.wallet.walletAddress);
  return (
    <div className={styles.container}>
      <div className='w-full flex justify-between mb-16'>
        <p className='font-subtitle02-medium text-[var(--color-text-main)]'>
          Wallet Delete
        </p>
        <Button id='' className={styles.button} onClick={() => props.onClose()}>
          <Cancel className='w-16 h-16' />
        </Button>
      </div>
      <p className='font-button03-regular text-[var(--color-text-subtle)]'>
        Are you sure you want to delete{' '}
        <span className='text-[var(--color-text-main)]'>{walletName}</span>? The
        deleted wallet is excluded from the Group
      </p>
      <div className='mt-auto flex justify-end gap-x-8'>
        <Button id='' className={styles.cancelButton}>
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
export default DeleteWallet;
