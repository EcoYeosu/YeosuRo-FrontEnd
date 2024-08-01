'use client';

import ListHeader from '@/features/plan/component/headers/ListHeader'
import MyPlanCard from '@/features/plan/component/MyPlanCard'
import AddPlanCard from '@/features/plan/component/AddPlanCard'
import { useQuery } from '@tanstack/react-query';
import HttpClient from '@/apis/httpClient';
import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


const ApiClient = HttpClient({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzE4NzU5MCwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.xrIFBoWMWcGQzFqYZS_kE2qoX55ckfkgGznsWOCamOKmWq26wr4pySxQcCCTdqZ4OwgPywCyarH709ASPQCXJA',
      },
  });
  const getPlanse = async () => {
    try {
        const response: AxiosResponse = await ApiClient.get('/v1/plans');
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
};


// 테스트
const ApiClientTest = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzE4NzU5MCwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.xrIFBoWMWcGQzFqYZS_kE2qoX55ckfkgGznsWOCamOKmWq26wr4pySxQcCCTdqZ4OwgPywCyarH709ASPQCXJA'
    },
  });
  
  const fetchPlans = async () => {
    try {
      const response: AxiosResponse = await ApiClientTest.get('/v1/plans');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
//-------------------

  
const MyPlan = () => {

    const { data, error } = useQuery({ queryKey: ['getPlans'], queryFn: fetchPlans });

    return (
        <div style={{ width: '360px', margin:'0 auto', border:'1px solid red' }}>
            <ListHeader />
            <div style={{display:'flex', flexDirection:'column', gap:'12px', alignItems:'center'}}>
                <MyPlanCard />
                <MyPlanCard />
                <MyPlanCard />
                <MyPlanCard />
                <MyPlanCard />
                <MyPlanCard />
                <MyPlanCard />
                <AddPlanCard />
            </div>
        </div>
    )
};

export default MyPlan