'use client';
import Button from '../buttons/Button';
import styles from './BlogContainer.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useBlogList } from '@/utils/hooks/queries/blog';
import Image from 'next/image';
import { ARTICLE_CATEGORY } from '@/utils/articlesCategory';
import { Article } from '@/interfaces/blog';
import { useSearchParams, useRouter } from 'next/navigation';

const BlogContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categoryKey, setCategoryKey] = useState<
    'all' | 'nftvaluation' | 'productupdate' | 'usecases'
  >('all');
  const { data: _articles, isLoading } = useBlogList();
  const articles = useMemo(() => {
    let list = [] as Article[];
    if (_articles) {
      list = _articles.filter((item) => {
        if (categoryKey == 'all') return true;
        return ARTICLE_CATEGORY[categoryKey]?.includes(item.id);
      });
    }
    return list;
  }, [_articles, categoryKey]);

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setCategoryKey(category as any);
  }, []);
  return (
    <div>
      <div className='flex justify-center items-center gap-x-12'>
        <Button
          id=''
          className={`${styles.categoryButton} ${
            categoryKey === 'all' ? styles.active : ''
          }`}
          onClick={() => setCategoryKey('all')}
        >
          ALL
        </Button>
        <Button
          id=''
          className={`${styles.categoryButton} ${
            categoryKey === 'nftvaluation' ? styles.active : ''
          }`}
          onClick={() => setCategoryKey('nftvaluation')}
        >
          NFT Valuation
        </Button>
        <Button
          id=''
          className={`${styles.categoryButton} ${
            categoryKey === 'productupdate' ? styles.active : ''
          }`}
          onClick={() => setCategoryKey('productupdate')}
        >
          Product Update
        </Button>
        <Button
          id=''
          className={`${styles.categoryButton} ${
            categoryKey === 'usecases' ? styles.active : ''
          }`}
          onClick={() => setCategoryKey('usecases')}
        >
          Use Case
        </Button>
      </div>
      {articles?.[0] && (
        <div className={styles.cardFull}>
          <Image
            src={articles[0].thumbnail}
            width={662}
            height={393}
            alt=''
            className='w-[662px] h-[393px] cursor-pointer'
            onClick={() => router.push(`/blog/${articles[0].id}`)}
          />
          <div>
            <div className={styles.category}>
              <p>Product update</p>
            </div>
            <p className='font-subtitle01-regular text-[var(--color-text-main)] mt-26 mb-32'>
              {articles[0].title}
            </p>
            <p className='font-button02-regular text-[#C1C2C7] mb-32'>
              {articles[0].description
                .replace(/<[^>]*>/g, '')
                .split('.')[0]
                .trim()}
            </p>
            <p className='font-button03-regular text-[#919297]'>{`By ${articles[0].author}    ·    ${articles[0].pubDate}`}</p>
          </div>
        </div>
      )}
      <div className={styles.articleWrapper}>
        {articles?.map((article, i) => {
          if (i === 0) return null;
          return (
            <div
              key={i}
              className={`${styles.article} cursor-pointer`}
              onClick={() => router.push(`/blog/${article.id}`)}
            >
              <Image
                src={article.thumbnail}
                className={styles.articleBG}
                width={580}
                height={400}
                alt=''
              />
              <div className={styles.description}>
                <div className='flex items-center gap-x-8'>
                  {article.categories.map((category, index) => {
                    return (
                      <div className={styles.category} key={index}>
                        <p>{category}</p>
                      </div>
                    );
                  })}
                </div>
                <p className='font-button01-bold text-[#C1C2C7] my-20'>
                  {article.title}
                </p>
                <p className='font-caption-regular text-[#919297]'>
                  {article.author} | {article.pubDate.substring(0, 10)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BlogContainer;
