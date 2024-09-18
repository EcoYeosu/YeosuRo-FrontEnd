export interface Post {
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

export interface CommunityPostListProps {
    posts: Post[];
}

export interface Post {
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
  
  export interface PostFeedState {
    feedCategory: string | undefined;
    imageUrls: string[];
    title: string;
    content: string;
  }