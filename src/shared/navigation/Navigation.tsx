'use client';

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';
import Input from '../Input/Input';
import Image from 'next/image';
import Button from '../button/Button';
import styles from './Navigation.module.scss';

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation = ({ children }: NavigationProps) => {
  const [isSearchVisible, setSearchVisible] = useState(false); //팝오버로 수정 예정

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    console.log(isSearchVisible);
  };

  return (
    <div className={styles.navigation}>
      <Button className={styles.menu}>
        <Image
          src={'/icon/ic-menu.svg'}
          width={24}
          height={24}
          alt="검색하기"
          className={styles.menu}
        />
      </Button>

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
          <Image
            src={'/icon/ic-search.svg'}
            width={18}
            height={18}
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

      <Button
        className={styles.mobileSearchButton}
        onClick={toggleSearch}
        aria-label="검색창 열기"
      >
        <Image
          src={'/icon/ic-search.svg'}
          width={24}
          height={24}
          alt="검색하기"
        />
      </Button>
    </div>
  );
};

export default Navigation;
