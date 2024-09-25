'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BackIcon from '@/components/login/images/backIcon.svg';
import CancelIcon from '@/components/login/images/CancelIcon.svg';
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';
import { updatePasswordState } from '@/recoil/atoms';

const EmailCheck: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [authCode, setAuthCode] = useState<string>('');
    const [timer, setTimer] = useState<number>(180);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [codeErrorMessage, setCodeErrorMessage] = useState<string>('');
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  
    const router = useRouter();
    const setUserState = useSetRecoilState(updatePasswordState);
  
    useEffect(() => {
      let interval: NodeJS.Timer;
      if (isTimerActive) {
        interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              setIsTimerActive(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isTimerActive]);
  
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleEmailVerification = async () => {
      if (!isValidEmail(email)) {
        setStatusMessage('');
        setErrorMessage('올바른 이메일 형식을 입력해주세요');
        return;
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}sign-up/resetMail?mail=${email}`, {
          method: 'POST',
        });
        if (response.ok) {
          setIsTimerActive(true);
          setIsEmailVerified(true);  // Set email as verified
          setStatusMessage('이메일이 전송됐습니다. 확인해주세요.');
          setErrorMessage('');
        } else if (response.status === 404) {
          setStatusMessage('');
          setErrorMessage('정보가 존재하지 않습니다. 이메일 주소를 다시 확인해주세요.');
        } else {
          setStatusMessage('');
          setErrorMessage('요청에 실패했습니다. 나중에 다시 시도해주세요.');
        }
      } catch (error) {
        setStatusMessage('');
        setErrorMessage('네트워크 오류가 발생했습니다.');
      }
    };
  
    const handleNext = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}sign-up/mailCheck?code=${authCode}&type=${email}`, {
          method: 'GET',
        });
        if (response.ok) {
          setUserState((prevState) => ({
            ...prevState,
            email,
          }));
          router.push('/login/updatePassword/passwordCheck');
        } else {
          setCodeErrorMessage('인증번호가 일치하지 않아요. 다시 확인해주세요');
        }
      } catch (error) {
        setCodeErrorMessage('네트워크 오류가 발생했습니다.');
      }
    };
  
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
            <p style={styles.welcomeText}>비밀번호 재설정을 <br />진행할게요</p>
            <div style={styles.inputboxContainer}>
              <p>이메일</p>
              <div style={styles.textInputBox}>
                <input
                  style={styles.textInput}
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  style={styles.authButton}
                  onClick={handleEmailVerification}
                >
                  인증
                </button>
                {isTimerActive && (
                  <div style={styles.timer}>
                    {formatTime(timer)}
                  </div>
                )}
              </div>
              <p style={styles.errorMessage}>{errorMessage}</p>
              <p style={styles.statusMessage}>{statusMessage}</p>
              
              {/* Conditionally render the auth code input */}
              {isEmailVerified && (
                <>
                  <div style={styles.textInputBox}>
                    <input
                      style={styles.textInput}
                      type="text"
                      placeholder="인증번호 입력"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                    />
                  </div>
                  <p style={styles.codeErrorMessage}>{codeErrorMessage}</p>
                </>
              )}
            </div>
            {isEmailVerified && (
              <button onClick={handleNext} style={styles.nextButton}>다음</button>
            )}
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
    margin: '0 auto',
  },
  backIcon: {
    padding: '0',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  inputboxContainer: {
    fontFamily: 'Pretendard, sans-serif',
    display: 'flex',
    marginBottom : '245px',
    flexDirection: 'column',
    gap: '1px',
  },
  textInputBox: {
    width: '100%',
    height: '44px',
    position: 'relative',
    background: '#efefef',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  textInput: {
    width: 'calc(100% - 80px)', // Adjust width to make space for button and timer
    height: '44px',
    background: 'none',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    padding: '0 12px',
    boxSizing: 'border-box',
  },
  authButton: {
    width: '60px',
    height: '32px',
    background: '#0D77E0',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    zIndex: 1, // Ensure button is on top of timer
  },
  timer: {
    position: 'absolute',
    right: '80px', // Adjust to position correctly next to button
    top: '13px',
    fontSize: '12px',
    color: '#0D77E0',
    fontWeight: '600',
  },
  statusMessage: {
    color: '#0D77E0',
    fontSize: '12px',
    marginTop: '1px',
  },
  errorMessage: {
    color: '#FF4C4C',
    fontSize: '12px',
    marginTop: '1px',
  },
  codeErrorMessage: {
    color: '#FF4C4C',
    fontSize: '12px',
    marginTop: '1px',
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

export default EmailCheck;
