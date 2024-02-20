import { Metadata } from 'next';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'NFTBank.ai reboot - Portfolio/Inventory',
  description: 'NFTBank.ai - Portfolio/Inventory',
};
const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
export default InventoryLayout;
