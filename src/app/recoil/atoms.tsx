import { atom } from 'recoil'
import { recoilPersist } from "recoil-persist";
import { SignUpState, UpdatePasswordState } from './type';


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