'use client'

import React from 'react';
import Head from 'next/head';
import { useRouter } from "next/navigation";
import Image from 'next/image'; // next/image 사용
import checkImage from '@/components/login/images/checkIcon.svg';

const Complete: React.FC = () => {

  const router = useRouter();
  const nextPage = () => {
    router.push(`/login/email`);
  }

  return (
    <>
      <Head>
        <title>여수로</title>
        <meta name="description" content="여수 자전거 여행" />
      </Head>
      <div style={styles.container}>
        <div style={{width:'320px',margin:'0 auto'}}>
          <div style={styles.headerBox}></div>
          
          <p style={styles.welcomeText}>비밀번호 재설정이 <br />완료됐어요 😉</p>
          
          <div style={styles.imageWrapper}>
            <Image
              src={checkImage}
              alt="Check Icon"
              width={150}
              height={150}
              style={styles.image}
            />
          </div>

          <button onClick={nextPage} style={styles.nextButton}>로그인 화면으로 돌아가기</button>
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
  headerBox: {
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
    marginBottom: '40px',
    marginTop: '40px',
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'contain',
    marginBottom: '100px',
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

export default Complete;
