import { api } from "@/apis"
import { useQuery } from "@tanstack/react-query"
import { ICommunity } from "../../types/communityType"

export const useGetCommunityList = (category:string | string[]) => {
  return useQuery<ICommunity[]>({
    queryKey: ['community', category],
    queryFn: () => api.get<ICommunity[]>(`/feeds/category/${category}`)
  })
}