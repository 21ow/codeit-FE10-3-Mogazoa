import { deleteReviews } from '@/api/reviewApi';

import styles from './ReviewDelete.module.scss';

interface ReviewDeleteProps {
  reviewId: number;
  onDeleteSuccess: () => void;
}

const ReviewDelete: React.FC<ReviewDeleteProps> = ({
  reviewId,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    const confirmDelete = confirm('이 리뷰를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    {
      await deleteReviews(reviewId);
      alert('리뷰가 삭제되었습니다.');
      onDeleteSuccess();
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      <p className={styles.deleteName}>삭제</p>
    </button>
  );
};

export default ReviewDelete;
