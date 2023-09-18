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
        <p className='text-red-300'>This text has custom color.!!</p>
        <p className='text-link'>This text has custom color.!!</p>
        <p className='text-brand'>This text has custom color.!!</p>
        {/* <p className='chart-accent-color-chart-orange-boldest'>
          This text has custom color.!!
        </p> */}
      </div>
    </main>
  );
}
