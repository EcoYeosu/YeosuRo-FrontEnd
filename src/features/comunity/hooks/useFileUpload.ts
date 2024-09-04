// import { useState, useEffect } from 'react';
// import { useUploadFiles } from './useUploadFiles';

// export const useFileUpload = (maxFiles: number) => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
//   const [isMaxFiles, setIsMaxFiles] = useState<boolean>(false);
//   const [newFiles, setNewFiles] = useState<File[]>([]);

//   const { mutateAsync: uploadFiles } = useUploadFiles();

//   useEffect(() => {
//     const processNewFiles = async () => {
//       if (newFiles.length === 0) return;

//       const newPreviewUrls = createPreviewUrls(newFiles);
//       const newUploadedUrls = await uploadFiles(newFiles);

//       if (newUploadedUrls) {
//         updateState(newFiles, newPreviewUrls, newUploadedUrls);
//       }
//     };

//     processNewFiles();
//   }, [newFiles]);

//   const createPreviewUrls = (files: File[]): string[] => {
//     return files.map((file) => URL.createObjectURL(file));
//   };

//   const updateState = (newFiles: File[], newPreviewUrls: string[], newUploadedUrls: string[]) => {
//     setSelectedFiles((prevFiles) => {
//       const updatedFiles = [...prevFiles, ...newFiles].slice(0, maxFiles);
//       setIsMaxFiles(updatedFiles.length >= maxFiles);
//       return updatedFiles;
//     });

//     setPreviewUrls((prevUrls) => {
//       const updatedPreviewUrls = [...prevUrls, ...newPreviewUrls].slice(0, maxFiles);
//       return updatedPreviewUrls;
//     });

//     setUploadedUrls((prevUrls) => {
//       const updatedUploadedUrls = [...prevUrls, ...newUploadedUrls].slice(0, maxFiles);
//       return updatedUploadedUrls;
//     });

//     setNewFiles([]);
//   };

//   const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (selectedFiles.length + files.length > maxFiles) {
//       // TODO: 최대 5장 toast 추가
//       return;
//     }
//     setNewFiles(files);
//   };

//   return {
//     selectedFiles,
//     previewUrls,
//     onChangeFileHandler,
//     isMaxFiles,
//     uploadedUrls,
//   };
// };
