'use client'

import { useInput } from '@/hooks/useInput';
import React, { useState } from 'react'
import { IFileUploadRequest, usePostFeeds } from '../hooks/usePostFeeds';
import { useFileUpload } from '../hooks/useFileUpload';
import Image from 'next/image';

function CommunityPost() {

  const { previewUrls, selectedFiles, handleFileChange, isMaxFiles } = useFileUpload(5);
  const { values, handleChange } = useInput({ title: '', content: '' });


  const { mutate } = usePostFeeds();
  const handleSubmitWithDescription = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IFileUploadRequest = {
      imageUrl: selectedFiles,
      title: values.title,
      content: values.content,
    };
    mutate(data);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">게시글 작성하기</h1>
      <form onSubmit={handleSubmitWithDescription} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="file-upload" className="cursor-pointer w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-3xl">
            +
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            style={{ display: 'none' }}
          />
          <span>{previewUrls.length}/5</span>
          {previewUrls.length > 0 && (
            <div className="flex space-x-2">
              {previewUrls.map((url, index) => (
                <Image
                  width={100}
                  height={100}
                  key={index}
                  src={url}
                  alt={`Preview ${index}`}
                  className="object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="content"
          value={values.content}
          onChange={handleChange}
          placeholder="설명을 입력하세요."
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          전송
        </button>
      </form>
    </div>
  );
}

export default CommunityPost
