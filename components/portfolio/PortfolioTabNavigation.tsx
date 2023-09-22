'use client';
import Link from 'next/link';
import styles from './PortfolioTabNavigation.module.css';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { inventoryTypeAtom } from '@/store/settings';
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
      <div>
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              className={twMerge(
                `font-body01-medium ${styles.link} ${
                  isActive
                    ? 'border-light-border-brand dark:border-light-border-brand'
                    : 'border-light-border-main dark:border-dark-border-main'
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
              Collections
            </button>
            <button
              className={twMerge(
                `font-body01-medium ${styles.button}
                 text-light-text-subtle dark:text-light-text-subtle
                 bg-transparent dark:bg-transparent
                 ${
                   inventoryType === 'item' &&
                   'text-light-text-brand dark:text-light-text-brand'
                 }`
              )}
              onClick={() => handleClickButton('item')}
            >
              Items
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default PortfolioTabNavigation;
