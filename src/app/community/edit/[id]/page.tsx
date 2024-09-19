'use client';

import React from 'react';
import CommunityEdit from '@/components/community/CommunityFeedEdit';
import styles from '@/styles/community/CommunityFeedEdit.module.css';

const CommunityEditPage = () => {
  return (
    <div className={styles.editPageContainer}>
      <CommunityEdit /> {/* CommunityEdit 컴포넌트 렌더링 */}
    </div>
  );
};

export default CommunityEditPage;
