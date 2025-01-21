'use client';

import classNames from 'classnames';
import { createQueries } from '@/lib/createQueries';
import { useQuery } from '@tanstack/react-query';
import { GetProductsRequest, GetProductsResponse } from '@/api/type/Product';
import useCategoryStore from '@/store/useCategoryStore';
import ProductCard from '../ProductCard/ProductCard';
import Empty from '@/shared/empty/Empty';
import styles from './BestProducts.module.scss';

const BestProducts = () => {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const params: GetProductsRequest = {
    order: 'reviewCount',
    category: selectedCategory,
  };

  const bestProductsQuery = createQueries<
    GetProductsResponse,
    GetProductsRequest
  >(`/products`, params);

  const { data } = useQuery(bestProductsQuery.all());
  const products = data?.list || [];

  return (
    <section className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.mainTitle}>
          지금 <span>HOT</span> 한 상품
        </h2>
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

export default BestProducts;
