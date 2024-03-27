'use client';
import InventoryValue from '@/components/portfolio/InventoryValue';
import InventoryContainer from '@/components/portfolio/inventory/InventoryContainer';

const InventoryPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  return (
    <div className='pb-43'>
      <InventoryValue />
      <InventoryContainer />
    </div>
  );
};
export default InventoryPage;
