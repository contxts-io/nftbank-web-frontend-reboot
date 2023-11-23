import Providers from '@/components/providers/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/providers/AuthProvider';
import GlobalNavigation from '@/components/GlobalNavigation';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import ProfileComponent from '@/components/profile/ProfileComponent';
import LoginProvider from '@/components/providers/LoginProvider';

const inter = Inter({ subsets: ['latin'] });

const iosevkaCustom = localFont({
  src: [
    {
      path: './iosevka-custom-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './iosevka-custom-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './iosevka-custom-oblique.woff2',
      weight: '400',
      style: 'oblique',
    },
    {
      path: './iosevka-custom-oblique.ttf',
      weight: '400',
      style: 'oblique',
    },
    {
      path: './iosevka-custom-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './iosevka-custom-italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './iosevka-custom-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './iosevka-custom-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './iosevka-custom-mediumoblique.woff2',
      weight: '500',
      style: 'oblique',
    },
    {
      path: './iosevka-custom-mediumoblique.ttf',
      weight: '500',
      style: 'oblique',
    },
    {
      path: './iosevka-custom-mediumitalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './iosevka-custom-mediumitalic.ttf',
      weight: '500',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 즉시 실행함수로 감싸서 페이지가 렌더링될때 바로 실행되도록함
  const themeInitializerScript = `(function() {
    ${setInitialColorMode.toString()}
    setInitialColorMode();
  })()
  `;

  // 초기 테마를 설정하는 함수
  function setInitialColorMode() {
    function getInitialColorMode() {
      // 로컬스토리지에서 'theme' 값 가져오기
      const persistedPreferenceMode = window.localStorage.getItem('theme');
      const hasPersistedPreference =
        typeof persistedPreferenceMode === 'string';

      if (hasPersistedPreference) {
        return persistedPreferenceMode;
      }

      const preference = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof preference.matches === 'boolean';

      if (hasMediaQueryPreference) {
        return preference.matches ? 'dark' : 'light';
      }

      return 'light';
    }

    //현재 테마 모드
    const currentColorMode = getInitialColorMode();
    const element = document.body;
    element.style.setProperty('--initial-color-mode', currentColorMode);

    // 현재 다크모드라면 다크모드를 바로 적용 시켜줌
    if (currentColorMode === 'dark')
      document.body.setAttribute('data-theme', 'dark');
  }
  return (
    <html lang='en' className={`${iosevkaCustom.className}`}>
      <body className='relative bg-[var(--color-elevation-surface)]'>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializerScript,
          }}
        ></script>
        <Providers>
          <AuthProvider>
            <div className='flex flex-col w-screen max-w-[1440] h-screen'>
              <GlobalNavigation />
              <LoginProvider>{children}</LoginProvider>
              <Footer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
