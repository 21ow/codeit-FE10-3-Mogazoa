import BestProducts from '@/feature/landingpage/ProductsPage/BestProducts';
import RatingProducts from '@/feature/landingpage/ProductsPage/RatingProducts';
import styles from './Products.module.scss';

const Page = () => {
  return (
    <div className={styles.allWrapper}>
      <div className={styles.wrapper}>
        <BestProducts />
        <RatingProducts />
      </div>
    </div>
  );
};

export default Page;
