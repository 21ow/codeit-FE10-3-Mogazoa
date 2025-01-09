'use client';

import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '@/api/productApi';
import ProductCard from '@/feature/landingpage/ProductCard/ProductCard';
import { Product, GetProductsResponse } from '@/api/type/Product';
import styles from './RatingProducts.module.scss';

const RatingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleLoad = useCallback(async () => {
    try {
      const response: GetProductsResponse | null = await getProducts({
        order: 'rating',
      });

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
        <h2 className={styles.mainTitle}>별점이 높은 상품</h2>
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

export default RatingProducts;
