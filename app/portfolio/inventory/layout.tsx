import { Metadata } from 'next';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Inventory | NFTBank',
  description: 'NFTBank.ai - Portfolio/Inventory',
};
const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-full px-24'>{children}</div>;
};
export default InventoryLayout;
