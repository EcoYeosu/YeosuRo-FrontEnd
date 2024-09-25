'use client'

import { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { postPlanData } from '@/recoil/atoms';
import Button from "@/components/common/buttons/Button";
import TitleHeader from "@/components/plan/headers/TitleHeader";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/common/kakao/KakaoMap";
import Toggle from "@/components/plan/toggle/toggle"
import BottomSheet from "@/components/common/bottomSheet/Bottomsheet";


const PlanTypeFree= () => {

    const [text,setText] = useState(true)

    const postData = useRecoilValue(postPlanData)

    
    const router = useRouter();
    const nextPage = () => {
        router.push(`/plan/add/free`);
    }
    
    return (
        <div style={{ width: '360px', margin:'0 auto' }}>
            <TitleHeader title={'혜진이랑 당일치기'}/>
            <KakaoMap />
            <div style={{ width: '320px', margin:'0 auto', display:'flex' ,flexDirection:'column',alignItems:'center'}}>
                <div style={{ width: '100%', marginTop:'24px', display:'flex',justifyContent:'space-between'}}>
                    <div>
                        <p style={{color:'#777777', fontSize:'14px'}}>{postData.startDate}</p>
                        <p style={{fontWeight:'600',fontSize:'16px'}}>1일째</p>
                    </div>
                    <div style={{ display:'flex',justifyContent:'space-between'}}>
                        <p style={{color:'#777777', fontSize:'14px'}}>가계부</p>
                        <Toggle />
                    </div>
                </div>
                {text && <div className="relative inline-block bg-blue-100 text-blue-700 rounded-md px-4 py-2" style={{margin:'25px 0 25px 0',width:'208px'}}>
                    <p style={{fontSize:'12px',lineHeight:'1.4',letterSpacing: '-0.15px'}}>
                        여행의 첫 장소를 골라주세요! <span className="inline-block">👣</span>
                    </p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-16px] w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[17px] border-t-blue-100 ">
                    </div>
                </div>}
                <div onClick={()=>setText(false)} className={'w-full'}>
                    <BottomSheet/>
                </div>
                <Button value={'다음날 추가하기'} color={'0D74DB'} className={'w-full bg-white border border-[#C8C8C8] border-[1px]' }/>
                <p style={{fontSize:'12px',lineHeight:'1.4',letterSpacing: '-0.15px',color:'#949494',marginTop:'24px'}}>공공자전거 여행, 처음이라 막막하신가요?</p>
            </div>
        </div>
    )
}; 

export default PlanTypeFree;