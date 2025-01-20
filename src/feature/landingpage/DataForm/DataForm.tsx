'use client';
import { ProductResponse } from '@/api/type/Product';
import styles from './styles.module.scss';
import Star from '/public/icon/ic-star.svg';
import Bubble from '/public/icon/ic-bubble.svg';
import LikeForm from './LikeForm/LikeForm';

interface ProductDetailInfoProps {
  product: ProductResponse;
}

const DataForm: React.FC<ProductDetailInfoProps> = ({ product }) => {
  const ratingDifference = product.rating - product.categoryMetric.rating;
  const reviewDifference =
    product.reviewCount - product.categoryMetric.reviewCount;

  const renderRatingMessage = () => {
    if (ratingDifference > 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다</p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>
              {ratingDifference.toFixed(1)}점
            </p>
            <p className={styles.innerMessage}>만큼 더 높아요!</p>
          </div>
        </div>
      );
    } else if (ratingDifference < 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다 </p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>
              {Math.abs(ratingDifference).toFixed(1)}점
            </p>
            <p className={styles.innerMessage}>만큼 더 낮아요!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>평균 값과</p>
          <p className={styles.innerMessage}>다른 카테고리의 값이</p>
          <p className={styles.innerMessage}>일치해요!</p>
        </div>
      );
    }
  };

  const renderReviewMessage = () => {
    if (reviewDifference > 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다</p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>
              {reviewDifference.toFixed(1)}개
            </p>
            <p className={styles.innerMessage}>더 많아요!</p>
          </div>
        </div>
      );
    } else if (reviewDifference < 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다</p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>
              {Math.abs(reviewDifference).toFixed(1)}개
            </p>
            <p className={styles.innerMessage}>더 적어요!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>리뷰 갯수가</p>
          <p className={styles.innerMessage}>다른 카테고리의 값이</p>
          <p className={styles.innerMessage}>일치해요!</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.productDetailInfo}>
      <div className={styles.iLikeIt}>
        <p className={styles.iLikeItTitle}>별점 평균</p>
        <div className={styles.iLikeItContent}>
          <Star
            className={styles.starColor}
            alt="Star"
            width={24}
            height={24}
          />
          <p className={styles.contentTitle}>{product.rating.toFixed(1)}</p>
        </div>
        {renderRatingMessage()}
      </div>
      <LikeForm
        productId={product.id}
        favoriteCount={product.favoriteCount}
        categoryFavoriteCount={product.categoryMetric.favoriteCount}
      />
      <div className={styles.iLikeIt}>
        <p className={styles.iLikeItTitle}>리뷰</p>
        <div className={styles.iLikeItContent}>
          <Bubble alt="Bubble" width={24} height={24} />
          <p className={styles.contentTitle}> {product.reviewCount}</p>
        </div>
        {renderReviewMessage()}
      </div>
    </div>
  );
};

export default DataForm;
