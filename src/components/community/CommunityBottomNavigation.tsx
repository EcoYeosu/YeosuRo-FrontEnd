//페이지 하단의 네비게이션을 표시하는 컴포넌트

"use client";
import React from 'react';
import styles from '@/styles/community/CommunityBottomNavigation.module.css';

function CommunityBottomNavigation() {
    return (
        <nav className={styles.navBar}>
            <button className={styles.navButton}>홈</button>
            <button className={styles.navButton}>글쓰기</button>
            <button className={styles.navButton}>프로필</button>
        </nav>
    );
}

export default CommunityBottomNavigation;
