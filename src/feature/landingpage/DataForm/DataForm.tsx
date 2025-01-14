import { ProductResponse } from '@/api/type/Product';
import styles from './styles.module.scss';
import Star from '/public/icon/ic-star.svg';
import Heart from '/public/icon/ic-heart-select.svg';
import Bubble from '/public/icon/ic-bubble.svg';

interface ProductDetailInfoProps {
  product: ProductResponse;
}

const DataForm: React.FC<ProductDetailInfoProps> = ({ product }) => {
  const ratingDifference = product.rating - product.categoryMetric.rating;
  const favoriteDifference =
    product.favoriteCount - product.categoryMetric.favoriteCount;
  const reviewDifference =
    product.reviewCount - product.categoryMetric.reviewCount;

  const renderFavoriteMessage = () => {
    if (favoriteDifference > 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다 </p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>{favoriteDifference} </p>
            <p className={styles.innerMessage}>개 더 많아요!</p>
          </div>
        </div>
      );
    } else if (favoriteDifference < 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다</p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>
              {Math.abs(favoriteDifference)}
            </p>
            <p className={styles.innerMessage}>개 더 적어요!</p>
          </div>
        </div>
      );
    } else {
      return (
        <p className={styles.innerMessage}>찜 개수가 평균 값과 일치해요!</p>
      );
    }
  };

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
        <p className={styles.innerMessage}>
          평균 값과 다른 카테고리의 값이 일치해요!
        </p>
      );
    }
  };

  const renderReviewMessage = () => {
    if (reviewDifference > 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다</p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>{reviewDifference}개</p>
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
              {Math.abs(reviewDifference)}개
            </p>
            <p className={styles.innerMessage}>더 적어요!</p>
          </div>
        </div>
      );
    } else {
      return (
        <p className={styles.innerMessage}>리뷰 개수가 평균 값과 일치해요!</p>
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
          <p className={styles.contentTitle}>{product.rating}</p>
        </div>
        {renderRatingMessage()}
      </div>
      <div className={styles.iLikeIt}>
        <p className={styles.iLikeItTitle}>찜</p>
        <div className={styles.iLikeItContent}>
          <Heart
            className={styles.heartIcon}
            alt="Heart"
            width={24}
            height={24}
          />
          <p className={styles.contentTitle}>{product.favoriteCount}</p>
        </div>
        {renderFavoriteMessage()}
      </div>
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
