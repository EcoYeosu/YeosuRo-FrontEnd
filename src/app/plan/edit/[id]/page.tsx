'use client'

import Button from "@/components/common/buttons/Button";
import TitleHeader from "@/features/plan/components/headers/TitleHeader";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/kakao/KakaoMap";
import Toggle from "@/features/plan/components/toggle/toggle"
import BottomSheet from "@/components/common/bottomSheet/Bottomsheet";
import { useSearchParams } from 'next/navigation';


const PlanEdit= () => {

    const router = useRouter();

    const nextPage = () => {
        router.push(`/plan/add/free`);
    }

    const searchParams = useSearchParams(); // searchParams 훅을 사용해 쿼리 파라미터 가져오기
    const [queryData, setQueryData] = useState({
        userId: '',
        id: '',
        memo: '',
        latitude: '',
        longitude: '',
        address: '',
        startTime: '',
        endTime: '',
    });

    useEffect(() => {
        if (searchParams) {
            const userId = searchParams.get('userId');
            const id = searchParams.get('id');
            const memo = searchParams.get('memo');
            const latitude = searchParams.get('latitude');
            const longitude = searchParams.get('longitude');
            const address = searchParams.get('address');
            const startTime = searchParams.get('startTime');
            const endTime = searchParams.get('endTime');

            setQueryData({
                userId: userId || '',
                id: id || '',
                memo: memo || '',
                latitude: latitude || '',
                longitude: longitude || '',
                address: address || '',
                startTime: startTime || '',
                endTime: endTime || '',
            });
        }
    }, [searchParams]);
    
    // query에서 전달된 데이터 사용
    // const { userId, title, startDate, endDate } = query;

    // console.log('userId:', userId);
    // console.log('title:', title);
    // console.log('startDate:', startDate);
    // console.log('endDate:', endDate);
    
    return (
        <div style={{ width: '360px', margin:'0 auto' }}>
            <TitleHeader title={'혜진이랑 당일치기'}/>
            <KakaoMap />
            <div style={{ width: '320px', margin:'0 auto', display:'flex' ,flexDirection:'column',alignItems:'center'}}>
                <div style={{ width: '100%', marginTop:'24px', display:'flex',justifyContent:'space-between'}}>
                    <div>
                        <p style={{color:'#777777', fontSize:'14px'}}>2024. 05. 05</p>
                        <p style={{fontWeight:'600',fontSize:'16px'}}>1일째</p>
                    </div>
                    <div style={{ display:'flex',justifyContent:'space-between'}}>
                        <p style={{color:'#777777', fontSize:'14px'}}>가계부</p>
                        <Toggle />
                    </div>
                </div>
                <div className="relative inline-block bg-blue-100 text-blue-700 rounded-md px-4 py-2" style={{margin:'25px 0 25px 0'}}>
                    <p>
                        여행의 첫 장소를 골라주세요! <span className="inline-block">👣</span>
                    </p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-17px] w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[17px] border-t-blue-100 ">
                    </div>
                </div>
                <Button value={'일정 추가하기'} className={'w-full mb-3'} onClick={nextPage}/>
                <BottomSheet />
            </div>
        </div>
    )
}; 

export default PlanEdit;