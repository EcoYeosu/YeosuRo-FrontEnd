// 'use client'

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import FeedCard from './atoms/FeedCard';
// import { useGetCommunityList } from '../hooks/react-query/useGetComunityList';
// import { BottomSheet } from '@/components/common/bottomSheet/Bottomsheet';
// import DetailBottomNavigation from '@/components/common/bottomNavigation/DetailBottomNavigation';
// import useCommunityStore from '@/store/useCommunityStore';
// import CategoryBottomSheet from './atoms/CategoryBottomSheet';

// // TODO: 인기글, 여수랑 추가 예정
// export const CATEGORYLIST = [
//   { id: 1, title: 'travel' },
//   { id: 2, title: 'free_talk' }
// ] as const

// function Community() {
//   const router = useRouter();
//   const { category, setCategory } = useCommunityStore();
//   const { data } = useGetCommunityList(category);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const categoryFromQuery = query.get('category');
//     if (categoryFromQuery && categoryFromQuery !== category) {
//       setCategory(categoryFromQuery);
//     }
//   }, []);

//   const onClickCategory = (newCategory: string) => {
//     setCategory(newCategory);
//     const newUrl = new URL(window.location.href);
//     newUrl.searchParams.set('category', newCategory);
//     router.push(newUrl.toString());
//   };

//   const handleOpenSheet = () => {
//     setIsSheetOpen(true);
//   };

//   const handleCloseSheet = () => {
//     setIsSheetOpen(false);
//   };

//   return (
//     <div className='min-h-screen ov'>
//       <div className='flex justify-between'>
//         <h1>커뮤니티</h1>
//         <button onClick={handleOpenSheet}>글작성</button>
//       </div>
//       <div>
//         {CATEGORYLIST.map((item) =>
//           <button
//             key={item.id}
//             onClick={() => onClickCategory(item.title)}
//           >
//             {item.title}
//           </button>
//         )}
//       </div>
//       <FeedCard data={data} />
//       <DetailBottomNavigation />
//       <CategoryBottomSheet open={isSheetOpen} onDismiss={handleCloseSheet} />
//     </div>
//   );
// }

// export default Community;