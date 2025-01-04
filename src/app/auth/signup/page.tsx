'use client';

import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import Input from '@/shared/Input/Input';
import Button from '@/shared/button/Button';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequest } from '@/api/type/Auth';
import { postSignUp } from '@/api/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpRequest>();

  const password = useWatch({ name: 'password', control });

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      localStorage.setItem('signupToken', data.accessToken);
      alert('회원가입 성공!');
      router.push('/auth/signin');
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.error(message);
      alert('로그인 실패. 다시 시도해 주세요.');
    },
  });

  const onSubmit: SubmitHandler<SignUpRequest> = (data) => {
    mutate(data);
  };

  return (
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
  );
};

export default Signup;
