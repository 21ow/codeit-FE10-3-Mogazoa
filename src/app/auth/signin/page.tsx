'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/shared/Input/Input';
import Button from '@/shared/button/Button';
import { useMutation } from '@tanstack/react-query';
import { SignInRequest } from '@/api/type/Auth';
import { postSignIn } from '@/api/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import SocialSignin from '../component/SocialSignin';
import styles from './page.module.scss';

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      localStorage.setItem('signinToken', data.accessToken);
      alert('로그인 성공!');
      router.push('/home');
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.error(message);
      alert('로그인 실패. 다시 시도해 주세요.');
    },
  });

  const onSubmit: SubmitHandler<SignInRequest> = (data) => {
    mutate(data);
  };

  return (
    <>
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
      <div className={styles.socialSiginin}>
        <div className={styles.socialTitle}>SNS로 바로 시작하기</div>
        <div className={styles.socialWrapper}>
          <SocialSignin src={'/icon/ic-google.svg'} social="구글" />
          <SocialSignin src={'/icon/ic-kakaotalk.svg'} social="카카오톡" />
        </div>
      </div>
    </>
  );
};

export default Signin;
