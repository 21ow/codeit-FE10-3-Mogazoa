import { ReactNode } from 'react';
import Navigation from '@/shared/navigation/Navigation';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Navigation>
          <Link href="/auth/signin">로그인</Link>
          <Link href="/auth/signup">회원가입</Link>
        </Navigation>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
