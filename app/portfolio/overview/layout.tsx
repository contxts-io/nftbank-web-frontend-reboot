import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overview | NFTBank',
  description: 'NFTBank.ai - Portfolio Overview',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Layout;
