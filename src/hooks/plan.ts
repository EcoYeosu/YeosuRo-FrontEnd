import { api } from "@/apis"
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

