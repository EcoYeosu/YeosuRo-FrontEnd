import { api } from '@/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  imageUrl: File[];
}

export const usePostFeeds = () => {
  const queryClient = useQueryClient();

  const uploadFiles = async (data: IFileUploadRequest) => {
    const formData = new FormData();
    data.imageUrl.forEach(file => formData.append('files', file));
    formData.append('title', data.title);
    formData.append('content', data.content);
    const response = await api.post<IFileUploadResponse>('/feeds', formData);
    return response.data;
  };

  return useMutation<IFileUploadResponse, Error, IFileUploadRequest>({
    mutationFn: uploadFiles,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['uploads'] })
  })
}
