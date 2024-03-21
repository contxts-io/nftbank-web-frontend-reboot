import EmailForm from '@/components/auth/EmailForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sign In&Up | NFTBank',
  description: 'NFTBank.ai - Sign In/Up',
};
const EmailSignInUpPage = () => {
  return <EmailForm />;
};

export default EmailSignInUpPage;
