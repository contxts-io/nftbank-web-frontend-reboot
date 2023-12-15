'use client';
import { getMyWalletList } from '@/apis/wallet';
import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { BasicParam } from '@/interfaces/request';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useUser } from '@/utils/hooks/queries/user';
import { useMyWalletList, useWalletList } from '@/utils/hooks/queries/wallet';
import { set } from 'cypress/types/lodash';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const [nickname, setNickname] = useState('');
  const [portfolioUserNickname, setPortfolioUserNickname] = useAtom(
    portfolioNicknameAtom
  );
  const { data: me } = useMe();
  const { data: user } = useUser(portfolioUserNickname || '');
  const {
    data: walletList,
    status,
    error,
  } = useWalletList({ nickname: portfolioUserNickname || '' });

  const searchParam = useSearchParams();
  // const { data: me } = useMe();
  // useEffect(() => {
  //   me && setPortfolioUser({ nickname: me.nickname, networkId: 'ethereum' });
  // }, [me]);

  // useEffect(() => {
  //   user &&
  //     setPortfolioUser({ nickname: user.nickname, networkId: 'ethereum' });
  // }, [user]);
  useEffect(() => {
    me &&
      (path.split('/nickname/')[1]
        ? setNickname(path.split('/nickname/')[1])
        : setNickname(me.nickname));
  }, [path, me]);
  return (
    <section className='w-full h-full'>
      <ProfileComponent nickname={nickname} />
      {status === 'success' && (
        <>
          {walletList?.data.length > 0 ? (
            <>
              <PortfolioTabNavigation />
              {children}
            </>
          ) : (
            <div className='w-full h-[calc(100vh-197px)] flex items-center justify-center'>
              <NoWallet />
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default PortfolioLayout;
