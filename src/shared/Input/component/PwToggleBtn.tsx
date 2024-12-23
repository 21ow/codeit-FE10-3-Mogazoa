'use client';

import Image from 'next/image';
import styles from './PwToggleBtn.module.scss';

type PassowrdProps = {
  type: string;
  showPassword: boolean;
  handleTogglePassword: () => void;
};

const PwToggleBtn = ({
  type,
  showPassword,
  handleTogglePassword,
}: PassowrdProps) => {
  return type === 'password' ? (
    <button
      type="button"
      onClick={handleTogglePassword}
      className={styles.toggleBtn}
    >
      {showPassword ? (
        <Image
          src={'/icon/ic-invisibility.svg'}
          alt={'비밀번호 숨기기 버튼'}
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={'/icon/ic-visibility.svg'}
          alt={'비밀번호 보기 버튼'}
          width={24}
          height={24}
        />
      )}
    </button>
  ) : null;
};

export default PwToggleBtn;
