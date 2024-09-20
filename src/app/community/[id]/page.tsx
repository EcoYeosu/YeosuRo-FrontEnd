'use client';

import React from 'react';
import { useParams } from 'next/navigation'; // useParams를 사용하여 URL 파라미터 가져오기
import CommunityFeedDetail from '@/components/community/CommunityFeedDetail';

const CommunityFeedDetailPage = () => {
  const params = useParams(); // useParams 사용
  const id = params?.id; // id 파라미터 추출

  // id가 존재하고 숫자로 변환할 수 있는 경우에만 postId를 설정
  const feedId = id ? parseInt(id as string, 10) : null;

  // postId가 없을 경우 처리
  if (!feedId) {
    return <p>유효하지 않은 게시글 ID입니다.</p>;
  }

  return <CommunityFeedDetail feedId={feedId} />;
};

export default CommunityFeedDetailPage;