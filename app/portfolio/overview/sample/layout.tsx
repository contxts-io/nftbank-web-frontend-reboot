import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample Overview | NFTBank',
  description: 'NFTBank.ai - Portfolio Overview Sample',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Layout;
