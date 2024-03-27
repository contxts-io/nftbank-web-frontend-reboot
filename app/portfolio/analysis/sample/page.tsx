'use client';
import AcquisitionType from '@/components/portfolio/analysis/AcquisitionType';
import PerformanceSection from '@/components/portfolio/analysis/PerformanceSection';
import RealizedGainAndLoss from '@/components/portfolio/analysis/RealizedGainAndLoss';
import { portfolioUserAtom } from '@/store/portfolio';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

const AnalysisPage = () => {
  return (
    <section className='pt-20 px-24 pb-40'>
      <PerformanceSection />
      <RealizedGainAndLoss />
      <AcquisitionType />
    </section>
  );
};
export default AnalysisPage;
