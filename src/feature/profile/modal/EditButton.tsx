'use client';

import { useState } from 'react';
import ProfileEditModal from '@/feature/profile/modal/ProfileEdit';
import Button from '@/shared/button/Button';
import styles from './styles.module.scss';

const EditButton = ({ userId }: { userId: number }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <div className={styles.editButton}>
      <Button className={styles.reviewButton} onClick={handleOpenModal}>
        프로필 편집
      </Button>

      <ProfileEditModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
      />
    </div>
  );
};

export default EditButton;
