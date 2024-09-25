'use client';

import React from 'react';
import styles from '@/styles/community/BottomSheet.module.css';

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    onCategorySelect: (category: string) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, onCategorySelect }) => {
    if (!visible) return null;

    return (
        <div className={styles.bottomSheet}>
            <div className={styles.sheetContent}>
                <h1>어느 게시판에 글을 쓸까요?</h1>
                <button onClick={() => onCategorySelect('POPULAR')}>인기글</button>
                <button onClick={() => onCategorySelect('FREE_TALK')}>자유톡 👋</button>
                <button onClick={() => onCategorySelect('PICK')}>숨은명소PICK 🌿</button>
                <button onClick={() => onCategorySelect('QnA')}>여수랑 QnA 🚲</button>
                <button onClick={() => onCategorySelect('EVENT')}>이벤트 🎁</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default BottomSheet;