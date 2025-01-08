import BestProducts from '@/feature/landingpage/ProductsPage/BestProducts';
import RatingProducts from '@/feature/landingpage/ProductsPage/RatingProducts';
import RankingList from '@/feature/landingpage/RankingList/RankingList';
import styles from './Products.module.scss';
const Page = () => {
  return (
    <div className={styles.allWrapper}>
      <div className={styles.wrapper}>
        <BestProducts />
        <RatingProducts />
      </div>
      <RankingList />
    </div>
  );
};

export default Page;
