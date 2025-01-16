import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createQueries } from '@/api/createQueries';
import { CategoryResponse } from '@/api/type/Category';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';
import Button from '@/shared/button/Button';
import useModalStore from '@/shared/modal/useModalStore';
import Modal from '@/shared/modal/Modal';
import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
  const categoryQuery = createQueries<CategoryResponse[]>(`/categories`);
  const { data } = useQuery(categoryQuery.all());

  const modalId = useRef('menu');
  const { modals, openModal, closeModal } = useModalStore();

  const handleOpen = () => {
    openModal(modalId.current);
  };

  const handleClose = () => {
    closeModal(modalId.current);
  };

  return (
    <>
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
                <Link href="/auth/signin" className={styles.signInLink}>
                  로그인
                </Link>
                <Link href="/auth/signup" className={styles.signUpLink}>
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
    </>
  );
};

export default MobileMenu;
