'use client';
import Link from 'next/link';
import styles from './PortfolioTabNavigation.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { inventoryTypeAtom } from '@/store/settings';
import Cube from '@/public/icon/Cube';
import ImageSquare from '@/public/icon/ImageSquare';
import { portfolioUserAtom } from '@/store/portfolio';
import CaretDown from '@/public/icon/CaretDown';
import { useEffect, useRef, useState } from 'react';
import { CHAIN_LIST } from '@/utils/supportedChains';
import ChainSelector from './ChainSelector';
import Dropdown from '../dropdown/Dropdown';
import { set } from 'cypress/types/lodash';
const navLinks = [
  { name: 'Overview', href: '/portfolio/overview' },
  // { name: 'Analysis', href: '/portfolio/analysis' },
  { name: 'Inventory', href: '/portfolio/inventory', isHover: true },
];
const PortfolioTabNavigation = () => {
  const pathname = usePathname();
  const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isInventoryModalOpen, setInventoryModalOpen] =
    useState<boolean>(false);
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const navbar = document.querySelector('.sticky-navbar') as HTMLElement;
    const cloneNavbar = document.querySelector('.clone-navbar') as HTMLElement;
    document.addEventListener('click', handleClickOutside);
    if (navbar) {
      console.log('window.scrollY ', window?.scrollY);
      document.addEventListener('scroll', () => {
        if (window?.scrollY > 132) {
          navbar.style.position = 'fixed';
          cloneNavbar.style.height = '69px';
        } else {
          navbar.style.position = 'static';
          cloneNavbar.style.height = '0px';
        }
      });
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsPopoverOpen(false);
      setInventoryModalOpen(false);
    }
  };
  const handleClickButton = (type: 'collection' | 'item') => {
    setInventoryType(type);
  };
  const handleClickChain = (chain: any) => {
    setIsPopoverOpen((prev) => !prev);
    console.log('chain', chain);
  };
  return (
    <>
      <nav
        className={`sticky-navbar ${styles.navigation} border-[var(--color-border-main)]`}
      >
        <div className={styles.links}>
          <div
            className={`w-24 h-full border-b-4 border-[var(--color-border-main)]`}
          />
          {navLinks.map((link, index) => {
            const isActive = pathname.includes(link.href);
            const paramType = pathname.split('/')[3] || '';
            const paramValue = pathname.split('/')[4] || '';
            return (
              <div
                key={index}
                className={`border-b-4 h-full flex items-center transition-all duration-400 ${
                  isActive
                    ? 'border-[var(--color-border-brand)]'
                    : 'border-[var(--color-border-main)]'
                }
                ${link.isHover ? 'relative' : ''}
              `}
                ref={link.isHover ? listRef : null}
              >
                <Link
                  className={`font-body01-medium ${styles.link} ${
                    isActive && 'text-[var(--color-text-main)]'
                  }`}
                  href={`${link.href}/[...slug]`}
                  as={
                    link.isHover
                      ? `#`
                      : `${link.href}/${paramType}/${paramValue}`
                  }
                  onClick={() => {
                    if (link.isHover) {
                      setInventoryModalOpen((prev) => !prev);
                    }
                  }}
                >
                  {link.name}
                </Link>
                {/* <Dropdown
                id=''
                className={styles.dropdown}
                list={['Collections', 'Items']}
                listStyle='w-full'
                selected={'Collections'}
                onClick={(type) => {
                  setInventoryType(
                    type === 'Collections' ? 'collection' : 'item'
                  ),
                    router.push(`${link.href}/${paramType}/${paramValue}`);
                }}
              /> */}
                {link.isHover && isInventoryModalOpen && (
                  <ul
                    className={`${styles.dropdown} absolute top-70 left-0 w-130`}
                  >
                    <li
                      onClick={() => {
                        router.push(`${link.href}/${paramType}/${paramValue}`),
                          setInventoryType('collection'),
                          setInventoryModalOpen(false);
                      }}
                    >
                      Collections
                    </li>
                    <li
                      onClick={() => {
                        router.push(`${link.href}/${paramType}/${paramValue}`),
                          setInventoryType('item'),
                          setInventoryModalOpen(false);
                      }}
                    >
                      Items
                    </li>
                  </ul>
                )}
              </div>
            );
          })}
          {/* {pathname.includes('/portfolio/inventory') ? (
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
        )} */}
          <div className='flex-grow h-full border-b-4 border-[var(--color-border-main)]' />
          {/** sprint 1
         * 
         * 
         * 
         * 
         * 
         * <div
          className='flex items-center gap-4 h-full border-b-4 border-[var(--color-border-main)] text-[var(--color-text-color-text-subtle)] pr-24'
          ref={listRef}
        >
          <button
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            className='relative flex items-center gap-4'
          >
            <p> All Chain</p> <CaretDown />
          </button>
          {isPopoverOpen && (
            <div className='absolute top-40 right-10'>
              <ChainSelector />
            </div>
          )}
        </div> */}
        </div>
      </nav>
      <div className='clone-navbar' />
    </>
  );
};
export default PortfolioTabNavigation;
