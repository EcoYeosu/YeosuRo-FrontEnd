//새 게시글을 생성하는 훅
import { useMutation, useQueryClient } from 'react-query';
import { createCommunityPost } from '@/apis/communityPostService';

export const useCommunityCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation(createCommunityPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('communityPosts');
        },
    });
};
