import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/apis/index';
import { Feed, FeedDetail, Reply } from '@/type/community'; 

// 커뮤니티 조회 (피드 목록 조회)
export const useGetCommunityFeeds = (category: string) => {
  return useQuery<Feed[], Error>({
    queryKey: ['communityFeeds', category],
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

// 이미지 업로드 쿼리
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

        console.log('이미지 업로드 응답:', response);

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

// 피드 등록 쿼리
export const useCreateFeed = () => {
  return useMutation<void, Error, { title: string; content: string; feedCategory: string; imageUrls: string[] }>({
    mutationFn: async (feedData) => {
      const token = localStorage.getItem('accessToken');
      const response = await api.post('/feeds', feedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('피드 등록에 실패했습니다.');
      }
    },
  });
};

// 게시글 상세 조회 쿼리
export const useGetFeedDetail = (feedId: number) => {
  return useQuery<FeedDetail, Error>({
    queryKey: ['postDetail', feedId],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      const response = await api.get(`/feeds/${feedId}`, { 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    },
    enabled: !!feedId, 
  });
};


// 댓글 작성 쿼리
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<Reply, Error, { feedId: number; content: string }>({
    mutationFn: async ({ feedId, content }) => {
      const token = localStorage.getItem('accessToken');
      const response = await api.post(
        '/feeds/replies',
        { feedId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('댓글 작성에 실패했습니다.');
      }

      return response.data; // 응답의 댓글 데이터를 반환
    },
    onSuccess: (newReply, variables) => {
      // 기존 댓글 목록에 새 댓글을 추가
      queryClient.setQueryData<FeedDetail>(['postDetail', variables.feedId], (oldData) => {
        if (!oldData) return;

        // 새로운 댓글 목록 생성
        const updatedReplies = [...oldData.replies, newReply];

        // 기존 데이터에 새 댓글 목록과 댓글 수 업데이트
        return {
          ...oldData,
          replies: updatedReplies,
          repliesCount: oldData.repliesCount + 1,
        };
      });
    },
  });
};

// 피드 수정 쿼리
export const useUpdateFeed = () => {
  const queryClient = useQueryClient(); // useQueryClient를 사용하여 쿼리 클라이언트 가져오기

  return useMutation<void, Error, { feedId: number; title: string; content: string; imageUrls: string[] }>({
    mutationFn: async ({ feedId, title, content, imageUrls }) => {
      const token = localStorage.getItem('accessToken');
      
      // PATCH 요청
      const response = await api.patch(`/feeds/${feedId}`, { title, content, imageUrls }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('피드 수정에 실패했습니다.');
      }
    },
    onSuccess: (_, { feedId }) => {
      // 쿼리 무효화: 수정된 게시글 상세 정보를 다시 가져오기 위해 무효화
      queryClient.invalidateQueries({ queryKey: ['postDetail', feedId] });
    },
  });
};

// 피드 삭제 쿼리
export const useDeleteFeed = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { feedId: number }>({
    mutationFn: async ({ feedId }) => {
      const token = localStorage.getItem('accessToken');

      try {
        // DELETE 요청
        const response = await api.delete(`/feeds/${feedId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,  // 인증 정보 전송
        });

        if (response?.status !== 200) {
          throw new Error(`피드 삭제에 실패했습니다. 서버 응답 상태: ${response?.status}`);
        }
      } catch (error: any) {
        // 에러가 발생한 경우 처리
        if (error.response) {
          console.error('서버 응답에서 오류 발생:', error.response.status);
          console.error('서버 응답 데이터:', error.response.data);
        } else if (error.request) {
          console.error('요청이 전송되었으나 응답이 없습니다:', error.request);
        } else {
          console.error('요청 설정 중 오류 발생:', error.message);
        }
        throw new Error('피드 삭제에 실패했습니다.');
      }

    },
    onSuccess: (_, { feedId }) => {
      // 목록 페이지 쿼리를 강제로 다시 패치
      queryClient.invalidateQueries({ queryKey: ['communityFeeds'] });
      queryClient.invalidateQueries({ queryKey: ['postDetail', feedId] });
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['communityFeeds'] });  // 목록 강제 리패치
    },
  });
};

// 좋아요 등록 쿼리
export const useLikeFeed = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { feedId: number }>({
    mutationFn: async ({ feedId }) => {
      const token = localStorage.getItem('accessToken');
      console.log('좋아요 등록 요청: feedId=', feedId, 'token=', token);
      const response = await api.post(`/feeds/${feedId}/likes`, null, { // null을 데이터로 전달
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('좋아요 등록 응답:', response);
      if (response.status < 200 || response.status >= 300) { // 2xx 상태 코드 확인
        throw new Error('좋아요 등록에 실패했습니다.');
      }
    },
    onSuccess: (_, { feedId }) => {
      // 좋아요 등록 성공 시, 해당 피드 상세 정보 및 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['postDetail', feedId] });
      queryClient.invalidateQueries({ queryKey: ['communityFeeds'] });
    },
    onError: (error) => {
      console.error('useLikeFeed 에러:', error);
    },
  });
};

// 좋아요 취소 쿼리
export const useUnlikeFeed = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { feedId: number }>({
    mutationFn: async ({ feedId }) => {
      const token = localStorage.getItem('accessToken');
      
      // 서버에 DELETE 요청을 보냄
      const response = await api.delete(`/feeds/${feedId}/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 상태 코드 확인
      if (response.status < 200 || response.status >= 300) {
        throw new Error('좋아요 취소에 실패했습니다.');
      }
    },
    onSuccess: (_, { feedId }) => {
      // 성공 시, 상세 게시글 데이터를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['postDetail', feedId] });

      // 커뮤니티 목록 페이지도 업데이트
      queryClient.invalidateQueries({ queryKey: ['communityFeeds'] });
    },
    onError: (error) => {
      console.error('좋아요 취소 실패:', error.message);
      alert('좋아요 취소에 실패했습니다.');
    },
  });
};

// 저장 등록 쿼리
export const useStoreFeed = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { type: string; id: number }>({
    mutationFn: async ({ type, id }) => {
      const token = localStorage.getItem('accessToken');
      console.log('저장 등록 요청: type=', type, 'id=', id, 'token=', token);

      const response = await api.post(`/store/${type}/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('저장 등록 응답:', response);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('저장 등록에 실패했습니다.');
      }
    },
    onSuccess: (_, { id }) => {
      // 저장 등록 성공 시, 해당 피드 상세 정보 및 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['postDetail', id] });
      queryClient.invalidateQueries({ queryKey: ['communityFeeds'] });
    },
    onError: (error) => {
      console.error('useStoreFeed 에러:', error);
    },
  });
};

// 저장 취소 쿼리
export const useUnstoreFeed = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { type: string; id: number }>({
    mutationFn: async ({ type, id }) => {
      const token = localStorage.getItem('accessToken');
      console.log('저장 취소 요청: type=', type, 'id=', id, 'token=', token);

      const response = await api.delete(`/store/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error('저장 취소에 실패했습니다.');
      }
    },
    onSuccess: (_, { id }) => {
      // 저장 취소 성공 시, 해당 피드 상세 정보 및 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['postDetail', id] });
      queryClient.invalidateQueries({ queryKey: ['communityFeeds'] });
    },
    onError: (error) => {
      console.error('저장 취소 실패:', error.message);
      alert('저장 취소에 실패했습니다.');
    },
  });
};