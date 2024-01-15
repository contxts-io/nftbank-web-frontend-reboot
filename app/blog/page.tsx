import FloatingDiscordButton from '@/components/FloatingDiscordButton';
import TopNav from '@/components/TopNav';
import BlogContainer from '@/components/blog/BlogContainer';
import Image from 'next/image';

const BlogPage = () => {
  return (
    <section className='w-full flex flex-col items-center'>
      <div className='w-full sticky z-10 top-0'>
        <TopNav />
      </div>
      <div className='w-[1170px] flex flex-col items-center gap-y-180'>
        <div className='w-full mt-160 flex items-center justify-between'>
          <div>
            <p className='font-display03-bold text-[var(--color-text-main)] mb-8'>
              NFTBank Blog
            </p>
            <p className='font-subtitle01-regular text-[#919297]'>
              Welcome to NFTBank’s Blog
            </p>
          </div>
          <Image src='/image/BlogAsset.svg' width={400} height={400} alt='' />
        </div>
        <BlogContainer />
      </div>
      <FloatingDiscordButton />
    </section>
  );
};
export default BlogPage;
