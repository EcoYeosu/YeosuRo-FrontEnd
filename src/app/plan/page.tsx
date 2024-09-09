'use client';

import ListHeader from '@/features/plan/components/headers/ListHeader'
import MyPlanCard from '@/features/plan/components/card/MyPlanCard'
import AddPlanCard from '@/features/plan/components/card/AddPlanCard'
import { useGetPlanList } from '@/features/plan/hooks/useGetPlanList';
import { useRouter } from "next/navigation";
  
const Plan = () => {

    interface Site {
        id: number;
        category: string;
        memo: string;
        latitude: string;
        longitude: string;
        address: string;
        visitDate: string;
        startTime: string | null;
        endTime: string | null;
      }
      
      // 전체 여행 플랜 데이터를 나타내는 타입
      interface Plan {
        userId: number;
        title: string;
        content: string;
        createAt: string;
        startDate: string;
        endDate: string;
        siteList: Site[]; // Site 배열
      }

    const router = useRouter();
    const nextPage = () => {
        router.push(`/plan/edit`);
    }
    // const editPage = (userId: number, Site: Site[]) => {
    
    //     router.push({
    //         pathname: `/plan/edit?planId=${item.userId}`, // 경로에 planId 추가
    //         query: {
    //             userId: userId.toString(),  // userId를 문자열로 변환
    //             id: Site.id.toString(),  // id를 문자열로 변환
    //             memo: Site.memo || '',  // memo가 null일 경우 빈 문자열로 처리
    //             latitude: Site.latitude || '',  // latitude가 null일 경우 빈 문자열로 처리
    //             longitude: Site.longitude || '',  // longitude가 null일 경우 빈 문자열로 처리
    //             address: Site.address || '',  // address가 null일 경우 빈 문자열로 처리
    //             startTime: Site.startTime ? Site.startTime.toString() : '',  // startTime이 null일 경우 빈 문자열로 처리
    //             endTime: Site.endTime ? Site.endTime.toString() : '',  // endTime이 null일 경우 빈 문자열로 처리
    //         },
    //     });
    // };
    

    const { data, isLoading, error } = useGetPlanList();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div style={{ width: '360px', margin:'0 auto'}}>
            <ListHeader/>
            <div style={{display:'flex', flexDirection:'column', gap:'12px', alignItems:'center', marginTop:'24px'}}>
                {data && data.data.map((item:Plan) =>
                  <MyPlanCard 
                    title={item.title} 
                    startDate={item.startDate} 
                    endDate={item.endDate} 
                    key={item.userId}
                    // onClick={() => editPage(item.userId, item.siteList)}
                    />
                )}
                <AddPlanCard onClick={nextPage}/>
            </div>
        </div>
    )
};

export default Plan;