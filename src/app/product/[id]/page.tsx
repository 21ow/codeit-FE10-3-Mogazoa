'use client';

import { useParams } from 'next/navigation';
import { getProductsDetail } from '@/api/productApi';
import { ProductResponse, GetProductReviewsResponse } from '@/api/type/Product';
import { useEffect, useState } from 'react';
import ImageComponent from '@/shared/Image/Images';
import HeartCheck from '@/feature/landingpage/HeartCheck/HeartCheck';
import CoCard from '@/feature/landingpage/Comment/Comment';
import DataForm from '@/feature/landingpage/DataForm/DataForm';
import styles from './styles.module.scss';

const ProductDetail = () => {
  const params = useParams();
  const { id } = params || {};

  const [product, setProduct] = useState<ProductResponse | null>(null);

  useEffect(() => {
    if (id) {
      const numericId = Array.isArray(id)
        ? parseInt(id[0], 10)
        : parseInt(id, 10);
      getProductsDetail(numericId)
        .then(setProduct)
        .catch(() => setProduct(null));
    }
  }, [id]);

  const updatedComment = (
    comment: GetProductReviewsResponse['list'][number]
  ) => {
    console.log('Updated comment:', comment);
  };

  const categoryClassMap: { [key: string]: string } = {
    음악: styles.productName1,
    '영화/드라마': styles.productName2,
    '강의/책': styles.productName3,
    호텔: styles.productName4,
    '가구/인테리어': styles.productName5,
    식당: styles.productName6,
    전자기기: styles.productName7,
    화장품: styles.productName8,
    '의류/잡화': styles.productName9,
    앱: styles.productName10,
  };

  const productClassName =
    (product?.category?.name && categoryClassMap[product.category.name]) ||
    styles.productDetail;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productId}>
      <div className={styles.productDetail}>
        <ImageComponent
          src={product.image}
          alt={`${id} 이미지`}
          width={240}
          height={300}
        />
        <div className={styles.productDetailInfo}>
          <p className={productClassName}>{product.category.name}</p>
          <div className={styles.productDetailInfo2}>
            <h2 className={styles.productWhat}>{product.name}</h2>
            <HeartCheck productId={product.id} />
          </div>
          <p>{product.description}</p>
        </div>
      </div>
      <DataForm product={product} />
      <h3 className={styles.reviewName}>상품 리뷰</h3>
      <CoCard productId={product.id} onCommentEditSuccess={updatedComment} />
    </div>
  );
};

export default ProductDetail;
