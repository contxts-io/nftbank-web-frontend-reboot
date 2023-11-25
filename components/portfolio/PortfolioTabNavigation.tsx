'use client';
import Link from 'next/link';
import styles from './PortfolioTabNavigation.module.css';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { inventoryTypeAtom } from '@/store/settings';
import Cube from '@/public/icon/Cube';
import ImageSquare from '@/public/icon/ImageSquare';
const navLinks = [
  { name: 'Overview', href: '/portfolio/overview' },
  { name: 'Analysis', href: '/portfolio/analysis' },
  { name: 'Inventory', href: '/portfolio/inventory' },
];
const PortfolioTabNavigation = () => {
  const pathname = usePathname();

  const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);
  const handleClickButton = (type: 'collection' | 'item') => {
    setInventoryType(type);
  };
  return (
    <nav className={`${styles.navigation} border-[var(--color-border-main)]`}>
      <div className={styles.links}>
        <div
          className={`w-24 h-full border-b-4 border-[var(--color-border-main)]`}
        />
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <div
              key={index}
              className={`border-b-4 h-full flex items-center transition-all duration-400 ${
                isActive
                  ? 'border-[var(--color-border-brand)]'
                  : 'border-[var(--color-border-main)]'
              }`}
            >
              <Link
                className={`font-body01-medium ${styles.link} ${
                  isActive && 'text-[var(--color-text-main)]'
                }`}
                href={link.href}
              >
                {link.name}
              </Link>
            </div>
          );
        })}
        {pathname === '/portfolio/inventory' ? (
          <div className={`font-body01-medium  ${styles.subButtons}`}>
            <button
              className={`${styles.button}  ${
                inventoryType === 'collection'
                  ? 'text-[var(--color-text-brand)]  hover:text-[var(--color-text-brand)]  fill-[var(--color-icon-brand)] hover:fill-[var(--color-icon-brand)]'
                  : 'hover:text-[var(--color-text-main)] hover:fill-[var(--color-icon-main)]'
              }`}
              onClick={() => handleClickButton('collection')}
            >
              <Cube className={`mr-6  w-16 h-16`} />
              <p>Collections</p>
            </button>

            <button
              className={`${styles.button}  ${
                inventoryType === 'item'
                  ? 'text-[var(--color-text-brand)] hover:text-[var(--color-text-brand)] fill-[var(--color-icon-brand)] hover:fill-[var(--color-icon-brand)]'
                  : 'hover:text-[var(--color-text-main)] hover:fill-[var(--color-icon-main)]'
              }`}
              onClick={() => handleClickButton('item')}
            >
              <ImageSquare className={`mr-6  w-16 h-16 `} />
              <p>Items</p>
            </button>
          </div>
        ) : (
          <div />
        )}
        <div className='flex-grow h-full border-b-4 border-[var(--color-border-main)]' />
      </div>
    </nav>
  );
};
export default PortfolioTabNavigation;
