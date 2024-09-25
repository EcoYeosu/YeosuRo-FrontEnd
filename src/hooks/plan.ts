import { api } from "@/apis"
import HttpClient from "@/apis/httpClient";
import { useQuery } from "@tanstack/react-query"


// 여정 리스트 조회
export const useGetPlanList = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => { 
      const response = api.get(`/v1/plans`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyODIyMzc3OSwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.ATc0NBRK5gkhxbhbJunkTzf0KASUZRIJ5mXZk0JmsmGkQ1UZC7PU3O56HraVewm-kS-BvrPErWdSIQWR9mN2Xw`
      }
    });
    return response
  }})
}

// 장소 키워드 검색
export const useGetPlaceList = (keyWord: string, enabled:boolean) => {
  const api = HttpClient({
    baseURL: 'http://apis.data.go.kr/B551011/KorService1'
  });
  return useQuery({
    queryKey: ['keywords', keyWord],
    queryFn: () => {
      const serviceKey = process.env.NEXT_PUBLIC_DATA_API_KEY;
      const url = `/searchKeyword1?serviceKey=${serviceKey}&numOfRows=10&areaCode=38&sigunguCode=12&keyword=${keyWord}&pageNo=1&MobileOS=ETC&MobileApp=appName&_type=json`;
      return api.get(url);
    },
    enabled,
  });
};



