'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FeedCard from './atoms/FeedCard';
import { useGetCommunityList } from '../hooks/useGetComunityList';
import { BottomSheet } from '@/components/common/bottomSheet/Bottomsheet';
import DetailBottomNavigation from '@/components/common/bottomNavigation/DetailBottomNavigation';

// TODO: 인기글, 여수랑 추가 예정
const CATEGORYLIST = [
  { id: 1, title: 'travel' },
  { id: 2, title: 'free_talk' }
] as const

function Community() {
  const router = useRouter();
  const [category, setCategory] = useState('travel');
  const { data, isLoading, error } = useGetCommunityList(category);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const categoryFromQuery = query.get('category');
    if (categoryFromQuery && categoryFromQuery !== category) {
      setCategory(categoryFromQuery);
    }
  }, []);

  const onClickCategory = (newCategory: string) => {
    setCategory(newCategory);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('category', newCategory);
    router.push(newUrl.toString());
  };

  return (
    <div className='min-h-screen'>
      <div className='flex justify-between'>
        <h1>커뮤니티</h1>
        <button onClick={() => router.push('/comunity/post')}>글작성</button>
      </div>
      <div>
        {CATEGORYLIST.map((item) =>
          <button
            key={item.id}
            onClick={() => onClickCategory(item.title)}
          >
            {item.title}
          </button>
        )}
      </div>
      <FeedCard data={data} />
      <DetailBottomNavigation />
    </div>
  );
}

export default Community;