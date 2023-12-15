'use client';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import NicknameSetting from '../NicknameSetting';
import { useAtom, useSetAtom } from 'jotai';
import { userStatusAtom } from '@/store/account';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useUser } from '@/utils/hooks/queries/user';

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me, status, isError } = useMe();
  const { data: user } = useUser(me?.nickname);
  const { data: walletList } = useMyWalletList();
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);
  const setMyPortfolio = useSetAtom(myDefaultPortfolioAtom);
  const setPortfolioUser = useSetAtom(portfolioUserAtom);
  const setPortfolioNicknameAtom = useSetAtom(portfolioNicknameAtom);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mySelectedInformation, setMySelectedInformation] = useAtom(
    myDefaultPortfolioAtom
  );
  const router = useRouter();
  const path = usePathname();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setUserStatus('SIGN_IN');
  //       console.log('로그인 상태', user);
  //     } else {
  //       //세션이 끊긴경우. 로그아웃상태.
  //       console.log('로그아웃 상태');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  // useEffect(() => {
  //   document.cookie = `sign_in=${userStatus}`;
  // }, [userStatus]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      if (!me) {
        console.log('ㅇ어ㅂㅅ', !path.includes('/auth'));
        if (!path.includes('/auth')) {
          router.push('/auth/signin');
        }
      } else if (me.nickname === null) {
        setShowModal(true);
      }
      console.log('~~~~ ME ~~~~~ nickname : ', me?.nickname);
      me?.nickname && setShowModal(false);
      me?.nickname &&
        setMySelectedInformation({
          nickname: me.nickname,
          networkId: 'ethereum',
        });
    }
  }, [me, path, isClient]);
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
