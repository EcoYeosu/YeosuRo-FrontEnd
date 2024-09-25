// 커뮤니티 상세 페이지 컴포넌트
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetFeedDetail, useCreateComment, useDeleteFeed, useLikeFeed, useUnlikeFeed, useStoreFeed, useUnstoreFeed } from '@/hooks/community'; // 저장 관련 훅 추가
import Image from 'next/image';
import CommentIcon from '@/components/community/images/messageCircle.svg';
import HeartIcon from '@/components/community/images/heartIcon.svg';
import ViewIcon from '@/components/community/images/eyeIcon.svg';
import LikeBtnIcon from '@/components/community/images/likeBtnIcon.svg';
import StoreIcon from '@/components/community/images/store.svg';
import BackIcon from '@/components/community/images/backIcon.svg'
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginState, isFeedState } from '@/recoil/atoms'; // 좋아요 및 저장 상태 관리
import styles from '@/styles/community/CommunityFeedDetail.module.css';

interface CommunityFeedDetailProps {
  feedId: number;
}

const CommunityFeedDetail: React.FC<CommunityFeedDetailProps> = ({ feedId }) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetFeedDetail(feedId);
  const [comment, setComment] = useState('');
  const { mutateAsync: createComment } = useCreateComment(); // mutateAsync 사용
  const { mutateAsync: deleteFeed } = useDeleteFeed(); // mutateAsync 사용
  const [feedState, setFeedState] = useRecoilState(isFeedState(feedId)); // 좋아요 및 저장 상태 관리
  const likeFeed = useLikeFeed(); // 좋아요 등록 훅
  const unlikeFeed = useUnlikeFeed(); // 좋아요 취소 훅
  const storeFeed = useStoreFeed(); // 저장 등록 훅
  const unstoreFeed = useUnstoreFeed(); // 저장 취소 훅
  const loginState = useRecoilValue(isLoginState); // 로그인 상태 가져오기

  // 로딩 중일 때
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  // 에러 발생 시
  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }

  // 데이터가 없을 때
  if (!data) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  const { title, content, imageUrls, view, likesCount, repliesCount, feedCategory, nickname, profileImageUrl, tier, replies, createAt, memberID } = data;

  // 댓글 전송 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      await createComment({ feedId: feedId, content: comment });
      setComment(''); // 전송 후 입력란 초기화
    } catch (error: any) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // 수정 및 삭제 핸들러
  const handleEdit = () => {
    router.push(`/community/edit/${feedId}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deleteFeed({ feedId });
      alert('게시글이 삭제되었습니다.');
      router.push('/community'); // 삭제 후 커뮤니티 목록으로 이동
    } catch (error: any) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    try {
      if (feedState.isLikedState) {
        await unlikeFeed.mutateAsync({ feedId });
        setFeedState((prevState) => ({
          ...prevState,
          isLikedState: false,
        }));
      } else {
        await likeFeed.mutateAsync({ feedId });
        setFeedState((prevState) => ({
          ...prevState,
          isLikedState: true,
        }));
      }
    } catch (error: any) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  // 저장 버튼 클릭 핸들러
  const handleStoreClick = async () => {
    try {
      if (feedState.isStoredState) {
        await unstoreFeed.mutateAsync({ type: 'feed', id: feedId });
        setFeedState((prevState) => ({
          ...prevState,
          isStoredState: false,
        }));
      } else {
        await storeFeed.mutateAsync({ type: 'feed', id: feedId });
        setFeedState((prevState) => ({
          ...prevState,
          isStoredState: true,
        }));
      }
    } catch (error: any) {
      console.error('저장 처리 실패:', error);
    }
  };

  return (
<div className="container">
  {/* 상단 영역 */}
  <div className={styles.header}>
    <button onClick={() => router.back()} className={styles.backButton}>
      <BackIcon className={styles.backIcon} />
    </button>
  </div>

  {/* 제목 영역 */}
  <div className={styles.titleSection}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.date}>{new Date(createAt).toLocaleDateString()}</p>
  </div>

  {/* 작성자 정보 */}
  <div className={styles.authorInfo}>
    <Image src={profileImageUrl} alt="프로필 이미지" width={40} height={40} className={styles.profileImage} />
    <div className={styles.authorDetails}>
      <span className={styles.nickname}>{nickname}</span>
      <span className={styles.tier}>{tier}</span>
    </div>
    {loginState.isLogin && memberID === loginState.userId && (
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={handleEdit}>수정</button>
        <button className={styles.deleteButton} onClick={handleDelete}>삭제</button>
      </div>
    )}
  </div>

  {/* 피드 이미지들 */}
  {imageUrls && imageUrls.length > 0 && (
    <div className={styles.imageContainer}>
      {imageUrls.map((url, index) => (
        <Image key={index} src={url} alt={`피드 이미지 ${index + 1}`} width={320} height={280} className={styles.feedImage} />
      ))}
    </div>
  )}

  {/* 게시글 내용 영역 */}
  <div className={styles.content}>
        <p>{content}</p>
      </div>

  {/* 피드 정보와 좋아요/저장 버튼 */}
  <div className={styles.footer}>
    <div className={styles.feedInfo}>
      <div className={styles.iconGroup}>
        <CommentIcon />
        <span>{repliesCount}</span>
      </div>
      <div className={styles.iconGroup}>
        <HeartIcon />
        <span>{likesCount}</span>
      </div>
      <div className={styles.iconGroup}>
        <ViewIcon />
        <span>{view}</span>
      </div>
    </div>

    <div className={styles.actionIcons}>
      <button onClick={handleLikeClick} className={styles.iconGroup}>
        <LikeBtnIcon
          className={styles.likeIcon}
          style={{ fill: feedState.isLikedState ? 'pink' : 'none' }}
        />
      </button>
      <button onClick={handleStoreClick} className={styles.iconGroup}>
        <StoreIcon
          className={styles.storeIcon}
          style={{ fill: feedState.isStoredState ? 'yellow' : 'none' }}
        />
      </button>
    </div>
  </div>

  {/* 댓글 섹션 */}
  <div className={styles.repliesSection}>
      {/* 댓글 입력 영역 */}
      <div className={styles.commentInputContainer}>
        <input
          type="text"
          placeholder="댓글을 남겨보세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.commentInput}
        />
        <button onClick={handleCommentSubmit} className={styles.commentSubmitButton}>
          전송
        </button>
      </div>

      {/* 댓글 리스트 */}
      {replies && replies.map((reply) => (
        <div key={reply.id} className={styles.replyItem}>
          <Image
            src={reply.profileImageUrl}
            alt="댓글 작성자 프로필 이미지"
            width={30}
            height={30}
            className={styles.replyProfileImage}
          />
          <div className={styles.replyContent}>
            <div className={styles.replyAuthor}>
              <span className={styles.nickname}>{reply.nickname}</span>
              <span className={styles.tier}>{reply.tier}</span>
            </div>
            <p className={styles.replyText}>{reply.content}</p>
            <div className={styles.replyActions}>
              <div className={styles.replyLikeIcon}>
                <LikeBtnIcon />
                <span>{reply.likesCount}</span>
              </div>
              <button>좋아요</button>
              <button>답글</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default CommunityFeedDetail;
