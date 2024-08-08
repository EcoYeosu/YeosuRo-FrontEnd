export interface ICommunity {
  id: number;
  title: string;
  createAt: string;
  modifiedAt: string;
  feedCategory: string;
  imageUrl: string;
  likesCount: number;
  memberID: number;
  nickname: string;
  profileImageUrl: string;
  repliesCount: number;
  tier: string;
}

export interface IReply {
  id: number;
  feedID: number;
  content: string;
  createAt: string;
  modifiedAt: string;
  memberID: number;
  nickname: string;
  profileImageUrl: string;
  tier: string;
}

export interface ICommunityDetail {
  id: number;
  title: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  feedCategory: string;
  imageUrl: string;
  likesCount: number;
  memberID: number;
  nickname: string;
  profileImageUrl: string;
  replies: IReply[];
  repliesCount: number;
  tier: string;
  view: number;
}