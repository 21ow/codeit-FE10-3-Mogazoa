'use client';

import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createQueries } from '@/api/createQueries';
import { CategoryResponse } from '@/api/type/Category';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Input from '../Input/Input';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import useModalStore from '../modal/useModalStore';
import Logo from '/public/image/img-logo.svg';
import Search from '/public/icon/ic-search.svg';
import styles from './Navigation.module.scss';

type NavigationProps = {
  children: React.ReactNode;
};

const categoryQuery = createQueries<CategoryResponse[]>(`/categories`);

const Navigation = ({ children }: NavigationProps) => {
  const [isSearchVisible, setSearchVisible] = useState(false); //수정 예정

  const { data } = useQuery(categoryQuery.all());

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    console.log(isSearchVisible);
  };

  const modalId = useRef('menu');
  const { modals, openModal, closeModal } = useModalStore();

  const handleOpen = () => {
    openModal(modalId.current);
  };

  const handleClose = () => {
    closeModal(modalId.current);
  };

  return (
    <div className={styles.navigation}>
      <Button className={styles.menuBtn} onClick={handleOpen}>
        <Image
          src={'/icon/ic-menu.svg'}
          width={24}
          height={24}
          alt="검색하기"
          className={styles.menu}
        />
      </Button>

      {modals[modalId.current]?.isVisible && (
        <Modal
          onClose={handleClose}
          isVisible={modals[modalId.current]?.isVisible}
          customModalContainerStyle={styles.customModal}
          customOverlay={styles.customOverlay}
          customModalContentStyle={styles.customContent}
          customVisible={styles.customVisible}
          customHidden={styles.customHidden}
          customHeader={
            <div className={styles.customHeader}>
              <Link href="/" className={styles.modalLogo}>
                <Logo />
              </Link>
              <div className={styles.authLinkWrapper}>
                <Link href="/auth/signin" className={styles.signinLink}>
                  로그인
                </Link>
                <Link href="/auth/signup" className={styles.signupLink}>
                  회원가입
                </Link>
                {/* 토큰 있으면 사용자 계정 전환 */}
              </div>
            </div>
          }
        >
          <>
            <div>카테고리</div>
            <ul className={styles.categories}>
              {data &&
                data.map((item) => (
                  <li key={item.id}>
                    <Button className={styles.categoryBtn}>{item.name}</Button>
                  </li>
                ))}
            </ul>
          </>
        </Modal>
      )}

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
            type="text"
            className={styles.search}
            placeholder="상품 이름을 검색해 보세요"
          />
        </div>

        {children}
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
