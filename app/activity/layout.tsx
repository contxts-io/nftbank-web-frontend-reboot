import styles from './layout.module.css';
const ActivityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.container}>
      <div className='w-full py-24 border-b-1 border-[var(--color-border-main)] px-24'>
        <h2 className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Activities
        </h2>
      </div>
      <div className='px-24'>{children}</div>
    </section>
  );
};
export default ActivityLayout;
