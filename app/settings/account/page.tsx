import AccountContainer from '@/components/settings/account/AccountContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings | NFTBank',
  description: 'NFTBank.ai - Account Settings',
};
const AccountPage = () => {
  return (
    <div className='flex-1 flex justify-center py-24'>
      <AccountContainer />
    </div>
  );
};
export default AccountPage;
