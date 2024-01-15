import { getMediumItemListApi } from '@/apis/blog';
import { Article } from '@/interfaces/blog';
import { ARTICLE_CATEGORY } from '@/utils/articlesCategory';
import { findCategoryListById } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useBlogList() {
  return useQuery<Article[], AxiosError>(
    ['blogList'],
    async () => {
      const CATEGORY = ARTICLE_CATEGORY;
      const data = await getMediumItemListApi();
      const result = data.items.map((item) => {
        return {
          ...item,
          id: item.guid.split('p/')?.[1],
          categories: findCategoryListById(
            CATEGORY,
            item.guid.split('p/')?.[1]
          ),
          thumbnail: item.content.match(/<img\s+[^>]*src="([^"]*)"[^>]*>/)?.[1],
        };
      }) as Article[];
      return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    }
  );
}
