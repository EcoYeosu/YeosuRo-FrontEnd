//새로운 게시글을 작성하는 컴포넌트
import React, { useState } from 'react';
import { useCommunityCreatePost } from '@/hooks/community/communityUseCreatePost';
import styles from '@/styles/community/CommunityCreatePost.module.css';

function CommunityCreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const createPost = useCommunityCreatePost();

    const handleSubmit = () => {
        createPost.mutate({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <div className={styles.createPost}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <button onClick={handleSubmit}>Create Post</button>
        </div>
    );
}

export default CommunityCreatePost;
