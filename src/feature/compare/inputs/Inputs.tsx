'use client';

import useFilteringStore from '@/shared/filtering/useFilteringStore';
import styles from './Inputs.module.scss';
import { useEffect, useRef, useState } from 'react';
import Filtering from '@/shared/filtering/Filtering';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productsQuery } from '@/api/query';
import useCompareStore from '../useCompareStore';

const Inputs = () => {
  const { filters, setSelectedFilteringData } = useFilteringStore();
  const [firstInputValue, setFirstInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [firstChip, setFirstChip] = useState('');
  const [secondChip, setSecondChip] = useState('');
  const firstChipRef = useRef<HTMLDivElement>(null);
  const secondChipRef = useRef<HTMLDivElement>(null);
  const firstProductId = useRef<HTMLInputElement>(null);
  const firstFilterId = useRef<string>('firstFilter');
  const secondProductId = useRef<HTMLInputElement>(null);
  const secondFilterId = useRef<string>('secondFilter');
  const [isFirstInputDisabled, setIsFirstInputDisabled] = useState(false);
  const [isSecondInputDisabled, setIsSecondInputDisabled] = useState(false);
  const [firstProductWin, setFirstProductWin] = useState(0);
  const [secondProductWin, setSecondProductWin] = useState(0);
  const {
    firstProductName,
    secondProductName,
    whoIsWin,
    setActionCompareButton,
    setFirstProductName,
    setSecondProductName,
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
  const allProduct = useQuery(productsQuery().all());

  const handleFirstInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstInputValue(e.target.value);
  };

  const handleSecondInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondInputValue(e.target.value);
  };

  const handlefirstChipClose = () => {
    setSelectedFilteringData(firstFilterId.current, '');
    setFirstChip('');
    setIsFirstInputDisabled(false);
    setFirstProductName('');
    setActionCompareButton(false);
    if (firstChipRef.current) {
      firstChipRef.current.style.display = 'none';
    }
  };

  const handleSecondChipClose = () => {
    setSelectedFilteringData(secondFilterId.current, '');
    setSecondChip('');
    setIsSecondInputDisabled(false);
    setSecondProductName('');
    setActionCompareButton(false);
    if (secondChipRef.current) {
      secondChipRef.current.style.display = 'none';
    }
  };

  const handleFirstInputClick = (e: React.MouseEvent) => {
    if (
      filters[firstFilterId.current] &&
      filters[firstFilterId.current].value &&
      !firstChipRef.current?.contains(e.target as Node)
    ) {
      setFirstInputValue('');
      setFirstChip(filters[firstFilterId.current].value);
      setIsFirstInputDisabled(true);
      if (firstChipRef.current) {
        firstChipRef.current.style.display = 'block';
      }
      setFirstProductName(filters[firstFilterId.current].value);
    }
  };

  const handleSecondInputClick = (e: React.MouseEvent) => {
    if (
      filters[secondFilterId.current] &&
      filters[secondFilterId.current].value &&
      !secondChipRef.current?.contains(e.target as Node)
    ) {
      setSecondInputValue('');
      setSecondChip(filters[secondFilterId.current].value);
      setIsSecondInputDisabled(true);
      if (secondChipRef.current) {
        secondChipRef.current.style.display = 'block';
      }
      setSecondProductName(filters[secondFilterId.current].value);
    }
  };

  const handleActionCompareButton = () => {
    if (firstProductName && secondProductName) {
      setActionCompareButton(true);
      const firstRating = firstProduct.data?.list[0]?.rating;
      const secondRating = secondProduct.data?.list[0]?.rating;
      const firstReviewCount = firstProduct.data?.list[0]?.reviewCount;
      const secondReviewCount = secondProduct.data?.list[0]?.reviewCount;
      const firstFavoriteCount = firstProduct.data?.list[0]?.favoriteCount;
      const secondFavoriteCount = secondProduct.data?.list[0]?.favoriteCount;

      if (firstRating && secondRating) {
        if (firstRating > secondRating) {
          setFirstProductWin(firstProductWin + 1);
        } else if (firstRating < secondRating) {
          setSecondProductWin(secondProductWin + 1);
        }
      }

      if (firstReviewCount && secondReviewCount) {
        if (firstReviewCount > secondReviewCount) {
          setFirstProductWin(firstProductWin + 1);
        } else if (firstReviewCount < secondReviewCount) {
          setSecondProductWin(secondProductWin + 1);
        }
      }

      if (firstFavoriteCount && secondFavoriteCount) {
        if (firstFavoriteCount > secondFavoriteCount) {
          setFirstProductWin(firstProductWin + 1);
        } else if (firstFavoriteCount < secondFavoriteCount) {
          setSecondProductWin(secondProductWin + 1);
        }
      }

      if (firstProductWin === secondProductWin) {
        setWhoIsWin('draw');
      } else if (firstProductWin > secondProductWin) {
        setWhoIsWin('first');
      } else {
        setWhoIsWin('second');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <div className={styles.inputGroup} onClick={handleFirstInputClick}>
          <label htmlFor="firstProduct">상품 1</label>
          <input
            ref={firstProductId}
            value={firstInputValue}
            onChange={handleFirstInputValue}
            id="firstProduct"
            type="text"
            className={styles.input}
            disabled={isFirstInputDisabled}
          />
          <Filtering
            data={allProduct.data?.list?.map((product) => product.name) || []}
            parentRef={firstProductId}
            filterId={firstFilterId.current}
            setSelectedFilteringData={setSelectedFilteringData}
          />
          <div
            className={styles.firstChip}
            style={{ display: 'none' }}
            ref={firstChipRef}
          >
            <p className={styles.item}>{firstChip}</p>
            <div className={styles.item} onClick={handlefirstChipClose}>
              <Image
                src="/icon/ic-close.svg"
                alt="close"
                width={15}
                height={15}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputGroup} onClick={handleSecondInputClick}>
          <label htmlFor="secondProduct">상품 2</label>
          <input
            ref={secondProductId}
            value={secondInputValue}
            onChange={handleSecondInputValue}
            id="secondProduct"
            type="text"
            className={styles.input}
            disabled={isSecondInputDisabled}
          />
          <Filtering
            data={allProduct.data?.list?.map((product) => product.name) || []}
            parentRef={secondProductId}
            filterId={secondFilterId.current}
            setSelectedFilteringData={setSelectedFilteringData}
          />
          <div
            className={styles.secondChip}
            style={{ display: 'none' }}
            ref={secondChipRef}
          >
            <p className={styles.item}>{secondChip}</p>
            <div className={styles.item} onClick={handleSecondChipClose}>
              <Image
                src="/icon/ic-close.svg"
                alt="close"
                width={15}
                height={15}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleActionCompareButton}
          className={styles.button}
        >
          비교하기
        </button>
      </div>
    </div>
  );
};

export default Inputs;
