import { atom } from 'recoil'
import { recoilPersist } from "recoil-persist";
import { SignUpState } from './type';


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