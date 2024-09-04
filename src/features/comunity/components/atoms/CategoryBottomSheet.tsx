// import React from 'react';
// import { BottomSheet } from 'react-spring-bottom-sheet';
// import 'react-spring-bottom-sheet/dist/style.css';
// import useCommunityStore from '@/store/useCommunityStore';
// import { CATEGORYLIST } from '../Community';
// import { useRouter } from 'next/navigation';

// interface CategoryBottomSheetProps {
//   open: boolean;
//   onDismiss: () => void;
// }

// const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({ open, onDismiss }) => {
//   const { setCategory } = useCommunityStore();
//   const  router  = useRouter()
//   const handleCategorySelect = (category: string) => {
//     setCategory(category);
//     router.push('/comunity/post')
//     onDismiss();
//   };

//   return (
//     <div className='max-w-[500px] mx-auto'>
//       <BottomSheet
//         open={open}
//         onDismiss={onDismiss}
//         snapPoints={({ maxHeight }) => maxHeight / 5}
//       >
//         <div className="z-20">
//           <h2 className="text-lg font-bold">카테고리 선택</h2>
//           {CATEGORYLIST.map((item) => (
//             <button
//               key={item.id}
//               className="block w-full text-left p-2 mt-2 bg-gray-200 rounded"
//               onClick={() => handleCategorySelect(item.title)}
//             >
//               {item.title}
//             </button>
//           ))}
//         </div>
//       </BottomSheet>
//     </div>
//   );
// };

// export default CategoryBottomSheet;
