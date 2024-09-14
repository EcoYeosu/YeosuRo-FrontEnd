'use client'

import MakeHeader from '@/components/plan/headers/MakeHeader'
import Button from '@/components/common/buttons/Button'
import { useRouter } from "next/navigation";

const PlanType = () => {

    // const router = useRouter();
    // const nextPage = () => {
    //     router.push(`/plan/add/type/free`);
    // }

    return (
        <div style={{ width: '360px', margin:'0 auto' }}>
            <MakeHeader title={'일정 제작 시작하기'}/>
            <div style={{ width: '320px', margin:'0 auto'}}>
                <p className='font-semibold' style={{fontSize:'20px'}}>여행 제작 방법을<br/>선택해주세요</p>
                <div style={{width:'320px',height:'110px',padding:'20px',border:'1px solid #c8c8c8', background:'#fafafa', borderRadius:'8px',margin:'24px 0 12px 0'}}>
                    <p className='font-semibold' style={{fontSize:'16px', letterSpacing: '-1.1px',lineHeight:'140%'}}>키워드 선택으로 여정 추천받기</p>
                    <p className='font-normal' style={{fontSize:'16px',letterSpacing: '-1.1px',lineHeight:'140%'}}>여수로 여행을 가고 싶다만 생각<br />파워P들에게 강추</p>
                </div>
                <div style={{width:'320px',height:'110px',padding:'20px',border:'1px solid #c8c8c8', background:'#fafafa', borderRadius:'8px',marginBottom:'12px'}}>
                    <p className='font-semibold' style={{fontSize:'16px', letterSpacing: '-1.1px',lineHeight:'140%'}}>직접 여정 작성하기</p>
                    <p className='font-normal' style={{fontSize:'16px',letterSpacing: '-1.1px',lineHeight:'140%'}}>A부터 Z까지 직접 만드는 여정<br />이미 갈 곳이 다 정해져있으면 추천</p>
                </div>
                {/* <div onClick={nextPage}>
                    <Button value={'다음'} className={'w-full'}/>
                </div> */}
            </div>
        </div>
    )
}; 

export default PlanType;