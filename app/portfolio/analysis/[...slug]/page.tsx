'use client';
import AcquisitionType from '@/components/portfolio/analysis/AcquisitionType';
import PerformanceSection from '@/components/portfolio/analysis/PerformanceSection';
import RealizedGainAndLoss from '@/components/portfolio/analysis/RealizedGainAndLoss';
import { BasicParam } from '@/interfaces/request';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const AnalysisPage = ({ params }: { params: { slug: string[] } }) => {
  return (
    <section className='pt-20 px-24 pb-40'>
      <PerformanceSection />
      <RealizedGainAndLoss />
      <AcquisitionType />
    </section>
  );
};
export default AnalysisPage;
