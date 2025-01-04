import localStorage from './localStorage';
import sessionStorage from './sessionStorage';
import { AuthResponse } from '@/api/type/Auth';

/*** 로그인 메세지 ***/
export const _LOGIN_NEED_MESSAGE_ = '로그인이 필요한 서비스입니다.';

/*** 회원가입 정보 얻기 ***/
export const checkSignUp = () => {
  const res = localStorage.getItem(`postAuthSignUp`) as AuthResponse | null;
  return res;
};

/*** 로그인 정보 얻기 ***/
export const checkSignIn = () => {
  const res = localStorage.getItem(`postAuthSignIn`) as AuthResponse | null;
  return res;
};

/*** 간편 회원가입 정보 얻기 ***/
export const checkSimpleSignUp = () => {
  const res = localStorage.getItem(
    `postAuthSignUpProvider`
  ) as AuthResponse | null;
  return res;
};

/*** 간편 로그인 정보 얻기 ***/
export const checkSimpleSignIn = () => {
  const res = sessionStorage.getItem(
    `postAuthSignInProvider`
  ) as AuthResponse | null;
  return res;
};

/*** 로그인 토큰 얻기 ***/
export const getAccessToken = () => {
  return checkSignIn()?.accessToken;
};

/*** 로그인 사용자 아이디 얻기 ***/
export const getUserId = () => {
  return checkSignIn()?.user.id.toString();
};
