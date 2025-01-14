'use client';
import { useState, useEffect, useCallback } from 'react';
import { getProductsDetail } from '@/api/productApi';
import { ProductResponse } from '@/api/type/Product';
import { postProductsFavorite, deleteProductsFavorite } from '@/api/productApi';
import SelectHeart from '/public/icon/ic-heart-select.svg';
import styles from './styles.module.scss';

interface FavoriteButtonProps {
  productId: number;
}

const HeartCheck: React.FC<FavoriteButtonProps> = ({ productId }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(true);

  const fetchProductDetails = useCallback(async () => {
    const productDetails: ProductResponse = await getProductsDetail(productId);
    setIsFavorite(productDetails.isFavorite);
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleFavoriteToggle = async () => {
    let resData;
    if (isFavorite) {
      resData = await deleteProductsFavorite(productId);
      setIsFavorite(false);
    } else {
      resData = await postProductsFavorite(productId);
      setIsFavorite(true);
    }

    if (resData && resData.isFavorite !== undefined) {
      setIsFavorite(resData.isFavorite);
    }
  };

  return (
    <button onClick={handleFavoriteToggle} className={styles.heartButton}>
      {isFavorite ? (
        <SelectHeart className={styles.heartIcon1} width={24} height={24} />
      ) : (
        <SelectHeart className={styles.heartIcon2} width={24} height={24} />
      )}
    </button>
  );
};

export default HeartCheck;
