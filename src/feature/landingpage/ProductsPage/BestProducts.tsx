'use client';

import classNames from 'classnames';
import useCategoryStore from '@/store/useCategoryStore';
import { useQuery } from '@tanstack/react-query';
import { productsQuery } from '@/api/query';
import { GetProductsRequest } from '@/api/type/Product';
import ProductCard from '../ProductCard/ProductCard';
import Empty from '@/shared/empty/Empty';
import styles from './BestProducts.module.scss';

const BestProducts = () => {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const params: GetProductsRequest = {
    order: 'reviewCount',
    category: selectedCategory,
  };

  const { data } = useQuery(productsQuery(params).all());
  const products = (data?.list || []).slice(0, 6);

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
