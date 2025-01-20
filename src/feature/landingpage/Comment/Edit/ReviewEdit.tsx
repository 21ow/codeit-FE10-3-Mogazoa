'use client';
import { useState } from 'react';
import { patchReviews } from '@/api/reviewApi';
import { ReviewResponse, ReviewImage } from '@/api/type/Review';
import Image from 'next/image';
import styles from './ReviewEdit.module.scss';
import ImageContain from '@/feature/landingpage/ReviewModal/ImageContain';
import StarRating from '@/feature/landingpage/ReviewModal/StarRating';

interface ReviewEditProps {
  reviewId: number;
  currentContent: string;
  currentRating: number;
  currentReviewImages: ReviewImage[];
  onEditSuccess: (updatedReview: ReviewResponse) => void;
  onCancel: () => void;
}

const ReviewEdit: React.FC<ReviewEditProps> = ({
  reviewId,
  currentContent,
  currentRating,
  currentReviewImages,
  onEditSuccess,
  onCancel,
}) => {
  const [content, setContent] = useState(currentContent);
  const [rating, setRating] = useState(currentRating);
  const [reviewImages, setReviewImages] =
    useState<ReviewImage[]>(currentReviewImages);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditSubmit = async () => {
    if (!content.trim()) {
      alert('수정할 내용을 입력하세요.');
      return;
    }

    setIsLoading(true);
    try {
      const updatedReview = await patchReviews(reviewId, {
        content,
        rating,
        images: reviewImages.map((image) => {
          if (image.source) {
            return { source: image.source };
          } else if (image.id) {
            return { id: image.id };
          }
          return {};
        }),
      });
      onEditSuccess(updatedReview);
      window.location.reload();
    } catch (error) {
      alert('리뷰 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleImageUrlChange = (url: string | null) => {
    if (url) {
      const newImage: ReviewImage = {
        id: Date.now(),
        source: url,
      };
      setReviewImages((prev) => [...prev, newImage]);
    }
  };

  const handleRemoveImage = (url: string) => {
    setReviewImages((prev) =>
      prev.filter((image) => image.source && image.source !== url)
    );
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.ratingContainer}>
        <StarRating
          rating={rating}
          onChange={setRating}
          width={25}
          height={25}
        />
      </div>
      <div className={styles.editContainer2}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
          placeholder="리뷰 내용을 입력하세요."
        />
      </div>
      <div className={styles.behindContain}>
        <div className={styles.imageContainer}>
          <ImageContain
            setImageUrl={handleImageUrlChange}
            showPreview={false}
            width={25}
            height={25}
            className={styles.editLabel}
          />
          <div className={styles.images}>
            {reviewImages
              .filter((image) => image.source)
              .map((image) => (
                <div key={image.id} className={styles.imageWrapper}>
                  <Image
                    src={image.source || 'none'}
                    alt={`리뷰 이미지 ${image.id}`}
                    width={100}
                    height={100}
                  />
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleRemoveImage(image.source!)}
                  >
                    x
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.saveButton}
            onClick={handleEditSubmit}
            disabled={isLoading}
          >
            저장
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewEdit;
