'use client';
import { useState } from 'react';
import styles from './ManageWallets.module.css';
import MyWallets from './MyWallets';
const ManageWallets = () => {
  const [activeTab, setActiveTab] = useState<'wallets' | 'groups'>('wallets');
  return (
    <section className={styles.container}>
      <div className={`font-body01-medium ${styles.tabWrapper}`}>
        <div className='w-24 border-b-4 border-[var(--color-border-main)]' />
        <div className={`${styles.tab} ${styles.active}`}>My Wallets</div>
        <div className={styles.tab}>Groups</div>
        <div className='flex-1 border-b-4 border-[var(--color-border-main)]' />
      </div>
      {activeTab === 'wallets' && <MyWallets />}
    </section>
  );
};
export default ManageWallets;
