'use client';

import { getToken } from '@/lib/localStorage';
import Link from 'next/link';
import UserProfile from './UserProfile';
import styles from './UserActions.module.scss';

const UserActions = () => {
  const token = getToken();
  return token ? (
    <UserProfile />
  ) : (
    <div className={styles.authLinkWrapper}>
      <Link href="/auth/signin" className={styles.signInLink}>
        로그인
      </Link>
      <span>/</span>
      <Link href="/auth/signup" className={styles.signUpLink}>
        회원가입
      </Link>
    </div>
  );
};

export default UserActions;
