import ManageWallets from '@/components/settings/manageWallets/ManageWallets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallet Settings | NFTBank',
  description: 'NFTBank.ai - Wallet Settings',
};

const ManageWalletsPage = () => {
  return <ManageWallets />;
};
export default ManageWalletsPage;
