'use client'

import React from 'react';
import Head from 'next/head';
import Checkbox from '@/features/login/images/checkbox.svg';
import BackIcon from '@/features/login/images/backIcon.svg';
import NextIcon from '@/features/login/images/nextIcon.svg';
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {

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
            <div>
                <BackIcon style={styles.backIcon}/>
            </div>
            <p style={styles.welcomeText}>여수로에 오신 것을<br/> 환영해요! 👋</p>
            <div style={styles.checkboxContainer}>
                <div style={styles.allAgree}>
                    <p>전체동의</p>
                    <Checkbox />
                </div>
                <label style={styles.checkboxLabel}>
                    <span style={styles.checkboxText}>
                        <p style={{color:'#EF4747',marginRight:'6px'}}>(필수)</p>
                        개인정보 수집 및 이용 동의
                        <div style={styles.nextIcon}>    
                            <NextIcon />
                        </div>
                    </span>
                    <Checkbox />
                </label>
                <label style={styles.checkboxLabel}>
                    <span style={styles.checkboxText}>
                        <p style={{color:'#EF4747',marginRight:'6px'}}>(필수)</p>
                        이용약관 동의
                        <div style={styles.nextIcon}>    
                            <NextIcon />
                        </div>
                    </span>
                    <Checkbox />
                </label>
                <label style={styles.checkboxLabel}>
                    <span style={styles.checkboxText}>
                        <p style={{marginRight:'6px'}}>(필수)</p>
                        E-mail 마케팅 정보 수신 동의
                        <div style={styles.nextIcon}>    
                            <NextIcon />
                        </div>
                    </span>
                    <Checkbox />
                </label>
            </div>
            <button onClick={nextPage} style={styles.nextButton}>다음</button>
        </div>
      </div>
    </>
  );
};

const styles = {
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
  welcomeText: {
    color: '#1f1f1f',
    fontWeight: 600,
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '20px',
    margin: '24px 0',
    lineHeight: '140%',
    letterSpacing: '-0.011em',
  },
  allAgree:{
    width:'100%',
    display:'flex',
    borderBottom:'1px solid #dfdfdf',
    justifyContent:'space-between',
    paddingBottom:'12px',
    marginBottom:'12px',
    color:'#777777',
    fontSize:'14px',
  },
  checkboxContainer: {
    marginBottom: '24px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: '16px',
    cursor: 'pointer',
    color:'#777777',
    fontSize:'14px',
  },
  checkboxText: {
    fontSize: '14px',
    fontFamily:'Pretendard, sans-serif',
    display:'flex',
    alignItems:'center'
  },
  nextIcon:{
    marginLeft:'13.5px',
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

export default SignUp;
