// import { api } from "@/apis";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

// type TFeedsRequestParams = { id: number };

// export const useDeleteFeeds = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   return useMutation({
//     mutationFn: ({id}: TFeedsRequestParams) => api.delete(`/feeds/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['communDetail'] });
//       router.push(`/community`);
//     },
//   });
// }