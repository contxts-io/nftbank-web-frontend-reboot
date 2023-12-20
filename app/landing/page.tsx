'use client';
import TopNav from '@/components/TopNav';
import BackedBy from '@/components/landing/BackedBy';
import Blog from '@/components/landing/Blog';
import ChromeExtension from '@/components/landing/ChromeExtension';
import EstimateApi from '@/components/landing/EstimateApi';
import Footer from '@/components/landing/Footer';
import ManageMetaverse from '@/components/landing/ManageMetaverse';
import Partners from '@/components/landing/Partners';
import Started from '@/components/landing/Started';
import Taxfiling from '@/components/landing/Taxfiling';
import UpgradeNFTFinance from '@/components/landing/UpgradeNFTFinance';
import UsersAre from '@/components/landing/UsersAre';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const LandingPage = () => {
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    setTheme('dark');
  }, []);
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full sticky z-10 top-0'>
        <TopNav />
      </div>
      <div className='w-[1170px] flex flex-col items-center gap-y-180'>
        <UpgradeNFTFinance />
        <ManageMetaverse />
        <EstimateApi />
        <ChromeExtension />
        <Taxfiling />
      </div>
      <UsersAre />
      <Blog />
      <Partners />
      <BackedBy />
      <Started />
      <Footer />
    </div>
  );
};
export default LandingPage;
