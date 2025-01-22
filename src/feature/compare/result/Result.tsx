'use client';

import styles from './Result.module.scss';
import { useQuery } from '@tanstack/react-query';
import { productsQuery } from '@/api/query';
import useCompareStore from '../useCompareStore';
import { useEffect, useState } from 'react';
import CatLoading from '@/shared/loading/CatLoading';
import DotLoading from '@/shared/loading/DotLoading';
import Image from 'next/image';

const Result = () => {
  const [isData, setIsData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const {
    firstProductName,
    secondProductName,
    isAactionCompareButton,
    whoIsWin,
    setActionCompareButton,
    setWhoIsWin,
  } = useCompareStore();

  const firstProductParams = {
    keyword: firstProductName,
  };
  const firstProduct = useQuery(productsQuery(firstProductParams).all());
  const secondProductParams = {
    keyword: secondProductName,
  };
  const secondProduct = useQuery(productsQuery(secondProductParams).all());

  const firstProductWinCompoent = (
    <div className={styles.firstProductWin}>상품 1 승리</div>
  );

  const secondProductWinCompoent = (
    <div className={styles.secondProductWin}>상품 2 승리</div>
  );

  const onClick = () => {
    console.log(firstProduct.data);
  };

  useEffect(() => {
    if (isAactionCompareButton) {
      setIsData(true);
    } else {
      setIsData(false);
      setWhoIsWin('');
    }
  }, [isAactionCompareButton]);

  return (
    <div className={styles.container} onClick={onClick}>
      {!isData && (
        <div className={styles.loading}>
          <CatLoading />
          <DotLoading />
        </div>
      )}
      {whoIsWin === 'draw' && (
        <div className={styles.drawContainer}>무승부입니다!</div>
      )}
      {whoIsWin === 'first' && (
        <div className={styles.resultContainer}>
          <div className={styles.resultBox}>
            <div className={`${styles.winImage} ${styles.visible}`}>
              <Image
                src={firstProduct.data?.list[0]?.image || ''}
                alt="product-image"
                fill
              />
            </div>
            <div className={styles.winContainer}>
              <p className={styles.firstWin}>
                {firstProduct.data?.list[0]?.name || ''}
              </p>
              <p>&nbsp;상품이 승리하였습니다!</p>
            </div>
          </div>
          <p className={styles.winPhrase}>
            3가지 항목 중 2가지 항목에서 우세합니다.
          </p>
        </div>
      )}
      {whoIsWin === 'second' && (
        <div className={styles.resultContainer}>
          <div className={styles.resultBox}>
            <div className={`${styles.winImage} ${styles.visible}`}>
              <Image
                src={secondProduct.data?.list[0]?.image || ''}
                alt="product-image"
                width={200}
                height={300}
              />
            </div>
            <div className={styles.winContainer}>
              <p className={styles.secondWin}>
                {secondProduct.data?.list[0]?.name || ''}
              </p>
              <p>&nbsp;상품이 승리하였습니다!</p>
            </div>
          </div>
          <p className={styles.winPhrase}>
            3가지 항목 중 2가지 항목에서 우세합니다.
          </p>
        </div>
      )}
      {isData && (
        <div className={styles.table}>
          <div className={styles.header}>
            <p>기준</p>
            <p>상품 1</p>
            <p>상품 2</p>
            <p>결과</p>
          </div>
          <div className={styles.row}>
            <p>별점</p>
            <span>{firstProduct.data?.list[0]?.rating || 'no-data'}</span>
            <span>{secondProduct.data?.list[0]?.rating || 'no-data'}</span>
            <div className={styles.result}>
              {firstProduct.data &&
                secondProduct.data &&
                firstProduct.data?.list[0]?.rating &&
                secondProduct.data?.list[0]?.rating &&
                (firstProduct.data?.list[0].rating ===
                secondProduct.data?.list[0].rating ? (
                  <span>무승부</span>
                ) : firstProduct.data?.list[0].rating >
                  secondProduct.data?.list[0].rating ? (
                  firstProductWinCompoent
                ) : (
                  secondProductWinCompoent
                ))}
            </div>
          </div>
          <div className={styles.row}>
            <p>리뷰 개수</p>
            <span>{firstProduct.data?.list[0]?.reviewCount || 'no-data'}</span>
            <span>{secondProduct.data?.list[0]?.reviewCount || 'no-data'}</span>
            <div className={styles.result}>
              {firstProduct.data &&
                secondProduct.data &&
                firstProduct.data?.list?.[0]?.reviewCount &&
                secondProduct.data?.list[0]?.reviewCount &&
                (firstProduct.data?.list[0].reviewCount ===
                secondProduct.data?.list[0].reviewCount ? (
                  <span>무승부</span>
                ) : firstProduct.data?.list[0].reviewCount >
                  secondProduct.data?.list[0].reviewCount ? (
                  firstProductWinCompoent
                ) : (
                  secondProductWinCompoent
                ))}
            </div>
          </div>
          <div className={styles.row}>
            <p>찜 개수</p>
            <span>
              {firstProduct.data?.list[0]?.favoriteCount || 'no-data'}
            </span>
            <span>
              {secondProduct.data?.list[0]?.favoriteCount || 'no-data'}
            </span>
            <div className={styles.result}>
              {firstProduct.data &&
                secondProduct.data &&
                firstProduct.data?.list?.[0]?.favoriteCount &&
                secondProduct.data?.list[0]?.favoriteCount &&
                (firstProduct.data?.list[0].favoriteCount ===
                secondProduct.data?.list[0].favoriteCount ? (
                  <span>무승부</span>
                ) : firstProduct.data?.list[0].favoriteCount >
                  secondProduct.data?.list[0].favoriteCount ? (
                  firstProductWinCompoent
                ) : (
                  secondProductWinCompoent
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
