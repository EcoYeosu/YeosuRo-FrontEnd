//게시글 목록을 렌더링하는 컴포넌트

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CommentIcon from '@/components/community/images/messageCircle.svg';
import LikeIcon from '@/components/community/images/heartIcon.svg';
import ViewIcon from '@/components/community/images/eyeIcon.svg';
import styles from '@/styles/community/CommunityPostList.module.css';

interface Feed {
    id: number;
    title: string;
    content: string;
    imageUrls: string[];
    likesCount: number;
    view: number;
    repliesCount: number;
    feedCategory: string;
    nickname: string;
    profileImageUrl: string;
    tier: string;
  }
  
  interface CommunityFeedListProps {
    feeds: Feed[];
  }
  
  function CommunityFeedList({ feeds }: CommunityFeedListProps) {
    const router = useRouter(); 

    if (!feeds || feeds.length === 0) {
      return <p>게시글이 없습니다.</p>;
    }

    return (
        <div className={styles.postList}>
            {feeds.map((feed) => (
                <div 
                    key={feed.id} 
                    className={styles.postItem} 
                    onClick={() => router.push(`/community/${feed.id}`)} // 게시글 클릭 시 상세 페이지로 이동
                    style={{ cursor: 'pointer' }} // 커서 스타일 추가
                >
                    {/* 카테고리 정보 */}
                    <span className={styles.category}>{feed.feedCategory}</span>

                    {/* 제목 */}
                    <h3 className={styles.title}>{feed.title}</h3>

                    {/* 작성자 정보 */}
                    <div className={styles.authorInfo}>
                        <Image
                            src={feed.profileImageUrl}
                            alt="작성자 프로필"
                            width={40}
                            height={40}
                            className={styles.profileImage}
                        />
                        <span>{feed.nickname} {feed.tier}</span>
                    </div>

                    {/* 게시글 이미지 */}
                    {feed.imageUrls && feed.imageUrls.length > 0 && (
                        <div className={styles.images}>
                            {feed.imageUrls.map((url, index) => (
                                <Image
                                    key={index}
                                    src={url}
                                    alt={`게시글 이미지 ${index + 1}`}
                                    width={250} 
                                    height={150} 
                                    className={styles.postImage}
                                />
                            ))}
                        </div>
                    )}

                    {/* 게시글 내용 */}
                    <p className={styles.content}>{feed.content}</p>

                    {/* 댓글, 좋아요, 조회수 아이콘 */}
                    <div className={styles.footer}>
                        <CommentIcon className={styles.icon} />
                        <span>{feed.repliesCount}</span>
                        <LikeIcon className={styles.icon} />
                        <span>{feed.likesCount}</span>
                        <ViewIcon className={styles.icon} />
                        <span>{feed.view}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommunityFeedList;