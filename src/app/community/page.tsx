'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useSetRecoilState } from 'recoil'; 
import { postFeedState } from '@/recoil/atoms';
import CommunityHeader from '@/components/community/CommunityHeader'; 
import CommunityFeedList from '@/components/community/CommunityFeedList';
import BottomSheet from '@/components/community/BottomSheet';
import styles from '@/styles/community/CommunityPage.module.css';
import { useGetCommunityFeeds } from '@/hooks/community'; // 리액트 쿼리 훅 import
import { Feed } from '@/type/community'; // 타입 import

const CommunityPage = () => {
    const [category, setCategory] = useState<string>('POPULAR');
    const [isSheetVisible, setSheetVisible] = useState<boolean>(false); // Bottom sheet visibility 상태
    const setSelectedCategory = useSetRecoilState(postFeedState); // Recoil 상태 설정 함수
    const router = useRouter();

    // React Query로 게시글 목록 가져오기
    const { data: posts, isLoading, error } = useGetCommunityFeeds(category);

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    const handleEditClick = () => {
        setSheetVisible(true); // Bottom sheet 열기
    };

    const handleCategorySelect = (selectedCategory: string) => {
        setSelectedCategory((prevState) => ({
            ...prevState,
            feedCategory: selectedCategory, // 선택한 카테고리 Recoil 상태에 저장
        }));
        router.push('/community/post'); // 글쓰기 페이지로 이동
    };

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>게시글을 불러오는데 오류가 발생했습니다.</p>;
    }

    return (
        <div className={styles.communityPage}>
            <CommunityHeader onCategoryChange={handleCategoryChange} onEditClick={handleEditClick} />
            <div className={styles.content}></div>
            <CommunityFeedList feeds={posts as Feed[]} />
            <BottomSheet 
                visible={isSheetVisible} 
                onClose={() => setSheetVisible(false)} 
                onCategorySelect={handleCategorySelect} 
            />
        </div>
    );
};

export default CommunityPage;
