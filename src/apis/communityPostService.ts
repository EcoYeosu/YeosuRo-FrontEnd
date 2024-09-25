import { api } from './index';
//import axios from 'axios';

// // 게시글 목록을 가져오는 함수
// export const fetchCommunityPosts = async () => {
//     const response = await api.get('/feeds'); 
//     return response.data;
// };

// 새 게시글을 생성하는 함수
export const createCommunityPost = async (newPost: { title: string; content: string }) => {
    const response = await api.post('/posts', newPost); 
    return response.data;
};

// 카테고리별 게시글을 가져오는 함수
export const fetchCommunityPostsByCategory = async (category: string) => {
    const response = await api.get(`/feeds/category/${category}`);
    return response.data.data; // 서버에서 받아온 'data' 속성을 반환
};