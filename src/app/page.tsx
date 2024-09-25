'use client'

import React from 'react';
import Head from 'next/head';
import Title from '@/components/login/images/title_white.svg';
import Google from '@/components/login/images/google.svg';
import Kakao from '@/components/login/images/kakao.svg';
import Email from '@/components/login/images/email.svg';
import { useRouter } from "next/navigation";

const Login: React.FC = () => {

  const router = useRouter();
  const nextPage = () => {
      router.push(`/email`);
  }

  // 백엔드의 카카오 OAuth2 인증 경로로 로그인 요청
  const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}oauth2/authorization/kakao`;

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };


const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}oauth2/authorization/google`;

const googleLoginHandler = () => {
  window.location.href = GOOGLE_AUTH_URL;
};

  return (
    <>
      <Head>
        <title>여수로</title>
        <meta name="description" content="여수 자전거 여행" />
      </Head>
      <div style={styles.container}>
        <div style={{width:'320px',margin:'0 auto'}}>
            <button style={styles.closeButton}>×</button>
            <div style={styles.title}><Title /></div>
            <p style={styles.subtitle}>여수 자전거 여행의 더 많은 정보<br/> 확인하세요!</p>
            <div style={styles.buttonContainer}>
                <button onClick={googleLoginHandler} style={styles.googleButton}><Google style={styles.icon} />Google로 시작하기</button>
                <button onClick={loginHandler} style={styles.kakaoButton}><Kakao style={styles.icon} />카카오톡으로 시작하기</button>
                <button onClick={nextPage} style={styles.emailButton}><Email style={styles.icon2} />이메일로 시작하기</button>
            </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  icon:{
    margin:'0px 37px 0px 33px'
  },
  icon2:{
    margin:'0px 35px 0px 33px'
  },
  container: {
    width: '360px',
    backgroundColor: '#0D77E0',
    position: 'relative' as 'relative',
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '16px',
    left: '16px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: 'white',
    cursor: 'pointer',
  }, 
  title: {
    paddingTop: '80px',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#fafafa',
    fontSize: '20px',
    marginBottom: '40px',
    fontFamily:'Pretendard, sans-serif',
    fontWeight:550,
    lineHeight:'140%',
    letterSpacing:'-0.1em'
  },
  buttonContainer: {
    marginTop:'162px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '12px',
  },
  googleButton: {
    width:'320px',
    height:'48px',
    backgroundColor: 'white',
    fontFamily:'Pretendard, sans-serif',
    color: '#000',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  kakaoButton: {
    width:'320px',
    height:'48px',
    backgroundColor: '#F9DF4A',
    fontFamily:'Pretendard, sans-serif',
    color: '#000',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  emailButton: {
    width:'320px',
    height:'48px',
    backgroundColor: 'transparent',
    fontFamily:'Pretendard, sans-serif',
    color: 'white',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid white',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom:'20px'
  },
};

export default Login;
