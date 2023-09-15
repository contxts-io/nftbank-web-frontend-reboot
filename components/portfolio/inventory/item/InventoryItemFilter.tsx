'use client';
import styles from './InventoryItemFilter.module.css';
import { TCollectionParam, inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { getCollectionList } from '@/apis/inventory';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useObserver } from '@/utils/hooks/useObserver';
import { useAtom } from 'jotai';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { Collection } from '@/interfaces/collection';
type Props = {
  collectionList?: string[];
};
const InventoryItemFilter = () => {
  const [selectedCollection, setSelectedCollection] = useAtom(
    selectedCollectionInventoryAtom
  );
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useState<TCollectionParam>({
      searchCollection: '',
      networkId: 'ethereum',
      includeGasUsed: true,
      page: 1,
      limit: 10,
      order: 'desc',
      sort: 'acquisitionPrice',
      w: '',
    });
  const [checkedCollection, setCheckedCollection] = useState<string[]>(
    selectedCollection?.collection.assetContract
      ? [selectedCollection.collection.assetContract]
      : []
  );
  const [itemRequestParams, setItemRequestParams] = useAtom(
    inventoryItemListAtom
  );
  const { ref, inView } = useInView({ threshold: 0.3 });
  // ref는 target을 지정할 element에 지정한다.
  //inView type은 boolean으로 root(뷰포트)에 target(ref를 지정한 element)이 들어오면 true로 변환됨

  const {
    data,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['projects', inventoryCollectionRequestParam],
    async ({ pageParam = 1 }) => {
      return await fetchData(pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        const page = lastPage.paging.page;
        if (Math.round(lastPage.paging.total / lastPage.paging.limit) == page)
          return false;
        return page + 1;
      },
    }
  );
  const [searchText, setSearchText] = useState<string>('');
  const bottom = useRef<HTMLDivElement>(null);
  const onIntersect = ([entry]: any) => {
    entry.isIntersecting && fetchNextPage();
  };
  useObserver({ target: bottom, onIntersect });

  useEffect(() => {
    fetchData(1);
  }, []);
  // useEffect(() => {
  //   return () => {
  //     setSelectedCollection(null);
  //   };
  // }, []);
  useEffect(() => {
    setItemRequestParams((prev) => ({
      ...prev,
      page: 1,
      assetContractAddress: checkedCollection,
    }));
  }, [checkedCollection]);
  const fetchData = async (page: number) => {
    console.log('page ', page);
    return await getCollectionList({
      ...inventoryCollectionRequestParam,
      page: page,
    });
  };

  // const handleInputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   console.log('handleInputCheck', 'name', name, 'checked', checked);
  //   setCheckedCollection((prev) => {
  //     if (checked) {
  //       return [...prev, name];
  //     } else {
  //       return prev.filter((item) => item !== name);
  //     }
  //   });
  // };
  const handleClickCheckBox = (collection: Collection) => {
    console.log('handleClickCheckBox', collection);
    setCheckedCollection((prev) => {
      if (prev.includes(collection.collection.assetContract)) {
        return prev.filter(
          (item) => item !== collection.collection.assetContract
        );
      } else {
        return [...prev, collection.collection.assetContract];
      }
    });
  };
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    (value.length >= 3 || value.length == 0) &&
      (console.log('handleInputText', 'value', value),
      setInventoryCollectionRequestParam((prev) => {
        return {
          ...prev,
          searchCollection: value,
        };
      }),
      fetchData(1));
  };
  if (status === 'error') return <div>error</div>;
  return (
    <aside className={styles.container}>
      <h2 className='text-18'>collection</h2>
      <input
        type='text'
        placeholder='Search by collections'
        className='my-16'
        onChange={handleInputText}
        value={searchText}
      />

      <ul className='max-h-[500px] overflow-auto flex flex-col'>
        {data?.pages?.map((page, index) => (
          <>
            <div>
              <p>page:{index}</p>
            </div>
            {page.collections.map((item) => (
              <li
                key={`${page.paging.page}-${index}`}
                className='h-26 flex  my-8 items-center'
              >
                <input
                  type='checkbox'
                  name={item.collection.name}
                  // onChange={handleInputCheck}
                  className='mr-8'
                  checked={checkedCollection.includes(
                    item.collection.assetContract
                  )}
                  onClick={() => handleClickCheckBox(item)}
                />
                <p>{item.collection.name || item.collection.assetContract}</p>
              </li>
            ))}
          </>
        ))}
        <div ref={bottom} />
      </ul>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </aside>
  );
};
export default InventoryItemFilter;
