import { create } from 'zustand';

interface ICommunityState {
  category: string;
  setCategory: (category: string) => void;
}

const useCommunityStore = create<ICommunityState>((set) => ({
  category: 'travel',
  setCategory: (category) => set({ category }),
}));

export default useCommunityStore;