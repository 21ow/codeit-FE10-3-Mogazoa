import { ReactNode } from 'react';
import AddItem from '/public/icon/ic-add-item.svg';
import Compare from '/public/icon/ic-compare.svg';
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
          <Link href="#">
            <AddItem />
            <div>등록하기</div>
          </Link>
          <Link href="#">
            <Compare />
            <div>비교하기</div>
          </Link>
        </Navigation>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
