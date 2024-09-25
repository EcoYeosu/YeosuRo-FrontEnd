'use client'

import { useState,useEffect } from "react";
import Button from "@/components/common/buttons/Button";
import TitleHeader from "@/components/plan/headers/TitleHeader";
import Toggle from "@/components/plan/toggle/toggle"
import BottomSheet from "@/components/common/bottomSheet/Bottomsheet";
import PlaceCard from "@/components/plan/card/PlaceCard";
import { useRecoilValue } from 'recoil';
import { planData } from '@/recoil/atoms';
import { Site } from '@/type/plan'
import dynamic from 'next/dynamic';

const KakaoMapNoSSR = dynamic(() => import('@/components/common/kakao/KakaoMap'), {
    ssr: false, // 서버사이드 렌더링 비활성화
  });


const PlanEdit= () => {
    
    const planDataState = useRecoilValue(planData);

    //placeCard 컴포넌트 사용될 useState
    const [selectCardId, setSelectCardId] = useState(0)
    const [isClient, setIsClient] = useState(false);
    const cardColor = [
      '#0D77E0','#37E00D','#E0920D','#E00DB3','#572AAE',
      '#1FD8D8','#D95050','#3F4CC5','#2F9E86','#B22EE0'
    ]

    //kakaoMap 컴포넌트 사용될 useState
    const [placeData, setPlaceData] = useState('') //보류
    
    //bottomSheet 컴포넌트 사용될 useState
    const [text,setText] = useState(false)

    useEffect(() => {
        setIsClient(true);
        if(!planDataState.siteList){
            setText(true)
        }
      }, []);
    
    if (!isClient) {
        return <p>Loading...</p>;
    }
    
    return (
    <>
      {planDataState && (
        <div style={{ width: '360px', margin: '0 auto' }}>
          <TitleHeader title={planDataState.title} />
          <KakaoMapNoSSR />
          <div
            style={{
              width: '320px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                margin: '24px 0 44px 0',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ color: '#777777', fontSize: '14px' }}>
                  {planDataState.startDate}
                </p>
                <p style={{ fontWeight: '600', fontSize: '16px' }}>1일째</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: '#777777', fontSize: '14px' }}>가계부</p>
                <Toggle />
              </div>
            </div>
            {text && !planDataState.siteList ? (
              <div
                className="relative inline-block bg-blue-100 text-blue-700 rounded-md px-4 py-2"
                style={{ margin: '25px 0 25px 0' }}
              >
                <p>
                  여행의 첫 장소를 골라주세요!{' '}
                  <span className="inline-block">👣</span>
                </p>
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-15px] w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[17px] border-t-blue-100 " />
              </div>
            ):
            <>
              {planDataState && planDataState.siteList.map((site:Site,index) => (
                <div onClick={()=>selectCardId === site.id ? setSelectCardId(0) : setSelectCardId(site.id)} key={site.id}>
                  <PlaceCard color={cardColor[index]} site={site} selectCardId={selectCardId} index={index + 1}/>
                </div>
              ))}
            </>
            }
            <div className={'w-full'} onClick={() => setText(false)}>
              <BottomSheet />
            </div>
            <Button
              value={'다음날 추가하기'}
              color="0D77E0"
              className={'w-full mb-3 bg-white border border-[#C8C8C8] border-[1px]'}
            />
          </div>
        </div>
      )}
    </>
    )
}; 

export default PlanEdit;