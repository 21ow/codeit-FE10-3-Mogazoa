'use client';

import Image from 'next/image';
import styles from './UserHistory.module.scss';
import { useState } from 'react';

interface UserReviewedProduct {
  updatedAt?: string;
  createdAt?: string;
  writerId?: number;
  categoryId?: number;
  favoriteCount?: number;
  reviewCount?: number;
  rating?: number;
  image?: string;
  name?: string;
  id?: number;
}

interface UserReviewedProductProps {
  data?: UserReviewedProduct[];
}

// 리뷰 남긴상품, 등록한 상품, 찜한 상품별로 api 요청하고 데이터 처리 필요.
const UserHistory = ({ data }: UserReviewedProductProps = {}) => {
  const [sort, setSort] = useState('reviewed');

  const handleSort = (name: string) => {
    setSort(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sortProduct}>
        <h3
          className={`${sort === 'reviewed' ? styles.selected : styles.noneSelected}`}
          onClick={() => handleSort('reviewed')}
        >
          리뷰 남긴 상품
        </h3>
        <h3
          className={`${sort === 'registered' ? styles.selected : styles.noneSelected}`}
          onClick={() => handleSort('registered')}
        >
          등록한 상품
        </h3>
        <h3
          className={`${sort === 'favorite' ? styles.selected : styles.noneSelected}`}
          onClick={() => handleSort('favorite')}
        >
          찜한 상품
        </h3>
      </div>
      <div className={styles.cardContainer}>
        {data?.map((review) => (
          <div key={review.id} className={styles.card}>
            <div className={styles.image}>
              <Image
                src={review.image || '/image/catbody.svg'}
                alt={review.name || '빈 이미지지'}
                width={245}
                height={180}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.productName}>{review.name}</div>
              <div className={styles.productInfo}>
                <div className={styles.info}>
                  <div className={styles.count}>
                    <p>리뷰</p>
                    <p>{review.reviewCount}</p>
                  </div>
                  <div className={styles.count}>
                    <p>찜</p>
                    <p>{review.favoriteCount}</p>
                  </div>
                </div>
                <div className={styles.count}>
                  <Image
                    src="/icon/ic-star.svg"
                    alt="별"
                    width={16}
                    height={16}
                  />
                  <p>{review.rating}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
