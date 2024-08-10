import React from 'react'
import { ICommunity } from '../../types/communityType'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
          <div className='flex'>
            <Image className='rounded-full' width={50} height={50} src={item.profileImageUrl} alt={'ProfileImage'} />
            <div>{item.nickname}</div>
            <div>{item.tier}</div>
          </div>
          <div className='flex'>
            {item.imageUrls?.map((item: string) => 
              <Image key={item} className='overflow-hidden' width={200} height={200} src={item} alt={'FeedImage'} />
            )}
          </div>
          <div>
            <div>댓글수{item.repliesCount}</div>
            <div>좋아요 수{item.likesCount}</div>
            <div>조회수{item.view}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedCard
