'use client';
import { useState } from 'react';
import styles from './ManageWallets.module.css';
import MyWallets from './MyWallets';
import MyGroups from './MyGroups';
const ManageWallets = () => {
  const [activeTab, setActiveTab] = useState<'wallets' | 'groups'>('wallets');
  return (
    <section className={styles.container}>
      <div className={`font-body01-medium ${styles.tabWrapper}`}>
        <div className='w-24 border-b-4 border-[var(--color-border-main)]' />
        <div
          className={`${styles.tab} ${
            activeTab === 'wallets' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('wallets')}
        >
          My Wallets
        </div>
        <div
          className={`${styles.tab}  ${
            activeTab === 'groups' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </div>
        <div className='flex-1 border-b-4 border-[var(--color-border-main)]' />
      </div>
      {activeTab === 'wallets' && <MyWallets />}
      {activeTab === 'groups' && <MyGroups />}
    </section>
  );
};
export default ManageWallets;
