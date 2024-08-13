import { api } from "@/apis"
import { useQuery } from "@tanstack/react-query"

export const useGetPlanList = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => api.get(`/v1/plans`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyNDk0MTM4NywiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.orvswzhmXQmMg67qGJ-OAP5Gm1eVswGKXUMhu8mSCYUnka-WWLpPG7aotRn9qTF8iY8kHJIZqmXTrXvzrH78Lg`
      }
    })
  })
}