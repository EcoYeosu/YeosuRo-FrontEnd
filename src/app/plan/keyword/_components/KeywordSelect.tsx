'use client';
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import Tag from "./Tag";
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const keyword = [
    {
        contents: '일정',
        words: ['당일치기', '1박 2일', '2박 3일', '3박 4일', '4박+']
    },
    {
        contents: '장소',
        words: ['역사/유적지', '테마파크', '섬', '바다', '공원/산']
    },
    {
        contents: '즐길 거리',
        words: ['식도락', '휴양', '촬영', '엑티비티', '명소 탐방', '축제/공연', '산책']
    },
];

const fetchResult = async (data) => {
    const url = 'https://5bb10ab0-2eba-46a0-9b45-df143729ffc9.mock.pstmn.io/plan/keyword'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: 1,
            data
        }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default function KeywordSelect({ setLoading }) {
    const [words, setWords] = useState<string[]>([]); //useStore로 조작
    const queryClient = useQueryClient();

    const mutation = useMutation(fetchResult, {
        onSuccess: async (data) => {
            // 서버에서 응답받은 데이터 캐싱
            queryClient.setQueryData(["recommendation"], data);

            setLoading(true);
        },
    });

    const handleSubmit = () => {
        mutation.mutate(words);
    };


    const wordClick = (word: string) => {
        setWords(prev => {
            if (prev.includes(word)) {
                return prev.filter(item => item !== word);
            } else {
                return [...prev, word]
            }
        });
    };

    return (
        <div className="">
            <div className="">
                <h4>
                    나의 여정과<br />
                    가장 가까운<br />
                    키워드를 골라볼까요?
                </h4>
            </div>

            {/* 키워드 */}
            <div>
                {keyword.map(item => {
                    return (
                        <div key={item.contents} className="mt-10">
                            <div className="mb-5 text-lg">{item.contents}</div>
                            <div className="flex flex-wrap text-sm">
                                {item.words.map(word =>
                                    <Tag word={word} words={words} wordClick={wordClick} />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <button 
                onClick={handleSubmit}
                className="w-full p-2 my-8 rounded bg-blue-500 text-white"
                >
                다음
            </button>
        </div>

    )
}
