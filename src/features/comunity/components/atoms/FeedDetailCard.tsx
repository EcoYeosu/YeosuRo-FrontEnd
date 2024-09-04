// import React from 'react'
// import {ICommunityDetail } from '../../types/communityType'
// import useFormatDate from '@/hooks/useFormatData';
// import { usePostCommnet } from '../../hooks/react-query/usePostCommnet';
// import FeedComment from './FeedComment';
// import { useDeleteFeeds } from '../../hooks/react-query/useDeleteFeeds';
// import { useRouter } from 'next/navigation';

// interface FeedDetailCardProps {
//   data: ICommunityDetail;
// }

// function FeedDetailCard({ data }: FeedDetailCardProps) {
//   const router = useRouter();
//   const { id } = data
//   const { formatDate } = useFormatDate()
//   const { mutate } = useDeleteFeeds()
//   const handleDelete = () => {
//     if (!id) {
//       return;
//     } else {
//       mutate({ id });
//       router.push('/comunity');
//     }
    
//   };

//   return (
//     <div>
//       <div>
//         <div>{data.title}</div>
//         <div>{formatDate(data.createAt)}</div>
//         <div className='flex justify-between'>
//           <div className='flex gap-1'>
//             <div>{data.profileImageUrl}</div>
//             <div>{data.nickname}</div>
//             <div>{data.tier}</div>
//           </div>
//           <div className='flex'>
//             <div className='mr-1'>수정</div>
//             <button onClick={handleDelete}>삭제</button>
//           </div>
//         </div>
//         <div>
//           <div>{data.imageUrl}</div>
//           <div>{data.content}</div>
//         </div>
//         <div className='flex'>
//           <span>댓글수{data.repliesCount}</span>
//           <span>좋아요{data.likesCount}</span>
//           <span>조회수{data.view}</span>
//         </div>
//       </div>
//       <div>
//         <FeedComment feedId={id} replies={data.replies}/>
//       </div>
//     </div>
//   )
// }

// export default FeedDetailCard
