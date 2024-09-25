// 새로운 게시글을 작성하는 컴포넌트

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { postFeedState } from '@/recoil/atoms';
import { useUploadImages, useCreateFeed } from '@/hooks/community';
import BackIcon from '@/components/community/images/backIcon.svg'
import styles from '@/styles/community/CommunityCreateFeed.module.css';

const CommunityCreateFeed: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [feedState, setFeedState] = useRecoilState(postFeedState);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: uploadImages } = useUploadImages();
  const { mutate: createFeed } = useCreateFeed();

      // useEffect를 사용하여 feedState의 변화를 추적
      useEffect(() => {
        console.log('feedState가 변경되었습니다:', feedState);
    }, [feedState]);

  // 이미지 업로드 핸들러
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const filesArray = Array.from(e.target.files);

        uploadImages(filesArray, {
            onSuccess: (uploadedUrls: string[]) => {

                // 이전 상태와 새로 업로드된 URL을 합쳐서 업데이트
                setFeedState((prevState) => {
                    const updatedImageUrls = [...(prevState.imageUrls || []), ...uploadedUrls].slice(0, 5);
                    return {
                        ...prevState,
                        imageUrls: updatedImageUrls,
                    };
                });

                // 이미지 파일 업데이트
                setImages((prevImages) => {
                    const updatedImages = [...prevImages, ...filesArray].slice(0, 5);
                    return updatedImages;
                });
            },
            onError: (error: Error) => {
                console.error('이미지 업로드 실패:', error);
            },
        });
    }
};

  // 이미지 삭제 핸들러
  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFeedState((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((_, i) => i !== index),
    }));
  };

  // 게시글 작성 완료 핸들러
  const handleSubmit = () => {
    if (title.length < 1 || content.length < 1) {
      setError('제목과 내용을 모두 작성해주세요.');
      return;
    }
  
    createFeed(
      {
        title,
        content,
        feedCategory: feedState.feedCategory!,
        imageUrls: feedState.imageUrls,
      },
      {
        onSuccess: () => {
          router.push('/community');
        },
        onError: (error) => {
          console.error('피드 등록 실패:', error);
          setError('피드 등록에 오류가 발생했습니다.');
        },
      }
    );
  };
  
  return (
    <div className={styles.createFeedContainer}>
      {/* 상단 바 */}
      <div className={styles.header}>
      <button onClick={() => router.back()} className={styles.backButton}>
          <BackIcon className={styles.backIcon} />
        </button>
        <h2 className={styles.pageTitle}>게시글 작성하기</h2>
        <button onClick={handleSubmit} className={styles.submitButton}>완료</button>
      </div>

      {/* 에러 메시지 */}
      {error && <p className={styles.error}>{error}</p>}

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

export default CommunityCreateFeed;