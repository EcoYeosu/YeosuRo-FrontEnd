// CommunityPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/apis/index';
import CommunityHeader from '@/components/community/CommunityHeader'; 
import CommunityPostList from '@/components/community/CommunityPostList';
import styles from '@/styles/community/CommunityPage.module.css';

interface Post {
    id: number;
    title: string;
    content: string;
    imageUrls: string[];
    likesCount: number;
    view: number;
    storeCount: number;
    repliesCount: number;
    feedCategory: string;
    createAt: string;
    modifiedAt: string;
    memberID: number;
    nickname: string;
    profileImageUrl: string;
    tier: string;
}

const CommunityPage = () => {
    const [category, setCategory] = useState<string>('TRAVEL');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                const response = await api.get(`/feeds/category/${category}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setPosts(response.data || []);
                } else {
                    setError('게시글을 불러오는데 실패했습니다.');
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('게시글을 불러오는데 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.communityPage}>
            <CommunityHeader onCategoryChange={handleCategoryChange} />
            <CommunityPostList posts={posts} />
        </div>
    );
};

export default CommunityPage;
