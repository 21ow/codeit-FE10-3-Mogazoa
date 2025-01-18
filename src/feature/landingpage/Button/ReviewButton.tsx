'use client';

import { useState } from 'react';

import ReviewModal from '@/feature/landingpage/ReviewModal/ReviewModal';
import Button from '@/shared/button/Button';
import styles from './styles.module.scss';

const ReviewButton = ({ productId }: { productId: number }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleNavigateToReview = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.reviewButton}>
      <Button className="styles.reviewButton" onClick={handleOpenModal}>
        리뷰 작성하기
      </Button>

      <ReviewModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleNavigateToReview}
        productId={productId}
      />
    </div>
  );
};

export default ReviewButton;
