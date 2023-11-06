import styles from './layout.module.css';
const ActivityLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.container}>{children}</section>;
};
export default ActivityLayout;
