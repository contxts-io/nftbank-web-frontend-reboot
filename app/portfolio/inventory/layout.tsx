import styles from './layout.module.css';

const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
export default InventoryLayout;
