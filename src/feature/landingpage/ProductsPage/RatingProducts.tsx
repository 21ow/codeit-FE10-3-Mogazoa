'use client';

import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { GetProductsRequest } from '@/api/type/Product';
import useCategoryStore from '@/store/useCategoryStore';
import ProductCard from '../ProductCard/ProductCard';
import Empty from '@/shared/empty/Empty';
import styles from './RatingProducts.module.scss';
import { productsQuery } from '@/api/query';

const RatingProducts = () => {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const params: GetProductsRequest = {
    order: 'rating',
    category: selectedCategory,
  };

  const { data } = useQuery(productsQuery(params).all());
  const products = (data?.list || []).slice(0, 6);

  return (
    <section className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.mainTitle}>별점이 높은 상품</h2>
      </div>
      <div className={classNames({ [styles.container]: products?.length })}>
        {products?.length ? (
          products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              rating={item.rating}
              favoriteCount={item.favoriteCount}
              reviewCount={item.reviewCount}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
};

export default RatingProducts;
