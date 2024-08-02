import React from 'react'
import { ICommunity } from '../../types/communityType'
import { useRouter } from 'next/navigation';

interface FeedCardProps {
  data?: ICommunity[];
}

function FeedCard({ data }: FeedCardProps) {
  const router = useRouter();

  
  const handleClick = (id: number) => {
    router.push(`/comunity/${id}`);
  };
  
  if (!data) return <div>No Data</div>;
  const sortedData = [...data].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  return (
    <div>
      {sortedData?.map((item: ICommunity) => 
        <div className='cursor-pointer' key={item.id} onClick={() => handleClick(item.id)}>
          <div>{item.feedCategory}</div>
          <div>{item.title}</div>
          <div>
            <div>{item.profileImageUrl}</div>
            <div>{item.nickname}</div>
            <div>{item.tier}</div>
          </div>
          <div>{item.imageUrl}</div>
          <div>댓글수{item.repliesCount}</div>
          <div>좋아요 수{item.likesCount}</div>
        </div>
      )}
    </div>
  )
}

export default FeedCard
