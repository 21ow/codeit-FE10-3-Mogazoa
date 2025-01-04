import { ReactNode } from 'react';
import Navigation from '@/shared/navigation/Navigation';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
