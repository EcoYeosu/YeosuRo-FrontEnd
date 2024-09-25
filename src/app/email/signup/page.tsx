'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import CheckboxIcon from '@/components/login/images/checkbox.svg'; // 단일 체크박스 SVG
import BackIcon from '@/components/login/images/backIcon.svg';
import NextIcon from '@/components/login/images/nextIcon.svg';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { signUpState } from '@/recoil/atoms';

const SignUp: React.FC = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useRecoilState(signUpState);

  // 각각의 동의 상태
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // 전체 동의 클릭 시
  const handleAgreeAll = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    setAgreePrivacy(newAgreeAll);
    setAgreeTerms(newAgreeAll);
    setAgreeMarketing(newAgreeAll);
  };

  // 다음 페이지로 이동
  const nextPage = () => {
    if (agreePrivacy && agreeTerms) {
      setSignUp((prevState) => ({
        ...prevState,
        agree: agreeMarketing, // 마케팅 정보 동의 여부 저장
      }));
      router.push(`/login/email/signup/emailCheck`);
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
            {/* 전체 동의 */}
            <div style={styles.allAgree} onClick={handleAgreeAll}>
              <p>전체 동의</p>
              <CheckboxIcon style={agreeAll ? styles.checked : styles.unchecked} />
            </div>

            {/* 개인정보 수집 및 이용 동의 */}
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

            {/* 이용약관 동의 */}
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

            {/* 마케팅 정보 수신 동의 */}
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

          {/* 다음 버튼 */}
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
    marginTop : '250px',
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
    fill: '#0D77E0',  // 체크 상태일 때 색상
  },
  unchecked: {
    fill: '#CCCCCC',  // 체크 해제 상태일 때 색상
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
