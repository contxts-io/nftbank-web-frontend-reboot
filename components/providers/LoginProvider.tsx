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

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me, status, isError } = useMe();
  const { data: user } = useUser(me?.nickname || null);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mySelectedInformation, setMySelectedInformation] = useAtom(
    myDefaultPortfolioAtom
  );
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      if (!me) {
        if (!path.includes('/auth')) {
          router.push('/auth/signin');
        }
      } else if (me.nickname === null) {
        setShowModal(true);
      }
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
