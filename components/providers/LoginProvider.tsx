'use client';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import NicknameSetting from '../NicknameSetting';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase/config';
import { useAtom, useSetAtom } from 'jotai';
import { userStatusAtom } from '@/store/account';
import { cookies } from 'next/headers';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me, status, isError } = useMe();
  const { data: walletList } = useMyWalletList();
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('로그인 상태', user);
      } else {
        //세션이 끊긴경우. 로그아웃상태.
        console.log('로그아웃 상태');
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    document.cookie = `sign_in=${userStatus}`;
  }, [userStatus]);
  useEffect(() => {
    if (!me) {
      !path.includes('/auth') && router.push('/auth/signin');
    } else if (me.nickname === null) {
      setShowModal(true);
    }
  }, [me, path]);
  //
  return (
    <>
      {children}
      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModal(false);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-full h-full'>
          <NicknameSetting />
        </div>
      </ReactModal>
    </>
  );
};
export default LoginProvider;
