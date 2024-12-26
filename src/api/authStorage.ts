import webStorage from '@/util/webStorage';
import { AuthResponse } from './type/Auth';

/*** 로그인 메시지 ***/
export const _LOGIN_NEED_MESSAGE_ = '로그인이 필요한 서비스입니다.';

/*** 회원가입 정보 얻기 ***/
export const getSignUp = () => {
  const response = webStorage.getItem(`signUp`, 'local') as AuthResponse | null;
  return response;
};

/*** 로그인 정보 얻기 ***/
export const getSignIn = () => {
  const response = webStorage.getItem(
    `signIn`,
    'session'
  ) as AuthResponse | null;
  return response;
};

/*** 간편 회원가입 정보 얻기 ***/
export const getSocialSignUp = () => {
  const response = webStorage.getItem(
    `socialSignUp`,
    'local'
  ) as AuthResponse | null;
  return response;
};

/*** 간편 로그인 정보 얻기 ***/
export const getSocialSignIn = () => {
  const response = webStorage.getItem(
    `socialSignIn`,
    'session'
  ) as AuthResponse | null;
  return response;
};

/*** 로그인 토큰 얻기 ***/
export const getAccessToken = () => {
  return getSignIn()?.accessToken;
};

/*** 로그인 사용자 아이디 얻기 ***/
export const getUserId = () => {
  return getSignIn()?.user.id.toString();
};
