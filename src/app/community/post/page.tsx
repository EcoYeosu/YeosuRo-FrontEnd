'use client';

import React, { useEffect, useState } from 'react';

interface Reply {
    id: number;
    feedID: number;
    content: string;
    likesCount: number;
    createAt: string;
    modifiedAt: string;
    memberID: number;
    nickname: string;
    profileImageUrl: string;
    tier: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    imageUrls: string[];
    likesCount: number;
    view: number;
    repliesCount: number;
    feedCategory: string;
    createAt: string;
    modifiedAt: string;
    memberID: number;
    nickname: string;
    profileImageUrl: string;
    tier: string;
    replies: Reply[];
}

const CommunityPostDetail = () => {
    const [post, setPost] = useState<Post | null>(null);
    const postId = 1; // 테스트용으로 임시 고정 ID 설정

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}feeds/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                    },
                });

                const data = await response.json();

                if (response.ok && data.status === 200) {
                    setPost(data.data);
                } else {
                    console.error('게시글을 가져오는 중 오류 발생:', data.message);
                }
            } catch (error) {
                console.error('요청 중 오류 발생:', error);
            }
        };

        fetchPostDetail();
    }, []);

    if (!post) {
        return <p>데이터를 불러오는 중...</p>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div>
                <h3>이미지 목록:</h3>
                {post.imageUrls.length > 0 ? (
                    post.imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`게시글 이미지 ${index + 1}`}
                            style={{ width: '100%', maxWidth: '400px', margin: '10px 0' }}
                        />
                    ))
                ) : (
                    <p>이미지가 없습니다.</p>
                )}
            </div>
            <div>
                <h3>작성자 정보:</h3>
                <p>닉네임: {post.nickname}</p>
                <p>티어: {post.tier}</p>
                <img
                    src={post.profileImageUrl}
                    alt="작성자 프로필"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
            </div>
            <div>
                <h3>댓글 ({post.repliesCount}개):</h3>
                {post.replies.length > 0 ? (
                    post.replies.map((reply) => (
                        <div key={reply.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            <p>닉네임: {reply.nickname}</p>
                            <p>내용: {reply.content}</p>
                            <p>좋아요: {reply.likesCount}</p>
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CommunityPostDetail;
