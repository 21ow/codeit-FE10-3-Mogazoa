import { useRouter } from 'next/navigation';
import Button from '@/shared/button/Button';
import styles from './styles.module.scss';

const EditButton = () => {
  const router = useRouter();

  const handleEdit = () => {
    router.push('/');
  };

  return (
    <div className={styles.editButton}>
      <Button className="styles.editButton" onClick={handleEdit}>
        편집
      </Button>
    </div>
  );
};

export default EditButton;
