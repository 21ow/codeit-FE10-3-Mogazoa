'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import Link from 'next/link';
import Input from '../input/Input';
import Button from '../button/Button';
import MobileMenu from '../navigation/component/MobileMenu';
import Logo from '/public/image/img-logo.svg';
import Search from '/public/icon/ic-search.svg';
import UserActions from '../navigation/component/UserActions';
import NavMenu from '../navigation/component/NavMenu';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isSearchVisible, setSearchVisible] = useState(false); //수정 예정

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <div className={styles.navigation}>
      {isMobile && <MobileMenu />}

      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>

      <div
        className={classNames(styles.explore, {
          [styles.visible]: isSearchVisible,
        })}
      >
        <div
          className={classNames(styles.searchWrapper, {
            [styles.visible]: isSearchVisible,
          })}
        >
          <Search />
          <Input
            className={styles.search}
            placeholder="상품 이름을 검색해 보세요"
          />
        </div>

        {!isMobile && <NavMenu />}
        {!isMobile && <UserActions />}
      </div>

      <Button
        className={styles.mobileSearchBtn}
        onClick={toggleSearch}
        aria-label="검색창 열기"
      >
        <Search />
      </Button>
    </div>
  );
};

export default Navigation;
