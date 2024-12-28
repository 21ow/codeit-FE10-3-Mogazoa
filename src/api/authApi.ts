import axiosInstance from './axiosInstance';
import localStorage from '@/api/storage/localStorage';
import sessionStorage from '@/api/storage/sessionStorage';
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
  console.log('POST - postAuthSignUp(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as AuthResponse;
      localStorage.setItem(`postAuthSignUp`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postAuthSignUp() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** '로그인' 요청 ***/
export const postSignIn = async (
  data: SignInRequest
): Promise<AuthResponse> => {
  const URL = `auth/signIn`;
  console.log('POST - postAuthSignIn(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as AuthResponse;
      sessionStorage.setItem(`postAuthSignIn`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postAuthSignIn() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** '간편 회원가입' 요청 ***/
export const postSignUpProvider = async (
  provider: string,
  data: SocialSignUpRequest
): Promise<AuthResponse> => {
  const URL = `/auth/signUp/${provider}`;
  console.log('POST - postAuthSignUpProvider(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as AuthResponse;
      localStorage.setItem(`postAuthSignUpProvider`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postAuthSignUpProvider() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** '간편 로그인' 요청 ***/
export const postSignInProvider = async (
  provider: string,
  data: SocialSignInRequest
): Promise<AuthResponse> => {
  const URL = `auth/signIn/${provider}`;
  console.log('POST - postAuthSignInProvider(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as AuthResponse;
      sessionStorage.setItem(`postAuthSignInProvider`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postAuthSignInProvider() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
