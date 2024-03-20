'use client';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import NicknameSetting from '../NicknameSetting';
import { useAtom, useSetAtom } from 'jotai';
import { userStatusAtom } from '@/store/account';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useUser } from '@/utils/hooks/queries/user';
import MakeYourPortfolio from '../modal/MakeYourPortfolio';

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me, status, isError } = useMe();
  const { data: user } = useUser(me?.nickname || null);
  const [showModalNickname, setShowModalNickname] = useState(false);
  const [showModalRequestSignIn, setShowModalRequestSignIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [mySelectedInformation, setMySelectedInformation] = useAtom(
    myDefaultPortfolioAtom
  );
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient && me) {
      // if (!me) {
      //   !(
      //     path.includes('/auth') ||
      //     path.includes('/landing') ||
      //     path.includes('/blog')
      //   ) && router.push('/auth/signin');
      // } else if (me.nickname === null) {
      //   setShowModal(true);
      // }
      // me?.nickname && setShowModal(false);
      // me?.nickname &&
      //   setMySelectedInformation({
      //     nickname: me.nickname,
      //     networkId: 'ethereum',
      //   });
      me.nickname
        ? mySelectedInformation === null &&
          setMySelectedInformation({
            nickname: me.nickname,
            networkId: 'ethereum',
          })
        : setShowModalNickname(true);
      timer && clearTimeout(timer);
      setTimer(null);
    } else {
      const newTimer = setTimeout(() => {
        !path.includes('/auth') && setShowModalRequestSignIn(true); // 1분 30초 후에 모달을 띄웁니다.
      }, 10000); // 1분 30초는 90000밀리초입니다.
      setTimer(newTimer);
      return () => {
        clearTimeout(newTimer);
        setTimer(null);
      };
    }
  }, [me, path, isClient]);
  //
  useEffect(() => {
    console.log('timer changed', timer);
  }, [timer]);
  const handleResetModal = () => {
    const newTimer = setTimeout(() => {
      !path.includes('/auth') && setShowModalRequestSignIn(true); // 1분 30초 후에 모달을 띄웁니다.
    }, 10000); // 1분 30초는 90000밀리초입니다.
    setTimer(newTimer);
    setShowModalRequestSignIn(false);
  };
  return (
    <>
      {children}
      <ReactModal
        isOpen={showModalNickname}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModalNickname(false);
        }}
        ariaHideApp={false}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-full h-full'>
          <NicknameSetting onClose={() => setShowModalNickname(false)} />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={showModalRequestSignIn}
        contentLabel='request sign in modal'
        // className='w-fit absolute bottom-[0%] right-[0%] transform translate-x-[-10%] translate-y-[-64px]'
        onRequestClose={() => {
          handleResetModal();
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className='!bg-transparent !border-0'
        overlayClassName={'!bg-transparent'}
      >
        <div className='fixed top-[100%] right-[0%] transform translate-x-[-10%] translate-y-[-130%] border-1 border-[var(--color-border-bold)] rounded-[12px] z-50'>
          <MakeYourPortfolio onClose={() => handleResetModal()} />
        </div>
      </ReactModal>
    </>
  );
};
export default LoginProvider;
