import CommunityDetail from '@/features/comunity/components/CommunityDetail'
import React from 'react'

export interface CommunityDetailParams  {
  params:{id:string}
}

function page({ params: { id } }: CommunityDetailParams) {
  const numericId = Number(id);

  return (
    <div>
      <CommunityDetail id={numericId} />
    </div>
  )
}

export default page
