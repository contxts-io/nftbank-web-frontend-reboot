'use client';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import NicknameSetting from '../NicknameSetting';

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me, status, isError } = useMe();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    console.log('status', status);
  }, [status]);
  useEffect(() => {
    status === 'success' && me && !me.nickname && setShowModal(true);
    status === 'success' && me && me.nickname && setShowModal(false);
  }, [me, status]);
  if (!path.includes('/auth')) {
    // if (status === 'loading') {
    //   // 데이터 로딩 중에는 로딩 스피너 또는 다른 로딩 상태를 표시할 수 있습니다.
    //   return <div>Loading...</div>;
    // }
    if (isError || !me) {
      // 에러 또는 데이터가 없는 경우 로그인 페이지로 리다이렉트
      router.push('/auth/signin');
      return null; // 리다이렉트를 시작하면 렌더링 중단
    }
  }
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
