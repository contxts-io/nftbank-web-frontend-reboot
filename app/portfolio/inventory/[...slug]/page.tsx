'use client';
import InventoryValue from '@/components/portfolio/InventoryValue';
import InventoryContainer from '@/components/portfolio/inventory/InventoryContainer';
import { useSetAtom } from 'jotai';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useEffect } from 'react';
import { BasicParam } from '@/interfaces/request';

const InventoryPage = ({ params }: { params: { slug: string[] } }) => {
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
    <section className='w-screen px-24'>
      <InventoryValue />
      <InventoryContainer />
    </section>
  );
};
export default InventoryPage;
