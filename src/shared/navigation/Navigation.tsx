import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';
import Input from '../input/Input';
import Image from 'next/image';
import styles from './Navigation.module.scss';

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation = ({ children }: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>

      <div className={styles.explore}>
        <div className={styles.searchWrapper}>
          <Image
            src={'/icon/ic-search.svg'}
            width={24}
            height={24}
            alt="검색하기"
            className={styles.searchIcon}
          />
          <Input
            className={styles.search}
            placeholder="상품 이름을 검색해 보세요"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Navigation;
