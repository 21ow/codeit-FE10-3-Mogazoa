import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';
import Input from '../Input/Input';
import Image from 'next/image';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Link href="#" className={styles.logo}>
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
            type="text"
            className={styles.search}
            placeholder="상품 이름을 검색해 보세요"
          />
        </div>

        <Link href="#" className={styles.link}>
          상품 등록하기
        </Link>
        <Link href="#" className={styles.link}>
          비교하기
        </Link>
        <Link href="#" className={styles.link}>
          내 프로필
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
