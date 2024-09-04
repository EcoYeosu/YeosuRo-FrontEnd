'use client'

import MakeHeader from '@/features/plan/components/headers/MakeHeader'
import Button from '@/components/common/buttons/Button'
import '@/styles/calendar.css';
import Calendar from '@/features/plan/components/calendar/Calendar'
import { useRouter } from "next/navigation";

const PlanSelectDay = () => {

    const router = useRouter();
    const nextPage = () => {
        router.push(`/plan/add/type`);
    }

    return (
        <div style={{ width: '360px', margin:'0 auto' }}>
            <MakeHeader title={'일정 제작 시작하기'}/>
            <div style={{ width: '320px', margin:'0 auto'}}>
                <p className='font-semibold' style={{fontSize:'20px'}}>여행 일정을 먼저<br/>정해볼까요?</p>
                <Calendar />
                <Button value={'다음'} className={'w-full'} onClick={nextPage}/>
            </div>
        </div>
    )
}; 

export default PlanSelectDay;