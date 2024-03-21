import SelectSignInMethod from '@/components/auth/SelectSignInMethod';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sign In&Up | NFTBank',
  description: 'NFTBank.ai - Sign In/Up',
};
const SignInPage = () => {
  return <SelectSignInMethod />;
};
export default SignInPage;
