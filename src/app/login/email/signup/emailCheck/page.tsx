'use client'

import React from 'react';
import Head from 'next/head';
import Checkbox from '@/features/login/images/checkbox.svg';
import BackIcon from '@/features/login/images/backIcon.svg';
import CancelIcon from '@/features/login/images/CancelIcon.svg';
import { useRouter } from "next/navigation";
import { CSSProperties } from 'react';
const Home: React.FC = () => {

  const router = useRouter();
  const nextPage = () => {
      router.push(`/login/email/signup/passwordCheck`);
  }

  return (
    <>
      <Head>
        <title>여수로</title>
        <meta name="description" content="여수 자전거 여행" />
      </Head>
      <div style={styles.container}>
        <div style={{width:'320px',margin:'0 auto'}}>
            <div style={styles.headerBox}>
                <BackIcon style={styles.backIcon}/>
                <CancelIcon />
            </div>
            <p style={styles.welcomeText}>우선 가입하실 계정부터<br/>적어주세요</p>
            <div style={styles.inputboxContainer}>
                <p>이메일</p>
                <div style={styles.textInputBox}>
                    <input style={styles.textInput} type="email" placeholder="이메일"/>
                    <button style={styles.authButton}>인증</button>
                </div>
                <div style={styles.textInputBox}>
                    <input style={styles.textInput} type="password" placeholder="인증번호 입력"/>
                </div>
            </div>
            <button onClick={nextPage} style={styles.nextButton}>다음</button>
        </div>
      </div>
    </>
  );
};

const styles: any = {
  container: {
    width: '360px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin:'0 auto',
  },
  backIcon:{
    padding:'0',
  },
  headerBox:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },
  welcomeText: {
    color: '#1f1f1f',
    fontWeight: 600,
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '20px',
    margin: '24px 0',
    lineHeight: '140%',
    letterSpacing: '-0.011em',
  },
  textInputBox:{
    width: '100%',
    height: '44px',
    position:'relative',
    background:'#efefef',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
  },
  textInput: {
    width: '100%',
    height: '44px',
    background:'none',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    padding: '0 12px'
  },
  authButton:{
    width:'60px',
    height:'32px',
    background:'#0D77E0',
    color:'white',
    position:'absolute',
    right:'6px',
    top:'6px',
    fontSize:'14px',
    fontWeight:'600',
    borderRadius:'4px',
  },
  inputboxContainer: {
    fontFamily:'Pretendard, sans-serif',
    marginBottom: '245px',
    display:'flex',
    flexDirection:'column',
    gap:'12px',
  },
  nextButton: {
    width:'100%',
    height:'48px',
    backgroundColor: '#0D77E0',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Pretendard, sans-serif',
    fontWeight: 'bold' as 'bold',
  },
};

export default Home;
