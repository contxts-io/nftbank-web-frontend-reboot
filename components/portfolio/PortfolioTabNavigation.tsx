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
    <nav
      className={`${styles.navigation} border-border-main dark:border-border-main-dark dark:bg-elevation-surface-dark`}
    >
      <div className={styles.links}>
        <div
          className={`w-24 h-full border-b-4 border-border-main dark:border-border-main-dark`}
        />
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <div
              key={index}
              className={`border-b-4 h-full flex items-center ${
                isActive
                  ? 'border-border-brand dark:border-border-brand-dark'
                  : 'border-border-main dark:border-border-main-dark'
              }`}
            >
              <Link
                className={`font-body01-medium ${
                  styles.link
                } dark:hover:text-text-main-dark ${
                  isActive && 'text-text-main dark:text-text-main-dark'
                }`}
                href={link.href}
              >
                {link.name}
              </Link>
            </div>
          );
        })}
        {pathname === '/portfolio/inventory' ? (
          <div
            className={`font-body01-medium  ${styles.subButtons} dark:border-border-main-dark dark:text-text-subtlest-dark dark:fill-icon-subtlest-dark`}
          >
            <button
              className={`${styles.button}  ${
                inventoryType === 'collection'
                  ? 'text-text-brand dark:text-text-brand-dark hover:text-text-brand hover:dark:text-text-brand-dark fill-icon-brand dark:fill-icon-brand-dark hover:fill-icon-brand dark:hover:fill-icon-brand-dark'
                  : 'hover:text-text-main hover:fill-icon-main dark:hover:text-text-main-dark dark:hover:fill-icon-main-dark'
              }`}
              onClick={() => handleClickButton('collection')}
            >
              <Cube className={`mr-6  w-16 h-16`} />
              <p>Collections</p>
            </button>

            <button
              className={`${styles.button}  ${
                inventoryType === 'item'
                  ? 'text-text-brand dark:text-text-brand-dark hover:text-text-brand hover:dark:text-text-brand-dark fill-icon-brand dark:fill-icon-brand-dark hover:fill-icon-brand dark:hover:fill-icon-brand-dark'
                  : 'hover:text-text-main hover:fill-icon-main dark:hover:text-text-main-dark dark:hover:fill-icon-main-dark'
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
        <div className='flex-grow h-full border-b-4 dark:border-border-main-dark' />
      </div>
    </nav>
  );
};
export default PortfolioTabNavigation;
