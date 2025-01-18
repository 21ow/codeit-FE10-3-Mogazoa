'use client';
import { useState, useEffect } from 'react';
import Modal from '@/shared/modal/Modal';
import { postReviews } from '@/api/reviewApi';
import { ReviewRequest } from '@/api/type/Review';
import { getProductsDetail } from '@/api/productApi';
import Button from '@/shared/button/Button';

import StarRating from './StarRating';
import ImageContain from './ImageContain';
import styles from './styles.module.scss';

interface ReviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productId: number;
}

const ReviewModal = ({
  isVisible,
  onClose,
  onConfirm,
  productId,
}: ReviewModalProps) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [productName, setProductName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible) {
      getProductsDetail(productId).then((product) =>
        setProductName(product.name)
      );
    }
  }, [isVisible, productId]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setContent(value);
    }
  };

  const handleSubmitReview = () => {
    if (content && rating) {
      const reviewData: ReviewRequest = {
        productId,
        content,
        rating,
        images: imageUrl ? [imageUrl] : [],
      };

      postReviews(reviewData).then(() => {
        onConfirm();
        onClose();
      });
    }
  };

  const isButtonDisabled =
    content.length < 1 || content.length > 300 || rating === 0;

  return (
    isVisible && (
      <Modal
        headerText={productName}
        onClose={onClose}
        isVisible={isVisible}
        customModalContentStyle={styles.reviewModal}
        customOverlay={styles.customOverlay}
      >
        <div className={styles.reviewBody}>
          <StarRating rating={rating} onChange={setRating} />
          <textarea
            id="reviewContent"
            value={content}
            onChange={handleContentChange}
            placeholder="리뷰 작성하기"
            className={styles.reviewContent}
          />
          <ImageContain setImageUrl={setImageUrl} />

          <Button
            className={styles.reviewButton}
            onClick={handleSubmitReview}
            disabled={isButtonDisabled}
          >
            등록하기
          </Button>
        </div>
      </Modal>
    )
  );
};

export default ReviewModal;
