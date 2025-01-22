'use client';

import Image from 'next/image';
import styles from './UserDetails.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getUsersInfo } from '@/api/userApi';

interface UserDetailsProps {
  userId?: string;
}

const UserDetails = ({ userId = '740' }: UserDetailsProps) => {
  const data = useQuery({
    queryKey: ['user'],
    queryFn: () => getUsersInfo(userId),
  })?.data;

  const onClick = () => {
    console.log('팔로우 버튼 클릭');
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={data?.image || '/image/catbody.svg'}
          alt={data?.nickname || '빈 이미지'}
          width={180}
          height={180}
        />
      </div>
      <div className={styles.description}>
        <p className={styles.nickname}>{data?.nickname}</p>
        {data?.description}
      </div>
      <div className={styles.follow}>
        <div className={styles.followItem}>
          <p className={styles.count}>{data?.followeesCount}</p>
          <p className={styles.followTitle}>팔로워</p>
        </div>
        <div className={styles.line}>|</div>
        <div className={styles.followItem}>
          <p className={styles.count}>{data?.followersCount}</p>
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
