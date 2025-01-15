'use client';

import Image from 'next/image';
import styles from './UserDetails.module.scss';

interface mostFavoriteCategory {
  name?: string;
  id?: number;
}

interface UserDetails {
  createdAt?: string;
  updatedAt?: string;
  teamId?: string;
  image?: string;
  description?: string;
  nickname?: string;
  id?: number;
  mostFavoriteCategory?: mostFavoriteCategory;
  averageRating?: number;
  reviewCount?: number;
  followeesCount?: number;
  followersCount?: number;
  isFollowing?: boolean;
}

interface UserDetailsProps {
  data?: UserDetails;
}

const UserDetails = ({ data }: UserDetailsProps = {}) => {
  const { image, nickname, description, followeesCount, followersCount } =
    data || {};

  const onClick = () => {
    console.log('팔로우 버튼 클릭');
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={image || '/image/catbody.svg'}
          alt={nickname || '빈 이미지'}
          width={180}
          height={180}
        />
      </div>
      <div className={styles.description}>
        <p className={styles.nickname}>{nickname}</p>
        {description}
      </div>
      <div className={styles.follow}>
        <div className={styles.followItem}>
          <p className={styles.count}>{followeesCount}</p>
          <p className={styles.followTitle}>팔로워</p>
        </div>
        <div className={styles.line}>|</div>
        <div className={styles.followItem}>
          <p className={styles.count}>{followersCount}</p>
          <p className={styles.followTitle}>팔로잉</p>
        </div>
      </div>
      <button type="button" className={styles.button} onClick={onClick}>
        팔로우
      </button>
    </div>
  );
};

export default UserDetails;
