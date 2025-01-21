import { useRouter } from 'next/navigation';
import Button from '@/shared/button/Button';
import styles from './styles.module.scss';

const CompareButton = () => {
  const router = useRouter();

  const handleCompare = () => {
    router.push('/compare');
  };

  return (
    <div className={styles.compareButton}>
      <Button className="styles.compareButton" onClick={handleCompare}>
        비교하기
      </Button>
    </div>
  );
};

export default CompareButton;
