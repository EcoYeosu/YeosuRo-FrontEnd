export interface SignUpState {
    email: string | undefined;
    password: string | undefined;
    nickname: string | undefined;
    agree: Boolean | undefined;
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