import { api } from "@/apis"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ICommunity } from "../types/communityType"

interface ICommentRequest {
  feedId: number
  content: string
}
interface ICommentResponse {
  id: number
  memberID: number
  feedID: number
  content: string
  createAt: string
  modifiedAt: string
}
export const usePostCommnet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICommentRequest) => api.post<ICommentResponse>('/feeds/replies', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['communityDetail']})
  })
}