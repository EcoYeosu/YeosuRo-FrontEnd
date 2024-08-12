'use client'

import { useInput } from '@/hooks/useInput';
import React, { useState } from 'react'
import { IFileUploadRequest, usePostFeeds } from '../hooks/react-query/usePostFeeds';
import { useFileUpload } from '../hooks/useFileUpload';
import Image from 'next/image';
import Link from 'next/link';
import useCommunityStore from '@/store/useCommunityStore';

function CommunityPost() {
  const { category } = useCommunityStore();
  const { previewUrls, onChangeFileHandler, uploadedUrls } = useFileUpload(5);
  const { values, handleChange } = useInput({ title: '', content: '' });
  const { mutate } = usePostFeeds();
  
  const handleSubmitWithDescription = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IFileUploadRequest = {
      feedCategory: category,
      imageUrls: uploadedUrls,
      title: values.title,
      content: values.content,
    };
    mutate(data);
  };
  return (
    <div className="mx-auto p-4">      
      <form onSubmit={handleSubmitWithDescription} className="space-y-4">
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Link href='/comunity'>뒤로가기</Link>
            <h1 className="text-2xl font-bold mb-4">게시글 작성하기</h1>
          </div>
          <button className=" text-blue p-2 rounded">완료</button>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="file-upload" className="cursor-pointer w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-3xl">
            +
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={onChangeFileHandler}
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
      </form>
    </div>
  );
}

export default CommunityPost
