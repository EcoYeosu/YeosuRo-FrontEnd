import { atom } from 'recoil'
import { recoilPersist } from "recoil-persist";
import { PlanData,Site } from '@/type/plan'
import { SignUpState, UpdatePasswordState, Site, PostFeedState } from './type';


const { persistAtom } = recoilPersist({
    key: "yeosuro",
    storage: typeof window !== 'undefined' ? sessionStorage : undefined,
});

export const isLoginState = atom<boolean>({
    key: "isLogin",
    default: false,
});

export const signUpState = atom<SignUpState>({
    key: 'signUpState',
    default: {
      email: undefined,
      password: undefined,
      nickname: undefined,
      agree: undefined,
    },
    effects_UNSTABLE: [persistAtom],
});

export const updatePasswordState = atom<UpdatePasswordState>({
    key: 'updatePasswordState',
    default: {
      email: undefined,
      password: undefined,
    },
    effects_UNSTABLE: [persistAtom],
})

export const allPlanData = atom<PlanData[]>({
    key: 'allPlanData',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const siteData = atom<Site>({
    key: 'site',
    default:{
        id: 0,
        category: '',
        memo: '',
        latitude: '',
        longitude: '',
        address: '',
        visitDate: '',
        startTime: '',
        endTime: '',
});
  
export const planData = atom<PlanData>({
    key: 'planData',
    default:{
        userId: 0,
        title: '',
        content: '',
        createAt: '',
        startDate: '',
        endDate: '',
        siteList:[],
        planId:0,
    },
    effects_UNSTABLE: [persistAtom],
});

export const postFeedState = atom<PostFeedState>({
    key: 'postFeedState',
    default:{
        feedCategory: undefined,
        imageUrls: [],
    },
    effects_UNSTABLE: [persistAtom],
});
