import Test from '@/components/Test';
import Link from 'next/link';

export default async function Home() {
  const apiKey = process.env.API_KEY || 'No API Key';
  return (
    <main>
      <div className='flex flex-col w-screen justify-center'>
        <h1>Next.js + TypeScript</h1>
        <p>줄리안</p>
        <p>{apiKey}</p>
        <Link href='/about'>about</Link>
      </div>
      <Test />
    </main>
  );
}
