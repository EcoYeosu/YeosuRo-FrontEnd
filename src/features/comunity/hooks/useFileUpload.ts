import { useState } from 'react';

export const useFileUpload = (maxFiles: number = 5) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isMaxFiles, setIsMaxFiles] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    let updatedFiles = [...selectedFiles, ...newFiles];

    if (updatedFiles.length > maxFiles) {
      updatedFiles = updatedFiles.slice(-maxFiles);
    }

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedFiles.map(file => URL.createObjectURL(file)));
    setIsMaxFiles(updatedFiles.length >= maxFiles);
  };

  return {
    selectedFiles,
    previewUrls,
    handleFileChange,
    isMaxFiles,
  };
};