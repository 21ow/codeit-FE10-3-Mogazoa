'use client';
import { getUsersRanking } from '@/api/userApi';
import { useEffect, useState } from 'react';
import ImageComponent from '@/shared/Image/Images';
import styles from './RankingList.module.scss';

const RankingList = () => {
  const [rankingList, setRankingList] = useState<
    {
      image: string;
      nickname: string;
      followersCount: number;
      reviewCount: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getUsersRanking();

        const formattedData = data.map((user) => ({
          image: user.image,
          nickname: user.nickname,
          followersCount: user.followersCount,
          reviewCount: user.reviewCount,
        }));

        formattedData.sort((a, b) => b.followersCount - a.followersCount);

        setRankingList(formattedData);
      } catch (error) {
        console.error('오류', error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className={styles.reviewerRanking}>
      <h1 className={styles.reviewerRankingTitle}>리뷰어 랭킹</h1>
      <ul className={styles.reviewerRankingList}>
        {rankingList.slice(0, 10).map((user, index) => (
          <li className={styles.reviewerRankingItem} key={index}>
            <div className={styles.reviewerRankingInfo}>
              <div className={styles.reviewerRankingImage}>
                <ImageComponent
                  src={user.image}
                  alt={user.nickname}
                  width={42}
                  height={42}
                />
              </div>

              <div className={styles.reviewerRankingContent}>
                <div className={styles.reviewWrapper}>
                  <div
                    className={
                      index === 0
                        ? styles.reviewerRankingRankFirst
                        : index === 1
                          ? styles.reviewerRankingRankSecond
                          : styles.reviewerRankingRankDefault
                    }
                  >
                    {index + 1}등
                  </div>
                  <span className={styles.reviewerRankingNickname}>
                    {user.nickname}
                  </span>
                </div>
                <div className={styles.reviewerRankingWrapper}>
                  <span className={styles.reviewerRankingFollowers}>
                    팔로워 {user.followersCount}
                  </span>
                  <span className={styles.reviewerRankingReviews}>
                    리뷰 {user.reviewCount}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
