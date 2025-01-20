import { useQuery } from '@tanstack/react-query';
import { categoryQuery } from '@/api/query';
import Button from '@/shared/button/Button';
import styles from './Category.module.scss';

const Category = () => {
  const { data } = useQuery(categoryQuery.all());
  return (
    <div className={styles.categories}>
      <h2>카테고리</h2>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <Button className={styles.categoryBtn}>{item.name}</Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Category;
