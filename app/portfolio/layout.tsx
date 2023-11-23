'use client';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';

const PorfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <ProfileComponent />
      <PortfolioTabNavigation />
      {children}
    </section>
  );
};
export default PorfolioLayout;
