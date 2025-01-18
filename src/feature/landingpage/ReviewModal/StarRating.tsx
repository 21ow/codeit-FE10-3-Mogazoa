import Star from '/public/icon/ic-star.svg';
import styles from './styles.module.scss';

type StarRatingProps = {
  rating: number;
  onChange: (rating: number) => void;
};

const StarRating = ({ rating, onChange }: StarRatingProps) => {
  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <div className={styles.ratingContainer}>
      <p className={styles.ratingText}>별점</p>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
          <Star
            key={star}
            className={star <= rating ? styles.activeStar : styles.inactiveStar}
            width={32}
            height={32}
            onClick={() => handleClick(star - 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
