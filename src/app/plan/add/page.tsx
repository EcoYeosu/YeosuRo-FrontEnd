'use client'

import { useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState  } from 'recoil';
import { allPlanData, planData, siteData, postPlanData } from '@/recoil/atoms';
import MakeHeader from '@/components/plan/headers/MakeHeader'
import Button from '@/components/common/buttons/Button'
import '@/styles/calendar.css';
import Calendar from '@/components/plan/calendar/Calendar'
import { useRouter } from "next/navigation";

const PlanSelectDay = () => {

    const [ title, setTitle]  = useState('')
    const [ date, setDate]  = useState('')
    
    const resetAllPlanData = useResetRecoilState(allPlanData);
    const resetSiteData = useResetRecoilState(siteData);
    const resetPlanData = useResetRecoilState(planData);

    const setRecoil = useSetRecoilState(postPlanData);
    
    const router = useRouter();
    const nextPage = () => {
        setRecoil((prevData) => ({
            ...prevData,
            title: title,
            startDate: date,
            endDate: date,
        }));
        router.push(`/plan/add/free`);
    }
    useEffect(()=>{
        resetAllPlanData();
        resetSiteData();
        resetPlanData();
    },[])

    return (
        <div style={{ width: '360px', margin:'0 auto' }}>
            <MakeHeader title={'일정 제작 시작하기'}/>
            <div style={{ width: '320px', margin:'0 auto'}}>
                <p className='font-semibold' style={{fontSize:'20px'}}>여행 일정을 먼저<br/>정해볼까요?</p>
                <Calendar setTitle={setTitle} setDate={setDate} />
                <Button value={'다음'} className={'w-full'} onClick={nextPage}/>
            </div>
        </div>
    )
}; 

export default PlanSelectDay;