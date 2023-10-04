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
  return (
    <html lang='en' className={`${iosevkaCustom.className}`}>
      <body className='relative'>
        <Providers>
          {/* <AuthProvider> */}
          <div className='flex flex-col min-h-screen h-screen w-screen max-h-[1024px] max-w-[1440]'>
            <GlobalNavigation />
            <ProfileComponent />
            {children}
            <Footer />
          </div>
          {/* </AuthProvider> */}
        </Providers>
      </body>
    </html>
  );
}
