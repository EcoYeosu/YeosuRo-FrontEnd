// 커뮤니티 상세 페이지 컴포넌트

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetFeedDetail, useCreateComment, useDeleteFeed }  from '@/hooks/community';
import Image from 'next/image';
import CommentIcon from '@/components/community/images/messageCircle.svg';
import LikeIcon from '@/components/community/images/heartIcon.svg';
import ViewIcon from '@/components/community/images/eyeIcon.svg';
import LikeBtnIcon from '@/components/community/images/likeBtnIcon.svg';
import StoreIcon from '@/components/community/images/store.svg';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '@/recoil/atoms'; // Recoil atom import
import styles from '@/styles/community/CommunityFeedDetail.module.css';

interface CommunityFeedDetailProps {
  feedId: number;
}

const CommunityFeedDetail: React.FC<CommunityFeedDetailProps> = ({ feedId }) => {
    const router = useRouter();
    const { data, isLoading, error } = useGetFeedDetail(feedId);
    const [comment, setComment] = useState('');
    const { mutate: createComment } = useCreateComment();
    const { mutate: deleteFeed } = useDeleteFeed();
    const loginState = useRecoilValue(isLoginState); // Recoil 상태에서 로그인 정보 가져오기

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
    const handleCommentSubmit = () => {
        if (comment.trim() === '') {
            alert('댓글을 입력해주세요.');
            return;
        }

        createComment(
            { feedId: feedId, content: comment },
            {
                onSuccess: () => {
                    setComment(''); // 전송 후 입력란 초기화
                },
                onError: (error: Error) => {
                    console.error('댓글 작성 실패:', error);
                    alert('댓글 작성에 실패했습니다.');
                },
            }
        );
    };

    // 수정 및 삭제 핸들러
    const handleEdit = () => {
        router.push(`/community/edit/${feedId}`);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
        if (!confirmDelete) return;
      
        deleteFeed(
          { feedId },
          {
            onSuccess: () => {
              alert('게시글이 삭제되었습니다.');
              router.push('/community'); // 삭제 후 커뮤니티 목록으로 이동
            },
            onError: (error) => {
              console.error('게시글 삭제 실패:', error);
              alert('게시글 삭제에 실패했습니다.');
            },
          }
        );
      };
      
    return (
        <div className={styles.feedDetailContainer}>
            {/* 상단 영역 */}
            <div className={styles.header}>
                <button onClick={() => router.back()} className={styles.backButton}>←</button>
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
             {/* 수정 및 삭제 버튼 조건부 렌더링 */}
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
                        <Image key={index} src={url} alt={`피드 이미지 ${index + 1}`} width={400} height={300} className={styles.feedImage} />
                    ))}
                </div>
            )}

            {/* 피드 내용 */}
            <div className={styles.content}>
                <p>{content}</p>
            </div>

            {/* 피드 정보 (조회수, 좋아요, 댓글 수) */}
            <div className={styles.footer}>
                <CommentIcon className={styles.icon} />
                <span>{repliesCount}</span>
                <LikeIcon className={styles.icon} />
                <span>{likesCount}</span>
                <ViewIcon className={styles.icon} />
                <span>{view}</span>
                <LikeBtnIcon className={styles.icon} />
                <StoreIcon className={styles.icon} />
            </div>

            {/* 댓글 입력 및 전송 영역 */}
            <div className={styles.commentInputContainer}>
                <input
                    type="text"
                    placeholder="댓글을 남겨보세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={styles.commentInput}
                />
                <button onClick={handleCommentSubmit} className={styles.commentSubmitButton}>전송</button>
            </div>

            {/* 댓글 섹션 */}
            <div className={styles.repliesSection}>
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
                                <span className={styles.createAt}>{new Date(reply.createAt).toLocaleDateString()}</span>
                            </div>
                            <p>{reply.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityFeedDetail;
