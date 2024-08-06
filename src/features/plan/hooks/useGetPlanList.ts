import { api } from "@/apis"
import { useQuery } from "@tanstack/react-query"

export const useGetPlanList = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => api.get(`/v1/plans`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzE4NzU5MCwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.xrIFBoWMWcGQzFqYZS_kE2qoX55ckfkgGznsWOCamOKmWq26wr4pySxQcCCTdqZ4OwgPywCyarH709ASPQCXJA`
      }
    })
  })
}