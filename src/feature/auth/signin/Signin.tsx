'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AuthResponse, SignInRequest } from '@/api/type/Auth';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import Input from '@/shared/Input/Input';
import Button from '@/shared/button/Button';
import SocialSignIn from '../component/SocialSignin';
import Link from 'next/link';
import styles from './Signin.module.scss';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>();

  const router = useRouter();

  const { mutate } = useMutation<AuthResponse, AxiosError, SignInRequest>({
    mutationFn: (data) => axiosInstance.post(`/auth/signIn`, data),
    onSuccess: (response) => {
      localStorage.setItem('signInToken', response.accessToken);
      router.push('/'); //임시
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.error(message);
    },
  });

  const onSubmit: SubmitHandler<SignInRequest> = (data) => {
    mutate(data);
  };

  return (
    <div className={styles.signInWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          autoComplete="username"
          formErrorMessage={errors.email?.message}
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: '유효한 이메일을 입력해주세요.',
            },
          })}
        />
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
          formErrorMessage={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '최소 8자 이상',
            },
          })}
        />
        <Button type="submit" className={styles.submitButton}>
          로그인
        </Button>
      </form>
      <div className={styles.accountActions}>
        <Link href="#">비밀번호 재설정</Link>
        <Link href="/auth/signup">회원가입</Link>
      </div>
      <div className={styles.socialSignIn}>
        <div className={styles.socialTitle}>SNS로 바로 시작하기</div>
        <div className={styles.socialWrapper}>
          <SocialSignIn src={'/icon/ic-google.svg'} social="구글" />
          <SocialSignIn src={'/icon/ic-kakaotalk.svg'} social="카카오톡" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
