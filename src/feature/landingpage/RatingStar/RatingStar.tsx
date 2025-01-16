import styles from './styles.module.scss';
import Star from '/public/icon/ic-star.svg';

type RatingStarProps = {
  rating: number;
};

const RatingStar = ({ rating }: RatingStarProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={styles.ratingContainer}>
      {stars.map((star) => (
        <Star
          key={star}
          className={star <= rating ? styles.activeStar : styles.inactiveStar}
          width={18}
          height={18}
        />
      ))}
    </div>
  );
};

export default RatingStar;
