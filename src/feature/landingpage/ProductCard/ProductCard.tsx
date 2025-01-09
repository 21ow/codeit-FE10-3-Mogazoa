'use client';

import ImageComponent from '@/shared/Image/Images';
import { Product } from '@/api/type/Product';
import Link from 'next/link';
import styles from './ProductCard.module.scss';

const ProductCard = ({
  id,
  name,
  image,
  rating,
  favoriteCount,
  reviewCount,
}: Product) => {
  return (
    <Link href={`/product/${id}`} className={styles.card}>
      <div className={styles.proCardContain}>
        <div className={styles.innerContain}>
          <div className={styles.photoContain}>
            <ImageComponent
              src={image}
              alt={`${id} 이미지`}
              width={300}
              height={200}
            />
          </div>
          <div className={styles.innerInfo}>
            <div className={styles.contentTitle}>{name}</div>
            <div className={styles.productInfo}>
              <div className={styles.productInfoInner}>
                <p className={styles.reviewCount}>리뷰</p>
                <p className={styles.reviewCount}>{reviewCount}</p>
                <p className={styles.favoriteCount}>찜</p>
                <p className={styles.favoriteCount}>{favoriteCount}</p>
              </div>
              <p className={styles.raTing}>{rating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
