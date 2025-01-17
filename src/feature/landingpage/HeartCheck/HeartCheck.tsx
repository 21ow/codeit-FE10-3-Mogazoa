'use client';
import { useEffect, useCallback, useState } from 'react';
import {
  getProductsDetail,
  postProductsFavorite,
  deleteProductsFavorite,
} from '@/api/productApi';
import { useFavoriteStore } from '@/feature/landingpage/DataForm/useFavoriteStore';
import Heart from '/public/icon/ic-heart.svg';
import SelectHeart from '/public/icon/ic-heart-select.svg';
import styles from './styles.module.scss';

interface FavoriteButtonProps {
  productId: number;
}

const HeartCheck: React.FC<FavoriteButtonProps> = ({ productId }) => {
  const { favorites, toggleFavorite, setFavoriteCount, setFavorite } =
    useFavoriteStore();
  const [isFavorite, setIsFavorite] = useState(favorites[productId] || false); // 로컬 상태

  const fetchProductDetails = useCallback(async () => {
    const { isFavorite, favoriteCount } = await getProductsDetail(productId);
    setFavoriteCount(productId, favoriteCount);
    setIsFavorite(isFavorite);
  }, [productId, setFavoriteCount]);

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      const res = await deleteProductsFavorite(productId);
      toggleFavorite(productId);
      setFavoriteCount(productId, res.favoriteCount);
      setIsFavorite(false);
    } else {
      const res = await postProductsFavorite(productId);
      toggleFavorite(productId);
      setFavoriteCount(productId, res.favoriteCount);
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    setFavorite(productId, isFavorite);
  }, [isFavorite, productId, setFavorite]);

  return (
    <button onClick={handleFavoriteToggle} className={styles.heartButton}>
      {isFavorite ? (
        <SelectHeart className={styles.heartIcon1} width={24} height={24} />
      ) : (
        <Heart width={24} height={24} />
      )}
    </button>
  );
};

export default HeartCheck;
