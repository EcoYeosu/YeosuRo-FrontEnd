import { useState } from 'react';
import { api } from '@/apis';

export const useFileUpload = (maxFiles:number) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isMaxFiles, setIsMaxFiles] = useState<boolean>(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('imageUrl', file);
      const response = await api.post<{ imageUrl: string }>('/upload', formData);
      return response.data.imageUrl;
    } catch (error) {
      console.error('Failed to upload file', error);
      return null;
    }
  };

  const onChangeFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    if (selectedFiles.length + newFiles.length > maxFiles) {
      // TODO: 최대 5장 toast 추가
      return;
    }

    const validFilesPromises = newFiles.map(async file => {
      const previewUrl = URL.createObjectURL(file);
      const uploadedUrl = await uploadFile(file);
      return { file, previewUrl, uploadedUrl };
    });

    const validFiles = (await Promise.all(validFilesPromises))
      .filter(item => item.uploadedUrl !== null);

    const updatedFiles = [...selectedFiles, ...validFiles.map(result => result.file as File)].slice(0, maxFiles);
    const updatedPreviews = [...previewUrls, ...validFiles.map(result => result.previewUrl as string)].slice(0, maxFiles);
    const updatedUrls = [...uploadedUrls, ...validFiles.map(result => result.uploadedUrl as string)].slice(0, maxFiles);

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    setUploadedUrls(updatedUrls);
    setIsMaxFiles(updatedFiles.length >= maxFiles);
  };

  return {
    selectedFiles,
    previewUrls,
    onChangeFileHandler,
    isMaxFiles,
    uploadedUrls,
  };
};
