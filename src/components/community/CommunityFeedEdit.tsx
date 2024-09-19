'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { useUpdateFeed, useGetFeedDetail } from '@/hooks/community'; 
import { useRecoilValue } from 'recoil';
import { isLoginState } from '@/recoil/atoms'; 
import styles from '@/styles/community/CommunityFeedEdit.module.css';

const CommunityEdit: React.FC = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string }; // URL에서 id 가져오기
  const numericFeedId = parseInt(id, 10); // id를 숫자로 변환
  const loginState = useRecoilValue(isLoginState); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // 게시글 상세 정보 가져오기
  const { data, isLoading, error } = useGetFeedDetail(numericFeedId);

  // 컴포넌트 로드 시 가져온 데이터를 상태에 설정
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setImageUrls(data.imageUrls);
    }
  }, [data]);

  // PATCH 요청을 보내는 Mutation
  const { mutate: updateFeed } = useUpdateFeed();

  // 수정 완료 버튼 클릭 핸들러
  const handleUpdate = () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    updateFeed(
      {
        feedId: numericFeedId,
        title,
        content,
        imageUrls,
      },
      {
        onSuccess: () => {
          alert('게시글이 수정되었습니다.');
          router.push(`/community/${numericFeedId}`);
        },
        onError: (error) => {
          console.error('게시글 수정 실패:', error);
          alert('게시글 수정에 실패했습니다.');
        },
      }
    );
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div className={styles.editContainer}>
      <h1>게시글 수정</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.titleInput}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.contentInput}
        placeholder="내용을 입력하세요"
      />
      <div className={styles.imageContainer}>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`이미지 ${index + 1}`} className={styles.image} />
        ))}
      </div>
      <button onClick={handleUpdate} className={styles.updateButton}>완료</button>
    </div>
  );
};

export default CommunityEdit;
