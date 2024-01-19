'use client';
import InventoryValue from '@/components/portfolio/InventoryValue';
import styles from './page.module.css';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { InventoryValueNested } from '@/interfaces/inventory';
import InventoryContainer from '@/components/portfolio/inventory/InventoryContainer';
import { useAtomValue, useSetAtom } from 'jotai';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { portfolioUserAtom } from '@/store/portfolio';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const InventoryPage = () => {
  return (
    <section className={styles.container}>
      {/**
       *
       * sprint 1
       *
       *  <InventoryValue /> */}
      {/* <InventoryContainer /> */}
    </section>
  );
};
export default InventoryPage;
