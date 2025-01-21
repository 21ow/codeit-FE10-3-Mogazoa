'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Logo from '/public/image/img-logo.svg';
import Menu from '/public/icon/ic-menu.svg';
import Button from '@/shared/button/Button';
import useModalStore from '@/shared/modal/useModalStore';
import Modal from '@/shared/modal/Modal';
import UserActions from './UserActions';
import Category from '@/shared/category/Category';
import NavMenu from './NavMenu';
import UserDashboard from './UserDashboard';
import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
  const modalId = useRef('menu');

  const { modals, openModal, closeModal } = useModalStore();

  const handleOpen = () => {
    openModal(modalId.current);
  };

  const handleClose = () => {
    closeModal(modalId.current);
  };

  return (
    <div className={styles.mobileMenu}>
      <Button className={styles.menuBtn} onClick={handleOpen}>
        <Menu />
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
            <Category onClick={handleClose} />
            <NavMenu onClick={handleClose} />
            <UserDashboard onClick={handleClose} />
          </>
        </Modal>
      )}
    </div>
  );
};

export default MobileMenu;
