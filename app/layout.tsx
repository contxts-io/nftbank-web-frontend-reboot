import Providers from '@/components/providers/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/components/providers/AuthProvider';
import GlobalNavigation from '@/components/GlobalNavigation';
import localFont from 'next/font/local';
import 'react-toastify/dist/ReactToastify.css';
import LoginProvider from '@/components/providers/LoginProvider';
import GlobalFooter from '@/components/GlobalFooter';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@/components/common/Analytics';
import Script from 'next/script';

const TITLE = 'NFTBank | Make NFT Portfolio Management Smart';
const DESCRIPTION =
  'Check out the most accurate realized and unrealized P&L for your NFT assets spread across multiple wallets.';
const SAMPLE_IMAGE = '/image/sample_portfolio.png';
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
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://v2.nftabank.ai',
    images: SAMPLE_IMAGE,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: SAMPLE_IMAGE,
  },
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

    // 시작시 다크모드를 바로 적용 시켜줌
    document.body.setAttribute('data-theme', currentColorMode);
  }
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

  return (
    <html lang='en' className={`${iosevkaCustom.className}`}>
      <head>
        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', '${GTM_ID}');`,
          }}
        />
      </head>
      <body className='relative bg-[var(--color-elevation-surface)]'>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializerScript,
          }}
        ></script>
        <link
          rel='icon'
          type='image/png'
          sizes='196x196'
          href='/favicon-196.png'
        />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='apple-icon-180.png' />
        <meta name='apple-mobile-web-app-capable' content='yes' />

        <Providers>
          {/* * * * sprint1 *
          <AuthProvider>
            <div className='flex flex-col w-screen max-w-[1440] h-screen'>
              <GlobalNavigation />
              <LoginProvider>{children}</LoginProvider>
              <GlobalFooter />
            </div>
          </AuthProvider> */}
          <AuthProvider>
            <Analytics>
              <div className='flex flex-col w-screen min-h-screen max-w-[1440]'>
                <GlobalNavigation />
                <LoginProvider>
                  <div className='w-full flex flex-1'>{children}</div>
                </LoginProvider>
                <GlobalFooter />
              </div>
            </Analytics>
          </AuthProvider>
        </Providers>
      </body>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  );
}
