import styles from './ValueRectContainer.module.css';
const ValueRectContainer = () => {
  return (
    <section className={`font-caption-medium ${styles.container}`}>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Total Spend</p>
        <p className={`font-subtitle02-bold ${styles.title}`}>$173,398</p>
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Gas Spend</p>
        <p className={`font-subtitle02-bold ${styles.title}`}>$173,398</p>
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Total Sales</p>
        <p className={`font-subtitle02-bold ${styles.title}`}>$173,398</p>
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Unrealized Gain&Loss</p>
        <div className={styles.row}>
          <p className={`font-subtitle02-bold ${styles.title}`}>$173,398</p>
          <article className={styles.valueSubRect}>
            <div className={`${styles.diffBox} ${styles.plus}`}>
              <p>-2,117(2.3%)</p>
            </div>
            <div className={`${styles.diffBox}`}>
              <p>24h</p>
            </div>
          </article>
        </div>
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Realized Gain&Loss</p>
        <p className={`font-subtitle02-bold ${styles.title}`}>$173,398</p>
      </article>
    </section>
  );
};
export default ValueRectContainer;
