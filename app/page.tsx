import Image from 'next/image';

export default function Home() {
  const apiKey = process.env.API_KEY || 'No API Key';
  return (
    <main>
      <div className='flex flex-col w-screen justify-center'>
        <h1>Next.js + TypeScript</h1>
        <p>줄리안</p>
        <p>{apiKey}</p>
      </div>
    </main>
  );
}
