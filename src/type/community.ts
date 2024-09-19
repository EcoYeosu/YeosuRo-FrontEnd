// 피드 상세 정보 타입
export interface Feed {
    id: number;
    title: string;
    content: string;
    imageUrls: string[];
    likesCount: number;
    view: number;
    storeCount: number;
    repliesCount: number;
    feedCategory: string;
    createAt: string;
    modifiedAt: string;
    memberID: number;
    nickname: string;
    profileImageUrl: string;
    tier: string;
  }
  
  // 커뮤니티 피드 목록 Props 타입
  export interface CommunityFeedListProps {
    feeds: Feed[];
  }
  
  // 피드 작성 상태 관리 타입
  export interface FeedState {
    feedCategory: string | undefined;
    imageUrls: string[];
    title: string;
    content: string;
  }
  
  // 피드 상세 정보 타입
  export interface FeedDetail {
    id: number;
    title: string;
    content: string;
    imageUrls: string[];
    view: number;
    likesCount: number;
    storeCount: number;
    repliesCount: number;
    feedCategory: string;
    createAt: string;
    modifiedAt: string;
    memberID: number;
    nickname: string;
    profileImageUrl: string;
    tier: string;
    replies: Reply[];
  }
  
  // 댓글 타입
  export interface Reply {
    id: number;
    feedID: number;
    content: string;
    likesCount: number;
    createAt: string;
    modifiedAt: string;
    memberID: number;
    nickname: string;
    profileImageUrl: string;
    tier: string;
  }