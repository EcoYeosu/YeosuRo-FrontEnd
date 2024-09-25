'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import BackIcon from '@/components/login/images/backIcon.svg';
import CancelIcon from '@/components/login/images/CancelIcon.svg';
import CheckIcon from '@/components/login/images/checkIcon.svg';
import BlindIcon from '@/components/login/images/blindIcon.svg';
import VisibleIcon from '@/components/login/images/visibleIcon.svg';
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';
import { signUpState } from '@/recoil/atoms';

const PasswordCheckPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const setUserState = useSetRecoilState(signUpState);

  const validatePassword = (password: string) => {
    setHasLetter(/[a-zA-Z]/.test(password));
    setHasNumber(/\d/.test(password));
    setIsLongEnough(password.length >= 8);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    setShowError(false); // 비밀번호 입력 시 에러 숨기기
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleNextClick = () => {
    if (hasLetter && hasNumber && isLongEnough) {
      setUserState((prevState) => ({
        ...prevState,
        password,
      }));
      router.push('/login/email/signup/nicknameCheck');
    } else {
      setShowError(true); // 조건이 만족하지 않으면 에러 표시
    }
  };

  const getCheckIconColor = (condition: boolean) => {
    if (condition) return 'green';
    if (showError) return 'red';
    return 'gray';
  };

  return (
    <>
      <Head>
        <title>여수로</title>
        <meta name="description" content="여수 자전거 여행" />
      </Head>
      <div style={styles.container}>
        <div style={{ width: '320px', margin: '0 auto' }}>
          <div style={styles.headerBox}>
            <BackIcon style={styles.backIcon} />
            <CancelIcon />
          </div>
          <p style={styles.welcomeText}>로그인에 사용할<br />비밀번호를 작성해주세요</p>
          <div style={styles.inputboxContainer}>
            <p>비밀번호</p>
            <div style={styles.textInputBox}>
              <input
                style={styles.textInput}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={handlePasswordChange}
              />
              {isPasswordVisible ? (
                <VisibleIcon style={styles.blindButton} onClick={togglePasswordVisibility} />
              ) : (
                <BlindIcon style={styles.blindButton} onClick={togglePasswordVisibility} />
              )}
            </div>
            <div style={styles.checkTextContainer}>
              <div style={styles.checkText}>
                <CheckIcon style={{ color: getCheckIconColor(hasLetter) }} />
                <p style={{ color: getCheckIconColor(hasLetter) }}>영문과 숫자 포함</p>
              </div>
              <div style={styles.checkText}>
                <CheckIcon style={{ color: getCheckIconColor(isLongEnough) }} />
                <p style={{ color: getCheckIconColor(isLongEnough) }}>8자 이상</p>
              </div>
            </div>
          </div>
          <button style={styles.nextButton} onClick={handleNextClick}>다음</button>
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
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  textInputBox: {
    width: '100%',
    height: '44px',
    position: 'relative',
    background: '#efefef',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
  },
  textInput: {
    width: '100%',
    height: '44px',
    background: 'none',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    padding: '0 12px',
  },
  blindButton: {
    position: 'absolute',
    right: '12px',
    top: '12px',
    cursor: 'pointer',
  },
  checkText: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkTextContainer: {
    fontFamily: 'Pretendard, sans-serif',
    marginBottom: '245px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: '12px',
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
    marginTop: '20px',
  },
};

export default PasswordCheckPage;
