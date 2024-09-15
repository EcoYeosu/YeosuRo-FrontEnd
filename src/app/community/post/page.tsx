'use client';

import React from 'react';
import CommunityCreateFeed from '@/components/community/CommunityCreateFeed'; // 새로운 컴포넌트 import
import styles from '@/styles/community/CommunityCreateFeed.module.css';

const CommunityPostPage = () => {
    return (
        <div className={styles.communityPostPage}>
            <CommunityCreateFeed /> {/* CommunityCreateFeed 컴포넌트 렌더링 */}
        </div>
    );
};

export default CommunityPostPage;
