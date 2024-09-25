import { atom, atomFamily } from 'recoil';
import { recoilPersist } from "recoil-persist";
import { PlanData, Site, PostPlanData } from '@/type/plan';
import { SignUpState, UpdatePasswordState, PostFeedState, LoginState, FeedState } from './type';

const { persistAtom } = recoilPersist({
    key: "yeosuro",
    storage: typeof window !== 'undefined' ? sessionStorage : undefined,
});

// 로그인 상태 관리
export const isLoginState = atom<LoginState>({
    key: 'isLoginState',
    default: {
        isLogin: false,
        userId: undefined,
    },
    effects_UNSTABLE: [persistAtom],
});

// 회원가입 상태 관리
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

// 비밀번호 업데이트 상태 관리
export const updatePasswordState = atom<UpdatePasswordState>({
    key: 'updatePasswordState',
    default: {
      email: undefined,
      password: undefined,
    },
    effects_UNSTABLE: [persistAtom],
});

// 여행 계획 상태 관리
export const allPlanData = atom<PlanData[]>({
    key: 'allPlanData',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// 사이트 정보 상태 관리
export const siteData = atom<Site>({
    key: 'siteData',
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
    },
    effects_UNSTABLE: [persistAtom],
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

// 피드 작성 상태 관리
export const postFeedState = atom<PostFeedState>({
    key: 'postFeedState',
    default:{
        feedCategory: undefined,
        imageUrls: [],
    },
    effects_UNSTABLE: [persistAtom],
});

export const postPlanData = atom<PostPlanData>({
    key: 'postPlanData',
    default:{
        title: '',
        content: '',
        startDate: '',
        endDate: '',
        sites:[],
    },
    effects_UNSTABLE: [persistAtom],
});
// 게시글 상세 상태 관리 (동적 상태: 각 feedId 별로 관리)
export const isFeedState = atomFamily<FeedState, number>({
    key: 'isFeedState',
    default: {
      isLikedState: false, // 기본값: 좋아요 안 눌린 상태
      isStoredState: false, // 기본값: 저장 안된 상태
    },
    effects_UNSTABLE: [persistAtom],
  });
