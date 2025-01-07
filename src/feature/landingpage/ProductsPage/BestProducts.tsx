'use client';

import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '@/api/productApi';
import ProductCard from '@/feature/landingpage/ProductCard/ProductCard';
import { Product, GetProductResponse } from '@/api/type/Product';
import styles from './BestProducts.module.scss';

const BestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleLoad = useCallback(async () => {
    try {
      const response: GetProductResponse | null = await getProducts(
        ' ',
        undefined,
        'reviewCount',
        0
      );

      if (response && response.list) {
        setProducts(response.list);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.mainTitle}>지금 핫한 상품</h2>
        <h2 className={styles.mainTitle2}>TOP 6</h2>
      </div>
      <div className={styles.container}>
        {products.map((productItem) => (
          <ProductCard
            key={productItem.id}
            id={productItem.id}
            name={productItem.name}
            image={productItem.image}
            rating={productItem.rating}
            favoriteCount={productItem.favoriteCount}
            reviewCount={productItem.reviewCount}
          />
        ))}
      </div>
    </section>
  );
};

export default BestProducts;