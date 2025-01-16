'use client';

import { HTMLInputTypeAttribute } from 'react';
import Image from 'next/image';
import Button from '@/shared/button/Button';
import styles from './PwToggleBtn.module.scss';

type PassowrdProps = {
  type: HTMLInputTypeAttribute;
  showPassword: boolean;
  handleTogglePassword: () => void;
};

const PwToggleBtn = ({
  type,
  showPassword,
  handleTogglePassword,
}: PassowrdProps) => {
  return type === 'password' ? (
    <Button
      type="button"
      onClick={handleTogglePassword}
      className={styles.toggleBtn}
    >
      {showPassword ? (
        <Image
          src={'/icon/ic-visibility.svg'}
          alt={'비밀번호 숨기기 버튼'}
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={'/icon/ic-invisibility.svg'}
          alt={'비밀번호 보기 버튼'}
          width={24}
          height={24}
        />
      )}
    </Button>
  ) : null;
};

export default PwToggleBtn;
