import { useQuery } from '@tanstack/react-query';
import { categoryQuery } from '@/api/query';
import { useRouter } from 'next/navigation';
import useCategoryStore from '@/store/useCategoryStore';
import Button from '@/shared/button/Button';
import styles from './Category.module.scss';

type CategoryProps = {
  onClick: () => void;
};

const Category = ({ onClick }: CategoryProps) => {
  const { data } = useQuery(categoryQuery.all());
  const { setCategory } = useCategoryStore();
  const router = useRouter();

  const handleCategoryClick = (id: number) => {
    setCategory(id);
    onClick();
    router.push('/');
  };

  return (
    <div className={styles.categories}>
      <h2>카테고리</h2>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <Button
                className={styles.categoryBtn}
                onClick={() => {
                  handleCategoryClick(item.id);
                }}
              >
                {item.name}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Category;
