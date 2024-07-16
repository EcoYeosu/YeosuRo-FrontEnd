'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import Recommend from './_components/Recommend';

export default function page() {
    // const { data, error, isLoading } = useQuery(["recommendation"]);

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='min-w-[320px] max-w-[480px] mx-auto px-4 py-16 bg-slate-50'>
            <div className='my-10'>
                <div className='text-xl font-semibold'>해당 키워드가<br/> 들어간 여정들을 모아봤어요</div>
                <div className='text-[#949494]'>가장 가까운 여정을 고르고 자유롭게 수정해봐요!</div>
            </div>

            <div>
                <Recommend/>
                <Recommend/>
                <Recommend/>
            </div>
            {/* 서버에서 받은 데이터를 캐싱하여 추천페이지로 넘김 */}
            {/* <Recommend data={data}/> */}
        </div>
  )
}
