export interface LoginState {
    isLogin: boolean | undefined;
    userId: number | undefined;
}

export interface SignUpState {
    email: string | undefined;
    password: string | undefined;
    nickname: string | undefined;
    agree: boolean | undefined;
}

export interface Site {
    id: number;
    category: string;
    memo: string;
    latitude: string;
    longitude: string;
    address: string;
    visitDate: string;
    startTime: string | null;
    endTime: string | null;
}

export interface Plan {
    userId: number;
    title: string;
    content: string;
    createAt: string;
    startDate: string;
    endDate: string;
    siteList: Site[];
}

export interface UpdatePasswordState {
    email: string | undefined;
    password: string | undefined;
}

export interface PostFeedState {
    feedCategory: string | undefined;
    imageUrls: string[];
}

export interface FeedState {
    isLikedState: boolean;
    isStoredState: boolean;
  }