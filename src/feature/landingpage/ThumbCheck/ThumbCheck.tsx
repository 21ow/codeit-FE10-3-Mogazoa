'use client';
import { useState, useEffect, useCallback } from 'react';
import { getProductsReviews } from '@/api/productApi';
import { postReviewsLike, deleteReviewsLike } from '@/api/reviewApi';
import SelectThumb from '/public/icon/ic-thumb-select.svg';
import Thumb from '/public/icon/ic-thumb.svg';
import styles from './styles.module.scss';

interface GoodButtonProps {
  reviewId: number;
  productId: number;
}

const ThumbCheck: React.FC<GoodButtonProps> = ({ reviewId, productId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const fetchReviewDetails = useCallback(async () => {
    const reviewDetails = await getProductsReviews(productId);

    const targetReview = reviewDetails.list.find(
      (review) => review.id === reviewId
    );

    if (targetReview) {
      setIsLiked(targetReview.isLiked);
      setLikeCount(targetReview.likeCount);
    }
  }, [reviewId, productId]);

  useEffect(() => {
    fetchReviewDetails();
  }, [fetchReviewDetails]);

  const handleLikeToggle = async () => {
    let resData;
    if (isLiked) {
      resData = await deleteReviewsLike(reviewId);
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      resData = await postReviewsLike(reviewId);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }

    if (resData && resData.isLiked !== undefined) {
      setIsLiked(resData.isLiked);
    }
  };

  return (
    <button onClick={handleLikeToggle} className={styles.thumbButton}>
      {isLiked ? (
        <div className={styles.thumbChip}>
          <SelectThumb
            className={styles.thumbIconActive}
            width={18}
            height={18}
          />
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
      ) : (
        <div className={styles.thumbChip}>
          <Thumb className={styles.thumbIcon} width={18} height={18} />
          <span className={styles.likeCount2}>{likeCount}</span>
        </div>
      )}
    </button>
  );
};
export default ThumbCheck;
