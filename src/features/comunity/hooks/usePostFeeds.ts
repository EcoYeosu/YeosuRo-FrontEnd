import { api } from '@/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface IFileUploadResponse {
  id: number;
  memberID: number;
  title: string;
  content: string;
  imageUrl: string;
  view: number;
  createAt: string;
  modifiedAt: string;
}
export interface IFileUploadRequest {
  title: string;
  content: string;
  imageUrls: string[];
  feedCategory: string;
}

export const usePostFeeds = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const uploadFiles = async (data: IFileUploadRequest) => {
    const response = await api.post<IFileUploadResponse>('/feeds', data);
    return response.data;
  };

  return useMutation<IFileUploadResponse, Error, IFileUploadRequest>({
    mutationFn: uploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploads','community'] })
      router.push('/comunity')
    }
  })
}
