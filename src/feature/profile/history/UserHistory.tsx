'use client';

import Image from 'next/image';
import styles from './UserHistory.module.scss';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from '@/api/query';
import {
  getUsersLikes,
  getUsersProducts,
  getUsersReviews,
} from '@/api/userApi';
import classNames from 'classnames';
import ProductCard from '@/feature/landingpage/ProductCard/ProductCard';

interface UserHistoryProps {
  userId?: string;
}

const UserHistory = ({ userId = '740' }: UserHistoryProps) => {
  const [isReviewed, setIsReviewed] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const reviewedData = useQuery({
    queryKey: ['userReviews'],
    queryFn: () => getUsersReviews(userId),
  })?.data?.list;
  const registeredData = useQuery({
    queryKey: ['userCreatedProducts'],
    queryFn: () => getUsersProducts(userId),
  })?.data?.list;
  const favoriteData = useQuery({
    queryKey: ['userFavoriteProducts'],
    queryFn: () => getUsersLikes(userId),
  })?.data?.list;

  const [sort, setSort] = useState('reviewed');

  const reviewedproducts = (reviewedData || []).slice(0, 6);
  const registeredProducts = (registeredData || []).slice(0, 6);
  const favoriteProducts = (favoriteData || []).slice(0, 6);

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
      <div
        className={classNames({
          [styles.cardContainer]: reviewedproducts?.length,
        })}
      >
        {sort === 'reviewed' &&
          reviewedproducts?.map((review) => (
            <ProductCard
              key={review.id}
              id={review.id}
              name={review.name}
              image={review.image}
              rating={review.rating}
              favoriteCount={review.favoriteCount}
              reviewCount={review.reviewCount}
            />
          ))}
        {sort === 'registered' &&
          registeredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              rating={product.rating}
              favoriteCount={product.favoriteCount}
              reviewCount={product.reviewCount}
            />
          ))}
        {sort === 'favorite' &&
          favoriteProducts?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              rating={product.rating}
              favoriteCount={product.favoriteCount}
              reviewCount={product.reviewCount}
            />
          ))}
      </div>
    </div>
  );
};

export default UserHistory;
