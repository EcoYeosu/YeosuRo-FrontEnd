//페이지 상단의 헤더를 표시하는 컴포넌트

'use client';
import React from 'react';
import styles from '@/styles/community/CommunityHeader.module.css';
import EditIcon from '@/components/community/images/editIcon.svg'; // 글쓰기 아이콘
import SearchIcon from '@/components/community/images/searchIcon.svg'; // 검색 아이콘

interface CommunityHeaderProps {
    onCategoryChange: (category: string) => void;
    onEditClick: () => void; // 추가된 prop
}

function CommunityHeader({ onCategoryChange, onEditClick }: CommunityHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.topSection}>
                <h1 className={styles.title}>커뮤니티</h1>
                <div className={styles.icons}>
                    <EditIcon className={styles.icon} onClick={onEditClick} /> {/* 클릭 시 onEditClick 호출 */}
                    <SearchIcon className={styles.icon} />
                </div>
            </div>

            <div className={styles.navBar}>
                <button className={`${styles.categoryButton}`} onClick={() => onCategoryChange('POPULAR')}>인기글</button>
                <button className={styles.categoryButton} onClick={() => onCategoryChange('FREE_TALK')}>자유톡 👋</button>
                <button className={styles.categoryButton} onClick={() => onCategoryChange('PICK')}>숨은명소PICK 🌿</button>
                <button className={styles.categoryButton} onClick={() => onCategoryChange('QNA')}>여수랑QnA🚲</button>
                <button className={styles.categoryButton} onClick={() => onCategoryChange('EVENT')}>이벤트 🎁</button>
            </div>
        </header>
    );
}

export default CommunityHeader;