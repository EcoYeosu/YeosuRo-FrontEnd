'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import BackIcon from '@/components/login/images/backIcon.svg';
import CancelIcon from '@/components/login/images/CancelIcon.svg';
import { useRouter } from 'next/navigation';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { signUpState } from '@/recoil/atoms';

const NicknameCheckPage: React.FC = () => {
  const [nickname, setNicknameState] = useState('');
  const [showError, setShowError] = useState('');
  const router = useRouter();
  const setSignUpState = useSetRecoilState(signUpState);
  const currentSignUpState = useRecoilValue(signUpState);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameState(e.target.value);
    setShowError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSignup = async () => {
    if (nickname.length >= 2) {
      setSignUpState((prevState) => ({
        ...prevState,
        nickname,
      }));

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}sign-up`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: currentSignUpState.email,
            password: currentSignUpState.password,
            nickname: currentSignUpState.nickname,
            agree: currentSignUpState.agree,
          }),
        });

        if (response.ok) {
          router.push('/login/email/signup/complete');
        } else{
          setShowError('이미 존재하는 닉네임이에요.');
        }
      } catch (error) {
        setShowError('회원가입 요청 중 오류가 발생했습니다.');
        console.error('회원가입 요청 중 오류가 발생했습니다.', error);
      }
    } else {
      setShowError('닉네임은 최소 2자 이상 입력하세요.');
    }
  };

  return (
    <>
      <Head>
        <title>닉네임 확인</title>
        <meta name="description" content="회원가입 닉네임 확인 페이지" />
      </Head>
      <div style={styles.container}>
        <div style={{ width: '320px', margin: '0 auto' }}>
          <div style={styles.headerBox}>
            <BackIcon style={styles.backIcon} />
            <CancelIcon />
          </div>
          <p style={styles.welcomeText}>이제 회원가입이<br />다 끝나가요!</p>
          <div style={styles.inputboxContainer}>
            <p>닉네임</p>
            <div style={styles.textInputBox}>
              <input
                style={styles.textInput}
                type="text"
                placeholder="최소 2자 이상 입력해주세요."
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            {showError && (
              <p style={styles.errorText}>{showError}</p>
            )}
          </div>
          <div style={{ marginBottom: '245px' }}></div> 
          <button style={styles.nextButton} onClick={handleSignup}>다음</button>
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
  errorText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '6px',
  },
};

export default NicknameCheckPage;
