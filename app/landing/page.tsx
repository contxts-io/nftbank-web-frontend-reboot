import BackedBy from '@/components/landing/BackedBy';
import ChromeExtension from '@/components/landing/ChromeExtension';
import EstimateApi from '@/components/landing/EstimateApi';
import ManageMetaverse from '@/components/landing/ManageMetaverse';
import Partners from '@/components/landing/Partners';
import Started from '@/components/landing/Started';
import Taxfiling from '@/components/landing/Taxfiling';
import TopNav from '@/components/landing/TopNav';

const LandingPage = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full px-135 flex flex-col items-center  gap-y-180'>
        <TopNav />
        <ManageMetaverse />
        <EstimateApi />
        <ChromeExtension />
        <Taxfiling />
      </div>
      <Partners />
      <BackedBy />
      <Started />
    </div>
  );
};
export default LandingPage;
