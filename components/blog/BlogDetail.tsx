'use client';
import { normalizeCategoryName } from '@/utils/common';
import styles from './BlogDetail.module.css';
import { Article } from '@/interfaces/blog';
import { useBlogList } from '@/utils/hooks/queries/blog';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CaretDown from '@/public/icon/CaretDown';

const BlogDetail = () => {
  const router = useRouter();
  const path = usePathname();
  const { data: articles, status } = useBlogList();
  const [prevArticle, setPrevArticle] = useState<Article | null>(null);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    if (articles && article) {
      const index = articles.findIndex((item) => item.id === article.id);
      console.log('index', article.id);
      setPrevArticle(articles[index + 1] || null);
      setNextArticle(articles[index - 1] || null);
    }
  }, [articles, article]);
  useEffect(() => {
    const _id = path.split('/')[2] || '';
    console.log('path', _id);
    setArticle(articles?.find((article) => article.id === _id));
  }, [articles, path]);
  const handleClickCategory = (category: string) => {
    router.push(`/blog?category=${category}`);
  };
  if (!article) return null;
  return (
    <section className='w-full'>
      <div className='flex items-center gap-x-8 mb-30 mt-80'>
        {article?.categories.map((category, i) => {
          return (
            <div key={i} className='px-20 py-6 bg-[#FFFFFF1A]'>
              <p className='font-button03-regular text-[var(--color-text-main)]'>
                {category}
              </p>
            </div>
          );
        })}
      </div>
      <p className='font-header02-bold text-[#FFFFFF] mb-30'>{article.title}</p>
      <p className='font-button03-regular text-[#919297]'>{`By ${article.author}    ·    ${article.pubDate}`}</p>
      <div className='articleContents mt-60'>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      <div className='flex items-center gap-x-8'>
        {article.categories.map((category, i) => {
          return (
            <button
              key={i}
              className='px-20 py-6 bg-[#FFFFFF1A]'
              onClick={() =>
                handleClickCategory(normalizeCategoryName(category))
              }
            >
              <p>{category}</p>
            </button>
          );
        })}
      </div>
      <div className='flex w-full justify-between mt-60'>
        {prevArticle ? (
          <Link
            className='flex flex-col items-start'
            href={`/blog/${prevArticle.id}`}
          >
            <div className='flex items-center text-[var(--color-text-brand)] mb-16'>
              <div className='rotate-90 mr-4'>
                <CaretDown />
              </div>
              <p className='font-body02-medium'>Previous post</p>
            </div>
            <p className='font-body02-medium text-[#C1C2C7]'>
              {prevArticle.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {nextArticle ? (
          <Link
            className='flex flex-col items-end'
            href={`/blog/${nextArticle.id}`}
          >
            <div className='flex items-center text-[var(--color-text-brand)] mb-16'>
              <p className='font-body02-medium mr-4'>Next post</p>
              <div className='rotate-270'>
                <CaretDown />
              </div>
            </div>
            <p className='font-body02-medium text-[#C1C2C7]'>
              {nextArticle.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
};
export default BlogDetail;
