import { ReactNode } from 'react';
import AddItem from '/public/icon/ic-add-item.svg';
import Compare from '/public/icon/ic-compare.svg';
import Navigation from '@/shared/navigation/Navigation';
import styles from './layout.module.scss';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Navigation>
          <Link href="#" className={styles.favoriteWrapper}>
            <Compare className={styles.compare} />
            <span>비교하기</span>
          </Link>
          <span>|</span>
          <Link href="#" className={styles.favoriteWrapper}>
            <AddItem className={styles.favorite} />
            <span>등록하기</span>
          </Link>
          <span>|</span>
          <div className={styles.auth}>
            <Link href="/auth/signin">로그인</Link>/
            <Link href="/auth/signup">회원가입</Link>
          </div>
        </Navigation>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
