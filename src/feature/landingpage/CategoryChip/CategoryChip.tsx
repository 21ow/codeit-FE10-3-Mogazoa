import styles from './styles.module.scss';

interface CategoryChipProps {
  category: string;
}

const categoryStyles: { [key: string]: string } = {
  음악: styles.music,
  '영화/드라마': styles.movie,
  '강의/책': styles.lecture,
  호텔: styles.hotel,
  '가구/인테리어': styles.furniture,
  식당: styles.restaurant,
  전자기기: styles.electronics,
  화장품: styles.cosmetics,
  '의류/잡화': styles.clothing,
  앱: styles.app,
};

const CategoryChip: React.FC<CategoryChipProps> = ({ category }) => {
  const categoryClass = categoryStyles[category] || styles.default;

  return <div className={`${styles.chip} ${categoryClass}`}>{category}</div>;
};

export default CategoryChip;
