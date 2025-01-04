'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/shared/Input/Input';
import Button from '@/shared/button/Button';
import styles from './page.module.scss';

type LoginFormData = {
  email: string;
  password: string;
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label="이메일"
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
        formErrorMessage={errors.password?.message}
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '최소 8자 이상',
          },
        })}
      />
      <Button type="submit" className={styles.button}>
        로그인
      </Button>
    </form>
  );
};

export default Signin;
