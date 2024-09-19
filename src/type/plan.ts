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

export interface PlanData {
    userId: number;
    title: string;
    content: string;
    createAt: string;
    startDate: string;
    endDate: string;
    siteList: Site[];
    planId:number;
}

export type CardProps = {
    title? : string,
    startDate? : string,
    endDate? : string,
    editPage?: () => void;
    siteList?: Site[]
}