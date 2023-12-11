'use client';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import ConnectWallet from '../auth/ConnectWallet';
import { useAtom } from 'jotai';
import { openModalAtom } from '@/store/settings';
import AddGroup from '../wallet/ManageGroup';
import ManageGroup from '../wallet/ManageGroup';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useAtom(openModalAtom);
  useEffect(() => {
    console.log('showModal: ', showModal);
  }, [showModal]);
  return (
    <>
      {children}
      <ReactModal
        isOpen={showModal !== null}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModal(null);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-full h-full z-50'>
          {showModal === 'walletConnect' && (
            <ConnectWallet onClose={() => setShowModal(null)} />
          )}
          {showModal === 'walletGroup' && (
            <ManageGroup group={null} onClose={() => setShowModal(null)} />
          )}
        </div>
      </ReactModal>
    </>
  );
};
export default ModalProvider;
