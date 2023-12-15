'use client';
import AcquisitionType from '@/components/portfolio/analysis/AcquisitionType';
import PerformanceSection from '@/components/portfolio/analysis/PerformanceSection';
import RealizedGainAndLoss from '@/components/portfolio/analysis/RealizedGainAndLoss';
import { BasicParam } from '@/interfaces/request';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const AnalysisPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  const setPortfolioUser = useSetAtom(portfolioUserAtom);
  const setPortfolioNicknameAtom = useSetAtom(portfolioNicknameAtom);
  useEffect(() => {
    if (slug && Array.isArray(slug) && slug.length === 2) {
      const queryParam: BasicParam = {
        [slug[0]]: slug[1],
        networkId: 'ethereum',
      };
      slug[0] === 'walletAddress' && setPortfolioUser(queryParam);
      slug[0] === 'nickname' && setPortfolioNicknameAtom(slug[1]);
    } else {
      console.log('else');
    }
  }, [slug]);
  return (
    <section className='pt-20 px-24 pb-40'>
      <PerformanceSection />
      <RealizedGainAndLoss />
      <AcquisitionType />
    </section>
  );
};
export default AnalysisPage;
