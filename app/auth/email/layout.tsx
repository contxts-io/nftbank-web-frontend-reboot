import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In&Up | NFTBank',
  description: 'NFTBank.ai - Sign In/Up',
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Layout;
