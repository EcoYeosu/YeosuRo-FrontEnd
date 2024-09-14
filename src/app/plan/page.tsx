'use client';

import ListHeader from '@/components/plan/headers/ListHeader'
import MyPlanCard from '@/components/plan/card/MyPlanCard'
import AddPlanCard from '@/components/plan/card/AddPlanCard'
import { useGetPlanList } from '@/hooks/plan';
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';
import { editPageData } from '@/recoil/atoms';
import { SiteList, PlanData } from '@/type/plan';
  
const Plan = () => {

    const router = useRouter();
    const addPage = () => {
        router.push(`/plan/add`);
    }

    const setSiteList = useSetRecoilState(editPageData);

    const saveList = (siteList:SiteList[]) => {
      setSiteList(siteList);
    };
    const editPage = (siteList:SiteList[]) => {
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
                {data && data.data.map((item:PlanData) =>
                  <MyPlanCard 
                    title={item.title} 
                    startDate={item.startDate} 
                    endDate={item.endDate} 
                    key={item.userId}
                    editPage={()=>editPage(item.siteList)}
                    siteList={item.siteList}
                    />
                )}
                <AddPlanCard onClick={addPage} />
            </div>
        </div>
    )
};

export default Plan;