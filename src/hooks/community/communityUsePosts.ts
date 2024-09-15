//게시글 목록을 가져오는 훅

import { useState, useEffect } from 'react';
import { api } from '@/apis/index';

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

export const useCommunityPosts = (category: string) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await api.get(`/feeds/category/${category}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setPosts(response.data.data);
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

    return { posts, loading, error };
};

