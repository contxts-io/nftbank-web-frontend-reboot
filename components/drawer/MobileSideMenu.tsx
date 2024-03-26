'use client';
import NFTBankLogo from '@/public/logo/NFTBankLogo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MenuList from '../li/MenuLIst';
import ReactModal from 'react-modal';
import { useState } from 'react';
import styles from './MobileSideMenu.module.css';
type Props = { isOpen: boolean; setIsOpen: (state: boolean) => void };
const MobileSideMenu = (props: Props) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleClose = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      props.setIsOpen(false);
    }, 200);
  };
  return (
    <ReactModal
      isOpen={props.isOpen}
      contentLabel='Minimal Modal Example'
      className='w-full max-w-[240px] absolute top-0 left-0'
      onRequestClose={() => handleClose()}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      overlayClassName={'overlayBackground'}
      onAfterOpen={() => {
        setDrawerOpen(true);
      }}
    >
      <div className={`${styles.sidebar} ${drawerOpen ? styles.open : ''}`}>
        <aside className='bg-[var(--color-elevation-surface)] h-full w-[240px] border-r-1 border-[var(--color-border-bold)]'>
          <div className='w-full flex items-center p-20 cursor-pointer'>
            <Image
              src={'/icon/nftbank_icon.svg'}
              width={22}
              height={20}
              alt='nftbank logo'
              className='border-0'
            />
            <NFTBankLogo className={`fill-[var(--color-icon-main)]`} />
            <div className='ml-6 rounded-full px-8 h-16 items-center justify-center bg-[var(--color-background-brand-bold)]'>
              <p className='font-caption-medium text-[var(--color-text-inverse)]'>
                V2 Beta
              </p>
            </div>
          </div>
          <ul className={`font-body02-medium flex flex-col`}>
            <MenuList
              onClick={() => {
                handleClose();
              }}
              href='/portfolio'
            >
              Portfolio
            </MenuList>
            <MenuList
              onClick={() => {
                handleClose();
              }}
              href='/settings/manageWallets'
            >
              Settings
            </MenuList>
          </ul>
        </aside>
      </div>
    </ReactModal>
  );
};
export default MobileSideMenu;
