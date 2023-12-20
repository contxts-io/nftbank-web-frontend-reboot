'use client';
import { useBlogList } from '@/utils/hooks/queries/blog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Blog = () => {
  const router = useRouter();
  const { data: articles, status } = useBlogList();
  return (
    <div className='w-[1170px] flex flex-col items-center mt-160'>
      <p className='font-header02-medium text-[#F6F8FA] mb-80'>NFTBank Blog</p>
      <div className='w-full flex items-center gap-x-20 overflow-x-scroll'>
        {articles?.map((article) => {
          return (
            <div
              key={article.id}
              className='w-[358px] h-[316px] border-1 border-[var(--color-border-main)] cursor-pointer'
              onClick={() => router.push(`/blog/${article.id}`)}
            >
              <div className='w-[358px] h-[200px] flex items-center justify-center'>
                <Image
                  src={article.thumbnail}
                  width={358}
                  height={200}
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='p-20'>
                <p className='font-caption-regular text-[var(--color-text-subtlest)] mb-20'>{`By ${article.author} · ${article.pubDate}`}</p>
                <p className='font-button02-medium text-[var(--color-text-main)]'>
                  {article.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Blog;
