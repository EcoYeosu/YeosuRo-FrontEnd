'use client';

import ListHeader from '@/features/plan/components/headers/ListHeader'
import MyPlanCard from '@/features/plan/components/card/MyPlanCard'
import AddPlanCard from '@/features/plan/components/card/AddPlanCard'
import { useGetPlanList } from '@/features/plan/hooks/useGetPlanList';
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';
import { editPageData } from '../recoil/atoms';
  
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
    const addPage = () => {
        router.push(`/plan/add`);
    }

    const setSiteList = useSetRecoilState(editPageData); // 상태 설정만

    const saveList = (siteList:Site[]) => {
      setSiteList(siteList);  // Recoil에 siteList 저장
    };
    const editPage = (siteList:Site[]) => {
      saveList(siteList)
      router.push(`/plan/edit`);
    }

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
                    editPage={()=>editPage(item.siteList)}
                    />
                )}
                <AddPlanCard onClick={addPage}/>
            </div>
        </div>
    )
};

export default Plan;