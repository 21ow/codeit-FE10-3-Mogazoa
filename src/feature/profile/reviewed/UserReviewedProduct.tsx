import Image from 'next/image';
import styles from './UserReviewedProduct.module.scss';

interface mostFavoriteCategory {
  name?: string;
  id?: number;
}

interface UserReviewedProduct {
  createdAt?: string;
  updatedAt?: string;
  teamId?: string;
  image?: string;
  description?: string;
  nickname?: string;
  id?: number;
  mostFavoriteCategory?: mostFavoriteCategory;
  averageRating?: number;
  reviewCount?: number;
  followeesCount?: number;
  followersCount?: number;
  isFollowing?: boolean;
}

interface UserReviewedProductProps {
  data?: UserReviewedProduct;
}

const UserReviewedProduct = ({ data }: UserReviewedProductProps = {}) => {
  const { averageRating, reviewCount, mostFavoriteCategory } = data || {};
  return (
    <div className={styles.container}>
      <h3 className={styles.activeHistory}>활동 내역</h3>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>남긴 별점 평균</p>
          <div className={styles.cardContent}>
            <Image src="/icon/ic-star.svg" alt="별" width={24} height={24} />
            <p className={styles.numberStyle}>{averageRating}</p>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>남긴 리뷰</p>
          <div className={styles.cardContent}>
            <Image
              src="/icon/ic-bubble.svg"
              alt="리뷰 메시지"
              width={24}
              height={24}
            />
            <p className={styles.numberStyle}>{reviewCount}</p>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>관심 카테고리</p>
          <div className={styles.categoryChip}>
            {mostFavoriteCategory?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviewedProduct;
