import { api } from "@/apis"
import { useQuery } from "@tanstack/react-query"
import { ICommunityDetail } from "../../types/communityType"

export const useGetCommunityDetailList = (id: number) => {
  return useQuery<ICommunityDetail>({
    queryKey: ['communityDetail', id],
    queryFn: () => api.get<ICommunityDetail>(`/feeds/${id}`)
  })
}