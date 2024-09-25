'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Title from '@/components/login/images/title_blue.svg';
import Cancell from '@/components/login/images/CancelIcon.svg';
import Checkbox from '@/components/login/images/checkbox.svg';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';

const Email: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const setLoginState = useSetRecoilState(isLoginState);
  

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}login`, {
        email,
        password,
      });

      const accessToken = response.headers['authorization'];
      const refreshToken = response.headers['authorization-refresh'];
      const userId = response.data.userId;
      console.log("아이디:", userId)

      if (keepLoggedIn) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }

      // 로그인 상태 및 사용자 ID 업데이트
      setLoginState({
        isLogin: true, // 로그인 상태 true로 설정
        userId: userId, // 사용자 ID 설정
      });


      // 로그인 성공 후 페이지 이동
      router.push(`/plan`);
      
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  const nextPage = () => {
    router.push(`/login/email/signup`);
  };

  const updatePasswordPage = () => {
    router.push(`/login/updatePassword`);
  };

  return (
    <>
      <Head>
        <title>여수로</title>
        <meta name="description" content="여수 자전거 여행" />
      </Head>
      <div style={styles.container}>
        <div style={{width:'320px',margin:'0 auto'}}>
          <div style={{textAlign:'center',position:'relative'}}>
            <button style={styles.closeButton}><Cancell /></button>
            <p style={styles.subtitle}>이메일로 시작하기</p>
          </div>
          <div style={styles.title}><Title /></div>
          <input 
            style={styles.textInput} 
            type="email" 
            placeholder="이메일" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            style={styles.textInput} 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={styles.optionsContainer}>
            <label style={styles.checkboxLabel}>
              <button 
                onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                style={styles.checkboxButton}
              >
                <Checkbox 
                  style={{
                    fill: keepLoggedIn ? '#0D77E0' : '#d1d1d1', // 상태에 따른 색상 변경
                  }}
                />
              </button>
              <span style={styles.checkText}>로그인 유지</span>
            </label>
            <p onClick={updatePasswordPage} style={styles.findPassword}>비밀번호 찾기</p>
          </div>
          <button style={styles.loginButton} onClick={handleLogin}>
            로그인
          </button>
          <div style={styles.signupContainer}>
            <p style={styles.signupText}>아직 회원이 아니시라면?</p>
            <p onClick={nextPage} style={styles.signupLink}>회원가입</p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position:'absolute' as 'absolute',
    left:'0',
    top:'0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  }, 
  title: {
    margin:'0 auto',
    width:'126px',
    padding:'48px 0'
  },
  subtitle: {
    fontWeight: 600,
    fontFamily:'Pretendard, sans-serif',
    fontSize: '16px',
    marginBottom: '24px',
  },
  textInput: {
    width: '100%',
    height: '44px',
    padding: '10px 12px',
    background:'#efefef',
    borderRadius: '4px',
    border: 'none',
    marginBottom: '16px',
    fontSize: '14px',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  checkText: {
    color:'#777777',
    fontSize:'14px',
  },
  findPassword: {
    fontSize: '14px',
    color: '#777777',
    cursor: 'pointer',
  },
  loginButton: {
    width:'100%',
    height:'48px',
    backgroundColor: '#0D77E0',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Pretendard, sans-serif',
    fontWeight: 'bold' as 'bold',
    marginBottom: '24px',
  },
  signupContainer: {
    display:'flex',
    justifyContent:'space-between'
  },
  signupText: {
    fontSize: '14px',
    marginBottom: '8px',
    color: '#949494'
  },
  signupLink: {
    fontSize: '14px',
    color: '#000000',
    cursor: 'pointer',
  },
  checkboxButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    borderRadius: '4px', // 버튼에 둥근 모서리 추가 (옵션)
    width: '24px', // 버튼 크기 조정
    height: '24px',
  },
};

export default Email;
