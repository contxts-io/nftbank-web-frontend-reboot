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
      className={`${styles.navigation} border-light-border-main dark:border-dark-border-main`}
    >
      <div className={styles.links}>
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              className={twMerge(
                `font-body01-medium ${styles.link} ${
                  isActive
                    ? 'border-b-4 border-light-border-brand dark:border-light-border-brand'
                    : 'border-0 border-light-border-main dark:border-dark-border-main'
                }`
              )}
              href={link.href}
            >
              {link.name}
            </Link>
          );
        })}
        {pathname === '/portfolio/inventory' && (
          <>
            <button
              className={twMerge(
                `font-body01-medium ${styles.button} ${
                  inventoryType === 'collection' &&
                  'text-light-text-brand dark:text-light-text-brand'
                }`
              )}
              onClick={() => handleClickButton('collection')}
            >
              <div className='flex items-center'>
                <Cube
                  className={`mr-6  w-16 h-16 ${
                    inventoryType === 'collection'
                      ? 'fill-light-icon-brand dark:fill-dark-icon-brand'
                      : 'fill-light-icon-subtlest dark:fill-dark-icon-subtlest'
                  }`}
                />
                <p className='font-body02-medium'>Collections</p>
              </div>
            </button>
            <button
              className={twMerge(
                `font-body01-medium ${styles.button}
                 text-light-text-subtle dark:text-light-text-subtle
                 bg-transparent dark:bg-transparent
                 ${
                   inventoryType === 'item'
                     ? 'text-light-text-brand dark:text-dark-text-brand'
                     : 'fill-light-icon-subtlest dark:fill-dark-icon-subtlest'
                 }`
              )}
              onClick={() => handleClickButton('item')}
            >
              <div className='flex items-center'>
                <ImageSquare
                  className={`mr-6  w-16 h-16 ${
                    inventoryType === 'item' &&
                    'fill-light-icon-brand dark:fill-light-icon-brand'
                  }`}
                />
                <p className='font-body02-medium'>Items</p>
              </div>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default PortfolioTabNavigation;
