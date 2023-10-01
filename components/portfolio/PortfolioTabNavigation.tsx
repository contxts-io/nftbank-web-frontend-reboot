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
      className={`${styles.navigation} border-border-main dark:border-border-main-dark`}
    >
      <div className={styles.links}>
        <div
          className={`w-24 h-full border-b-4 border-border-main dark:border-border-main-dark`}
        />
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <div
              className={`border-b-4 h-full flex items-center ${
                isActive
                  ? 'border-border-brand dark:border-border-brand-dark'
                  : 'border-border-main dark:border-border-main-dark'
              }`}
            >
              <Link
                key={index}
                className={`font-body01-medium ${styles.link}`}
                href={link.href}
              >
                {link.name}
              </Link>
            </div>
          );
        })}
        {pathname === '/portfolio/inventory' && (
          <div className='border-b-4 flex h-full dark:border-border-main-dark'>
            <button
              className={`font-body01-medium ${styles.button} ${
                inventoryType === 'collection'
                  ? 'text-text-brand dark:text-text-brand-dark'
                  : 'text-text-subtlest dark:text-text-subtlest-dark'
              }`}
              onClick={() => handleClickButton('collection')}
            >
              <div className='flex items-center'>
                <Cube
                  className={`mr-6  w-16 h-16 ${
                    inventoryType === 'collection'
                      ? 'fill-icon-brand dark:fill-icon-brand-dark'
                      : 'fill-icon-subtlest dark:fill-icon-subtlest-dark'
                  }`}
                />
                <p className='font-body02-medium'>Collections</p>
              </div>
            </button>
            <button
              className={twMerge(
                `font-body01-medium ${styles.button}
                 text-text-subtle dark:text-text-subtle-dark
                 bg-transparent dark:bg-transparent
                 ${
                   inventoryType === 'item'
                     ? 'text-text-brand dark:text-text-brand-dark'
                     : 'fill-icon-subtlest dark:fill-icon-subtlest-dark'
                 }`
              )}
              onClick={() => handleClickButton('item')}
            >
              <div className='flex items-center'>
                <ImageSquare
                  className={`mr-6  w-16 h-16 ${
                    inventoryType === 'item' &&
                    'fill-icon-brand dark:fill-icon-brand-dark'
                  }`}
                />
                <p className='font-body02-medium'>Items</p>
              </div>
            </button>
          </div>
        )}
        <div className='w-full h-full border-b-4 dark:border-border-main-dark' />
      </div>
    </nav>
  );
};
export default PortfolioTabNavigation;
