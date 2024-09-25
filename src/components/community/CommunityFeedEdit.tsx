'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useGetFeedDetail, useUpdateFeed, useUploadImages } from '@/hooks/community'; // 수정, 업로드 훅
import { postFeedState, isLoginState } from '@/recoil/atoms'; // 리코일 상태
import BackIcon from '@/components/community/images/backIcon.svg'
import styles from '@/styles/community/CommunityCreateFeed.module.css';

const CommunityEdit: React.FC = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const numericFeedId = parseInt(id, 10); // feedId 변환
  const loginState = useRecoilValue(isLoginState); // 로그인 상태
  const { data, isLoading, error } = useGetFeedDetail(numericFeedId); // 게시글 정보 가져오기
  
  const [feedState, setFeedState] = useRecoilState(postFeedState); // 리코일 상태 관리
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: uploadImages } = useUploadImages(); // 이미지 업로드 훅
  const { mutate: updateFeed } = useUpdateFeed(); // 게시글 수정 훅

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setFeedState((prevState) => ({
        ...prevState,
        imageUrls: data.imageUrls,
      }));
    }
  }, [data, setFeedState]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      uploadImages(filesArray, {
        onSuccess: (uploadedUrls: string[]) => {
          setFeedState((prevState) => ({
            ...prevState,
            imageUrls: [...(prevState.imageUrls || []), ...uploadedUrls].slice(0, 5),
          }));
          setImages((prevImages) => [...prevImages, ...filesArray].slice(0, 5));
        },
        onError: (error: Error) => {
          console.error('이미지 업로드 실패:', error);
        },
      });
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFeedState((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = () => {
    if (title.length < 1 || content.length < 1) {
      setErrorMessage('제목과 내용을 모두 작성해주세요.');
      return;
    }

    updateFeed(
      {
        feedId: numericFeedId,
        title,
        content,
        imageUrls: feedState.imageUrls,
      },
      {
        onSuccess: () => {
          router.push(`/community/${numericFeedId}`);
        },
        onError: (error) => {
          console.error('게시글 수정 실패:', error);
          setErrorMessage('게시글 수정에 오류가 발생했습니다.');
        },
      }
    );
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div className={styles.createFeedContainer}>
      {/* 상단 바 */}
      <div className={styles.header}>
      <button onClick={() => router.back()} className={styles.backButton}>
          <BackIcon className={styles.backIcon} />
        </button>
        <h2 className={styles.pageTitle}>게시글 수정하기</h2>
        <button onClick={handleUpdate} className={styles.submitButton}>완료</button>
      </div>

      {/* 에러 메시지 */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* 카테고리 표시 */}
      <div className={styles.category}>{feedState.feedCategory}</div>

      {/* 이미지 업로드 섹션 */}
      <div className={styles.imageUploadSection}>
        <label className={styles.imageUploadLabel}>
          <div className={styles.imageUploadButton}>
            <span>+</span>
            <span>{images.length}/5</span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className={styles.imageUploadInput}
          />
        </label>

        {/* 업로드된 이미지 미리보기 */}
        <div className={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.imagePreview}>
              <Image
                src={URL.createObjectURL(image)}
                alt={`업로드된 이미지 ${index + 1}`}
                width={80}
                height={80}
                className={styles.uploadedImage}
                style={{ width: 'auto', height: 'auto' }}
              />
              <button
                className={styles.deleteButton}
                onClick={() => handleImageDelete(index)}
              >
                x
              </button>
            </div>
          ))}

          {/* 기존에 업로드된 이미지 미리보기 */}
          {feedState.imageUrls.map((url, index) => (
            <div key={index} className={styles.imagePreview}>
              <Image
                src={url}
                alt={`이미지 ${index + 1}`}
                width={80}
                height={80}
                className={styles.uploadedImage}
                style={{ width: 'auto', height: 'auto' }}
              />
              <button
                className={styles.deleteButton}
                onClick={() => handleImageDelete(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 게시글 제목 입력 */}
      <textarea
        className={styles.titleInput}
        placeholder="제목을 입력하세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 게시글 내용 입력 */}
      <textarea
        className={styles.contentInput}
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <p className={styles.notice}>욕설, 비방, 게시판 주제와 맞지 않는 글은 삭제될 수 있습니다.</p>
    </div>
  );
};

export default CommunityEdit;
