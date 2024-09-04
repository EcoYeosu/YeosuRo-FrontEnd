// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { api } from '@/apis';

// export const useUploadFiles = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (files: File[]) => {
//       const formData = new FormData();
//       files.forEach((file) => {
//         formData.append('file', file);
//       });
//       formData.append('type', 'feed');
//       return await api.post<{ imageUrls: string[] }>('/images/upload', formData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['uploadedFiles'] });
//     },
//   });
// };