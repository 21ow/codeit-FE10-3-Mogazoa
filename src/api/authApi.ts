import axiosInstance from '@/lib/axiosInstance';

import {
  SignUpRequest,
  SignInRequest,
  SocialSignInRequest,
  SocialSignUpRequest,
  AuthResponse,
} from '@/api/type/Auth';

/*** '회원가입' 요청 ***/
export const postSignUp = async (
  data: SignUpRequest
): Promise<AuthResponse> => {
  const URL = `/auth/signUp`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};

/*** '로그인' 요청 ***/
export const postSignIn = async (
  data: SignInRequest
): Promise<AuthResponse> => {
  const URL = `auth/signIn`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};

/*** '간편 회원가입' 요청 ***/
export const postSignUpProvider = async (
  provider: string,
  data: SocialSignUpRequest
): Promise<AuthResponse> => {
  const URL = `/auth/signUp/${provider}`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};

/*** '간편 로그인' 요청 ***/
export const postSignInProvider = async (
  provider: string,
  data: SocialSignInRequest
): Promise<AuthResponse> => {
  const URL = `auth/signIn/${provider}`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};
