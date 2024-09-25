'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';

const OAuthCallback: React.FC = () => {
  const router = useRouter();
  const setLoginState = useSetRecoilState(isLoginState); 

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}login/oauth/callback`, {
          withCredentials: true,
        });

        // 서버 응답에서 authorization 헤더로 토큰 받기
        const accessToken = response.headers['authorization']; 
        const refreshToken = response.headers['authorization-refresh']; 
        const userId = response.data.userId;

        // 토큰을 로컬 스토리지에 저장
        if (accessToken) {
          localStorage.setItem('authorization', accessToken);

        }
        if (refreshToken) {
          localStorage.setItem('authorization-Refresh', refreshToken);
        }

        // 로그인 상태 및 사용자 ID 업데이트
        setLoginState({
          isLogin: true, // 로그인 상태 true로 설정
          userId: userId, // 사용자 ID 설정
        });

        // 홈 페이지로 리다이렉트
        router.push('/plan');
      } catch (error) {
        console.error('카카오 로그인 후 토큰 처리 중 오류 발생:', error);
        alert('로그인 처리 중 문제가 발생했습니다.');
        router.push('/login');
      }
    };

    // 페이지 로드 시 토큰 요청 함수 호출
    fetchTokens();
  }, [router]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
