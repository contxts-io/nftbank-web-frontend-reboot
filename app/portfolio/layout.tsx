import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';

const PorfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <PortfolioTabNavigation />
      {children}
    </section>
  );
};
export default PorfolioLayout;
