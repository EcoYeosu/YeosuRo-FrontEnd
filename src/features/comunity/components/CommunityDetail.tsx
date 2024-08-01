'use client';

import { useGetCommunityDetailList } from '../hooks/useGetCommunityDetail';
import FeedDetailCard from './atoms/FeedDetailCard';

function CommunityDetail({id} : { id:number }) {
  const { data, isLoading, error } = useGetCommunityDetailList(id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>No Data</div>;

  return (
    <div>
      <FeedDetailCard data={data} />
    </div>
  );
}

export default CommunityDetail;
