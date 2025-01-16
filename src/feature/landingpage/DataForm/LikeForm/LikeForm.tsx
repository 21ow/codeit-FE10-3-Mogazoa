'use client';
import { useEffect, useState } from 'react';
import { useFavoriteStore } from '@/feature/landingpage/DataForm/useFavoriteStore';
import styles from '../styles.module.scss';
import Heart from '/public/icon/ic-heart-select.svg';

interface ProductDetailInfoProps {
  productId: number;
  favoriteCount: number;
  categoryFavoriteCount: number;
}

const LikeForm: React.FC<ProductDetailInfoProps> = ({
  productId,
  favoriteCount,
  categoryFavoriteCount,
}) => {
  const { favorites, favoriteCounts } = useFavoriteStore();
  const currentFavoriteCount = favoriteCounts[productId] || 0;
  const [favoriteDifference, setFavoriteDifference] = useState<number>(
    favoriteCount - categoryFavoriteCount
  );

  useEffect(() => {
    setFavoriteDifference(favoriteCounts[productId] - categoryFavoriteCount);
  }, [favoriteCounts, categoryFavoriteCount, productId]);

  const renderFavoriteMessage = () => {
    const formattedFavoriteDifference = favoriteDifference.toFixed(1);

    if (favoriteDifference > 0) {
      return (
        <div className={styles.innerContain}>
          <p className={styles.innerMessage}>같은 카테고리의 제품들보다 </p>
          <div className={styles.innerContain2}>
            <p className={styles.innerMessage2}>
              {formattedFavoriteDifference}
            </p>
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
              {Math.abs(favoriteDifference).toFixed(1)}
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

  return (
    <div className={styles.iLikeIt}>
      <p className={styles.iLikeItTitle}>찜</p>
      <div className={styles.iLikeItContent}>
        <Heart
          className={styles.heartIcon}
          alt="Heart"
          width={24}
          height={24}
        />
        <p className={styles.contentTitle}>{currentFavoriteCount}</p>
      </div>
      {renderFavoriteMessage()}
    </div>
  );
};

export default LikeForm;
