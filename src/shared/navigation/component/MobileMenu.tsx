'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';
import Button from '@/shared/button/Button';
import useModalStore from '@/shared/modal/useModalStore';
import Modal from '@/shared/modal/Modal';
import { useAuthStore } from '@/store/useAuthStore';
import UserActions from './UserActions';
import Category from '@/shared/category/Category';
import NavMenu from './NavMenu';
import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
  const { token, clearToken } = useAuthStore();

  const modalId = useRef('menu');
  const { modals, openModal, closeModal } = useModalStore();

  const handleOpen = () => {
    openModal(modalId.current);
  };

  const handleClose = () => {
    closeModal(modalId.current);
  };

  const handleLogout = () => {
    clearToken();
  };

  useEffect(() => {
    handleClose();
  }, [token]);

  return (
    <div className={styles.mobileMenu}>
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

              <UserActions />
            </div>
          }
        >
          <>
            <Category />
            <NavMenu />
            <div className={styles.mobileUserAcitons}>
              <Link href="#">고객센터</Link>
              {token && (
                <Button className={styles.logoutBtn} onClick={handleLogout}>
                  로그아웃
                </Button>
              )}
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

export default MobileMenu;