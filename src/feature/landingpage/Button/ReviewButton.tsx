import { useRouter } from 'next/navigation';
import Button from '@/shared/button/Button';
import styles from './styles.module.scss';

const ReviewButton = () => {
  const router = useRouter();

  const handleCompare = () => {
    router.push('/product');
  };

  return (
    <div className={styles.reviewButton}>
      <Button className="styles.reviewButton" onClick={handleCompare}>
        리뷰 작성하기
      </Button>
    </div>
  );
};

export default ReviewButton;
