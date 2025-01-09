'use client';

import { useMutation } from '@tanstack/react-query';
import { SignUpRequest, AuthResponse } from '@/api/type/Auth';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import Input from '@/shared/Input/Input';
import Button from '@/shared/button/Button';
import Link from 'next/link';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpRequest>();

  const password = useWatch({ name: 'password', control });

  const router = useRouter();

  const { mutate } = useMutation<AuthResponse, AxiosError, SignUpRequest>({
    mutationFn: (data) => axiosInstance.post(`/auth/signUp`, data),
    onSuccess: (response) => {
      localStorage.setItem('SignUpToken', response.accessToken);
      router.push('/auth/signin');
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.error(message);
    },
  });

  const onSubmit: SubmitHandler<SignUpRequest> = (data) => {
    mutate(data);
  };

  return (
    <div className={styles.signUpWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          autoComplete="off"
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
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          formErrorMessage={errors.nickname?.message}
          {...register('nickname', {
            required: '닉네임을 입력해주세요.',
            maxLength: {
              value: 10,
              message: '최대 10자 가능',
            },
          })}
        />
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="off"
          formErrorMessage={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '최소 8자 이상',
            },
          })}
        />
        <Input
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          autoComplete="off"
          formErrorMessage={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation', {
            required: '비밀번호 확인을 입력해주세요.',
            validate: (value) => {
              return value === password || '비밀번호가 일치하지 않습니다.';
            },
          })}
        />

        <Button type="submit" className={styles.submitButton}>
          가입하기
        </Button>
      </form>

      <div className={styles.accountActions}>
        <span>이미 아이디가 있으신가요?</span>
        <Link href="/auth/signin">로그인</Link>
      </div>
    </div>
  );
};

export default SignUp;
