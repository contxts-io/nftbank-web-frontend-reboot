'use client';
import Button from '@/components/buttons/Button';
import styles from './PerformanceSection.module.css';
import PerformanceChart from './PerformanceChart';
const PerformanceSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Performance
        </p>
        <Button id=''>Overall</Button>
        <Button id=''>2023</Button>
      </div>
      <PerformanceChart />
    </section>
  );
};
export default PerformanceSection;
