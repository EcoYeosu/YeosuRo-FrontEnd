//게시글 목록을 렌더링하는 컴포넌트

'use client';

import React from 'react';
import Image from 'next/image'; // next/image import
import CommentIcon from '@/components/community/images/messageCircle.svg';
import LikeIcon from '@/components/community/images/heartIcon.svg';
import ViewIcon from '@/components/community/images/eyeIcon.svg';
import styles from '@/styles/community/CommunityPostList.module.css';

interface Post {
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

interface CommunityPostListProps {
    posts: Post[];
}

function CommunityPostList({ posts }: CommunityPostListProps) {
    if (!posts || posts.length === 0) {
        return <p>게시글이 없습니다.</p>;
    }

    return (
        <div className={styles.postList}>
            {posts.map((post) => (
                <div key={post.id} className={styles.postItem}>
                    {/* 카테고리 정보 */}
                    <span className={styles.category}>{post.feedCategory}</span>

                    {/* 제목 */}
                    <h3 className={styles.title}>{post.title}</h3>

                    {/* 작성자 정보 */}
                    <div className={styles.authorInfo}>
                        <Image
                            src={post.profileImageUrl}
                            alt="작성자 프로필"
                            width={40}
                            height={40}
                            className={styles.profileImage}
                        />
                        <span>{post.nickname} {post.tier}</span>
                    </div>

                    {/* 게시글 이미지 */}
                    {post.imageUrls && post.imageUrls.length > 0 && (
                        <div className={styles.images}>
                            {post.imageUrls.map((url, index) => (
                                <Image
                                    key={index}
                                    src={url}
                                    alt={`게시글 이미지 ${index + 1}`}
                                    width={250} // 이미지 크기를 절반으로 줄임
                                    height={150} 
                                    className={styles.postImage}
                                />
                            ))}
                        </div>
                    )}

                    {/* 게시글 내용 */}
                    <p className={styles.content}>{post.content}</p>

                    {/* 댓글, 좋아요, 조회수 아이콘 */}
                    <div className={styles.footer}>
                        <CommentIcon className={styles.icon} />
                        <span>{post.repliesCount}</span>
                        <LikeIcon className={styles.icon} />
                        <span>{post.likesCount}</span>
                        <ViewIcon className={styles.icon} />
                        <span>{post.view}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommunityPostList;