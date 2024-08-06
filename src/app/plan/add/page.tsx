import MakeHeader from '@/features/plan/components/headers/MakeHeader'
import Button from '@/components/common/buttons/Button'
import '@/styles/calendar.css';
import Calendar from '@/features/plan/components/calendar/Calendar'

const PlanAdd = () => {
    
    return (
        <div style={{ width: '360px', margin:'0 auto' }}>
            <MakeHeader title={'일정 제작 시작하기'}/>
            <div style={{ width: '320px', margin:'0 auto'}}>
                <p className='font-semibold' style={{fontSize:'20px'}}>여행 일정을 먼저<br/>정해볼까요?</p>
                <div className={`font-regular`} style={{ width: '100%',lineHeight:'44px', margin:'24px 0 12px 0', background:'#F6F6F6' }}>
                    <p style={{padding:'0 16px'}}>2023. 08. 17</p>
                </div>
                <Calendar />
                <Button value={'다음'} className={'w-full'}/>
            </div>
        </div>
    )
}; 

export default PlanAdd;