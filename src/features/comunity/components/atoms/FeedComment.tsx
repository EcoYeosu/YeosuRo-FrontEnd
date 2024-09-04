// 'use client'

// import { useInput } from '@/hooks/useInput'
// import React from 'react'
// import { IReply } from '../../types/communityType'
// import { usePostCommnet } from '../../hooks/react-query/usePostCommnet';
// import AutoResizeTextarea from '@/components/common/textArea/AutoResizeTextArea';

// interface FeedCommentProps {
//   replies: IReply[];
//   feedId: number;
// }

// function FeedComment({replies, feedId}: FeedCommentProps) {
//   const { mutate } = usePostCommnet()
//   const { values, handleChange } = useInput({comment: ''})
//   const handleSend = () => {
//     if (values.comment) return mutate({ feedId:feedId, content: values.comment });
//     else alert('댓글을 입력해주세요!')
//   };

//   return (
//     <div>
//       {/* <input type="text" name="comment" value={values.comment} onChange={handleChange} placeholder='댓글을 남겨주세요' /> */}
//       <AutoResizeTextarea name="comment" onChange={handleChange} value={values.comment} onSend={handleSend} placeholder='댓글을 남겨주세요' />
//       <div>
//         {replies.map((item) =>
//           <div key={item.id}>
//             <div>{item.profileImageUrl}</div>
//             <div>{item.nickname}</div>
//             <div>{item.tier}</div>
//             <div>{item.content}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default FeedComment
