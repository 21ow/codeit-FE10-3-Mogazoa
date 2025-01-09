'use client';

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Input from '../Input/Input';
import Button from '../button/Button';
import MobileMenu from './component/MobileMenu';
import Logo from '/public/image/img-logo.svg';
import Search from '/public/icon/ic-search.svg';
import AddItem from '/public/icon/ic-add-item.svg';
import Compare from '/public/icon/ic-compare.svg';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const [isSearchVisible, setSearchVisible] = useState(false); //수정 예정

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    console.log(isSearchVisible);
  };

  return (
    <div className={styles.navigation}>
      <MobileMenu />

      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>

      <Link href="#">
        <AddItem />
        <div>등록하기</div>
      </Link>
      <Link href="#">
        <Compare />
        <div>비교하기</div>
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
            type="text"
            className={styles.search}
            placeholder="상품 이름을 검색해 보세요"
          />
        </div>
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
