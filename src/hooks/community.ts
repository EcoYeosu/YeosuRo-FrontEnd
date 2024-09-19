import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/apis/index';
import { Post } from '@/type/community'; // Post 타입 import

// 커뮤니티 조회 (게시글 목록 조회)
export const useGetCommunityPosts = (category: string) => {
  return useQuery<Post[], Error>({
    queryKey: ['communityPosts', category],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      const response = await api.get(`/feeds/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const useUploadImages = () => {
  return useMutation<string[], Error, File[]>({
    mutationFn: async (files: File[]): Promise<string[]> => {
      const formData = new FormData();
      files.forEach((file) => formData.append('file', file));
      formData.append('type', 'feed');

      try {
        const response = await api.post('/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 응답을 콘솔에 출력하여 확인
        console.log('이미지 업로드 응답:', response);

        // 응답이 성공적이고 올바른 형식인지 확인
        if (response.status === 200 && response.data && Array.isArray(response.data)) {
          return response.data; // 업로드된 이미지 URL 배열 반환
        } else {
          throw new Error('이미지 업로드 실패: 서버 응답이 올바르지 않습니다.');
        }
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
        throw new Error('이미지 업로드 실패');
      }
    },
  });
};


// 게시글 등록 쿼리
export const useCreatePost = () => {
  return useMutation<void, Error, { title: string; content: string; feedCategory: string; imageUrls: string[] }>({
    mutationFn: async (postData: { title: string; content: string; feedCategory: string; imageUrls: string[] }): Promise<void> => {
      const token = localStorage.getItem('accessToken');
      const response = await api.post('/feeds', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('게시글 등록에 실패했습니다.');
      }
    },
  });
};
