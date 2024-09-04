'use client'

import React from 'react';
import Head from 'next/head';
import Title from '@/features/login/images/title_blue.svg';
import Cancell from '@/features/login/images/CancelIcon.svg';
import Checkbox from '@/features/login/images/checkbox.svg';
import { useRouter } from "next/navigation";

const Email: React.FC = () => {

  const router = useRouter();
  const nextPage = () => {
      router.push(`/login/email/signup`);
  }

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
            <input style={styles.textInput} type="email" placeholder="이메일"/>
            <input style={styles.textInput} type="password" placeholder="비밀번호"/>
            <div style={styles.optionsContainer}>
              <label style={styles.checkboxLabel}>
                <button><Checkbox /></button>
                <span style={styles.checkText}>로그인 유지</span>
              </label>
              <p style={styles.findPassword}>비밀번호 찾기</p>
            </div>
            <button style={styles.loginButton}>로그인</button>
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
};

export default Email;
