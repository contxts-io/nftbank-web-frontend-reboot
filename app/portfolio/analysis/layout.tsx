import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analysis | NFTBank',
  description: 'NFTBank.ai - Portfolio/Analysis',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Layout;
