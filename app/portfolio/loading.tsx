import SkeletonLoader from '@/components/SkeletonLoader';
import styles from '@/components/portfolio/InventoryValue.module.css';
const Loading = () => {
  return (
    <div className='w-screen px-24'>
      <section className={`${styles.container} dark:border-border-main-dark`}>
        {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => (
          <article
            key={index}
            className={`${styles.articleBox} dark:border-border-main-dark`}
          >
            <div className='w-fit'>
              <SkeletonLoader className={`h-16 w-100 mb-4`} />
              <div className='border-t-1 border-dashed border-border-accent-gray dark:border-border-accent-gray-dark' />
            </div>
            <div className={styles.valueRow}>
              <div className='mr-8 items-end'>
                <SkeletonLoader className={`h-30 w-200`} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
export default Loading;
