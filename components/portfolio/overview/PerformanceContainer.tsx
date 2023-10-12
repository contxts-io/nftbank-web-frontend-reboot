import Button from '@/components/buttons/Button';
import styles from './PerformanceContainer.module.css';
import CaretDown from '@/public/icon/CaretDown';
import PerformanceChart from './PerformanceChart';
const PerformanceContainer = () => {
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <p className={`font-subtitle02-bold ${styles.title}`}>Performance</p>
        <Button id={'/portfolio/overview/activity/showmore'}>
          2023 <CaretDown />
        </Button>
      </div>
      <PerformanceChart />
      <div className={`font-button03-regular ${styles.bottom}`}>
        <div className='w-[50%] flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>YTD Performance</p>
          <p className='text-[var(--color-text-success)] mr-20'>12.30%</p>
        </div>
        <div className='w-[50%] ml-20 flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>
            All time Performance
          </p>
          <p className='text-[var(--color-text-success)]'>12.30%</p>
        </div>
      </div>
    </section>
  );
};
export default PerformanceContainer;
