// 각 게시글의 항목을 표시하는 컴포넌트

'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/community/CommunityPostItem.module.css';

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

interface CommunityPostItemProps {
    post: Post;
}

const CommunityPostItem: React.FC<CommunityPostItemProps> = ({ post }) => {
    return (
        <div className={styles.postItem}>
            {/* 게시글 헤더 */}
            <div className={styles.header}>
                <span className={styles.category}>{post.feedCategory}</span>
                <h3 className={styles.title}>{post.title}</h3>
            </div>
            
            {/* 작성자 정보 */}
            <div className={styles.authorInfo}>
                <Image src={post.profileImageUrl} alt="작성자 프로필" width={30} height={30} className={styles.profileImage} />
                <span className={styles.nickname}>{post.nickname}</span>
                <span className={styles.tier}>{post.tier}</span>
            </div>
            
            {/* 게시글 이미지 */}
            {post.imageUrls && post.imageUrls.length > 0 && (
                <div className={styles.images}>
                    {post.imageUrls.map((url, index) => (
                        <Image key={index} src={url} alt={`게시글 이미지 ${index + 1}`} width={500} height={300} className={styles.postImage} />
                    ))}
                </div>
            )}
            
            {/* 게시글 내용 */}
            <p className={styles.content}>{post.content}</p>
            
            {/* 게시글 정보 */}
            <div className={styles.footer}>
                <span>댓글 {post.repliesCount}</span>
                <span>좋아요 {post.likesCount}</span>
                <span>조회수 {post.view}</span>
            </div>
        </div>
    );
};

export default CommunityPostItem;