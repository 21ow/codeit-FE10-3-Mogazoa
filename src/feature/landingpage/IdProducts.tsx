'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductsDetail } from '@/api/productApi';
import { ProductResponse } from '@/api/type/Product';
import ImageComponent from '@/shared/Image/Images';
import HeartCheck from '@/feature/landingpage/HeartCheck/HeartCheck';
import CoCard from '@/feature/landingpage/Comment/Comment';
import DataForm from '@/feature/landingpage/DataForm/DataForm';
import ReviewButton from '@/feature/landingpage/Button/ReviewButton';
import CompareButton from '@/feature/landingpage/Button/CompareButton';
import CategoryChip from '@/feature/landingpage/CategoryChip/CategoryChip';
import styles from './IdProducts.module.scss';

const IdProducts: React.FC = () => {
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

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productId}>
      <div className={styles.productTop}>
        <ImageComponent
          src={product.image}
          alt={`${id} 이미지`}
          width={240}
          height={300}
        />
        <div className={styles.productDetail}>
          <div className={styles.chipContainer}>
            <CategoryChip category={product.category.name} />
          </div>
          <div className={styles.productDetailInfo2}>
            <h2 className={styles.productWhat}>{product.name}</h2>
            <HeartCheck productId={product.id} />
          </div>
          <p className={styles.whatIsThis}>{product.description}</p>
          <div className={styles.buttonContain}>
            <ReviewButton productId={product.id} />
            <CompareButton />
          </div>
        </div>
      </div>
      <div className={styles.reviewContain}>
        <h3 className={styles.reviewName}>상품 통계</h3>
        <DataForm product={product} />
      </div>
      <div className={styles.reviewContain}>
        <CoCard productId={product.id} />
      </div>
    </div>
  );
};

export default IdProducts;
