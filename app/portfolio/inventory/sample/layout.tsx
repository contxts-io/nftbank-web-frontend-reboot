import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample Inventory | NFTBank',
  description: 'NFTBank.ai - Portfolio/Inventory',
};
const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-full px-24'>{children}</div>;
};
export default InventoryLayout;
