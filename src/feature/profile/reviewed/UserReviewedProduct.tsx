'use client';

import Image from 'next/image';
import styles from './UserReviewedProduct.module.scss';
import { getUsersInfo } from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';

interface UserReviewedProductProps {
  userId?: string;
}

const UserReviewedProduct = ({ userId = '740' }: UserReviewedProductProps) => {
  const userData = useQuery({
    queryKey: ['user'],
    queryFn: () => getUsersInfo(userId),
  })?.data;
  return (
    <div className={styles.container}>
      <h3 className={styles.activeHistory}>활동 내역</h3>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>남긴 별점 평균</p>
          <div className={styles.cardContent}>
            <Image src="/icon/ic-star2.svg" alt="별" width={24} height={24} />
            <p className={styles.numberStyle}>
              {Math.round(Number(userData?.averageRating) * 10) / 10}
            </p>
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
            <p className={styles.numberStyle}>{userData?.reviewCount}</p>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>관심 카테고리</p>
          <div className={styles.categoryChip}>
            {userData?.mostFavoriteCategory?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviewedProduct;
