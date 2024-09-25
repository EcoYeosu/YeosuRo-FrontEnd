'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import CheckboxIcon from '@/components/login/images/checkbox.svg';
import BackIcon from '@/components/login/images/backIcon.svg';
import NextIcon from '@/components/login/images/nextIcon.svg';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUp: React.FC = () => {
  const router = useRouter();

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const handleAgreeAll = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    setAgreePrivacy(newAgreeAll);
    setAgreeTerms(newAgreeAll);
    setAgreeMarketing(newAgreeAll);
  };

  const nextPage = async () => {
    if (agreePrivacy && agreeTerms) {
      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}login/oauth`, agreeMarketing, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        const accessToken = response.headers['authorization']; // 첫 글자 대문자 확인
        const refreshToken = response.headers['authorization-refresh']; // 첫 글자 대문자 확인

        localStorage.setItem('authorization', accessToken);
        localStorage.setItem('authorization-Refresh', refreshToken);

        router.push(`/home`);
      } catch (error) {
        alert('네트워크 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
        console.error(error);
      }
    } else {
      alert('필수 약관에 동의해야 합니다.');
    }
  };

  return (
    <>
      <Head>
        <title>여수로</title>
        <meta name="description" content="여수 자전거 여행" />
      </Head>
      <div style={styles.container}>
        <div style={{ width: '320px', margin: '0 auto' }}>
          <div>
            <BackIcon style={styles.backIcon} />
          </div>
          <p style={styles.welcomeText}>여수로에 오신 것을<br /> 환영해요! 👋</p>
          <div style={styles.checkboxContainer}>
            <div style={styles.allAgree} onClick={handleAgreeAll}>
              <p>전체 동의</p>
              <CheckboxIcon style={agreeAll ? styles.checked : styles.unchecked} />
            </div>

            <label style={styles.checkboxLabel}>
              <span style={styles.checkboxText}>
                <p style={{ color: '#EF4747', marginRight: '6px' }}>(필수)</p>
                개인정보 수집 및 이용 동의
                <div style={styles.nextIcon}>
                  <NextIcon />
                </div>
              </span>
              <div onClick={() => setAgreePrivacy(!agreePrivacy)} style={{ cursor: 'pointer' }}>
                <CheckboxIcon style={agreePrivacy ? styles.checked : styles.unchecked} />
              </div>
            </label>

            <label style={styles.checkboxLabel}>
              <span style={styles.checkboxText}>
                <p style={{ color: '#EF4747', marginRight: '6px' }}>(필수)</p>
                이용약관 동의
                <div style={styles.nextIcon}>
                  <NextIcon />
                </div>
              </span>
              <div onClick={() => setAgreeTerms(!agreeTerms)} style={{ cursor: 'pointer' }}>
                <CheckboxIcon style={agreeTerms ? styles.checked : styles.unchecked} />
              </div>
            </label>

            <label style={styles.checkboxLabel}>
              <span style={styles.checkboxText}>
                <p style={{ marginRight: '6px' }}>(선택)</p>
                마케팅 정보 수신 동의
                <div style={styles.nextIcon}>
                  <NextIcon />
                </div>
              </span>
              <div onClick={() => setAgreeMarketing(!agreeMarketing)} style={{ cursor: 'pointer' }}>
                <CheckboxIcon style={agreeMarketing ? styles.checked : styles.unchecked} />
              </div>
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
    margin: '0 auto',
  },
  backIcon: {
    padding: '0',
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
  allAgree: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12px',
    marginBottom: '12px',
    color: '#777777',
    fontSize: '14px',
    cursor: 'pointer',
    borderBottom: '1px solid #dfdfdf',
  },
  checkboxContainer: {
    marginTop: '250px',
    marginBottom: '40px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    cursor: 'pointer',
    color: '#777777',
    fontSize: '14px',
  },
  checkboxText: {
    fontSize: '14px',
    fontFamily: 'Pretendard, sans-serif',
    display: 'flex',
    alignItems: 'center',
  },
  nextIcon: {
    marginLeft: '13.5px',
  },
  checked: {
    fill: '#0D77E0',
  },
  unchecked: {
    fill: '#CCCCCC',
  },
  nextButton: {
    width: '100%',
    height: '48px',
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
