'use client'

import React from 'react';
import Head from 'next/head';
import BackIcon from '@/features/login/images/backIcon.svg';
import CancelIcon from '@/features/login/images/CancelIcon.svg';
import CheckIcon from '@/features/login/images/checkIcon.svg';
import BlindIcon from '@/features/login/images/blindIcon.svg';
import VisibleIcon from '@/features/login/images/visibleIcon.svg';
import { useRouter } from "next/navigation";

const PasswordCheck: React.FC = () => {

  const router = useRouter();
  const nextPage = () => {
      router.push(`/login/email/signup/emailCheck`);
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
            <p style={styles.welcomeText}>로그인에 사용할<br/>비밀번호를 작성해주세요</p>
            <div style={styles.inputboxContainer}>
                <p>비밀번호</p>
                <div style={styles.textInputBox}>
                    <input style={styles.textInput} type="email" placeholder="비밀번호를 입력하세요."/>
                    <BlindIcon style={styles.blindButton} />
                </div>
                <div style={styles.checkText}>
                  <CheckIcon />
                  <p>영문과 숫자 포함</p>
                </div>
                <div style={styles.checkText}>
                  <CheckIcon />
                  <p>8자 이상</p>
                </div>
            </div>
            <button style={styles.nextButton}>다음</button>
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
    margin: '24px 0 32px 0',
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
  blindButton:{
    position:'absolute',
    right:'12px',
    top:'12px',
    cursor:'pointer',
  },
  checkText:{
    color:'#949494',
    fontSize:'12px',
    display:'flex',
    alignItems:'center',
    gap:'8px',
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

export default PasswordCheck;
