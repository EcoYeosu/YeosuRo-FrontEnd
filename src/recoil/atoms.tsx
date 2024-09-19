import { atom } from 'recoil'
import { recoilPersist } from "recoil-persist";
import { SignUpState, UpdatePasswordState, Site, PostFeedState, LoginState } from './type';


const { persistAtom } = recoilPersist({
    key: "yeosuro",
    storage: typeof window !== 'undefined' ? sessionStorage : undefined,
});

export const isLoginState = atom<LoginState>({
    key: 'isLoginState',
    default: {
        isLogin: false,
        userId: undefined,
    },
    effects_UNSTABLE: [persistAtom],
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

export const editPageData = atom<Site[]>({
    key: 'editPageData',
    default: [],
});
export const updatePasswordState = atom<UpdatePasswordState>({
    key: 'updatePasswordState',
    default: {
      email: undefined,
      password: undefined,
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
