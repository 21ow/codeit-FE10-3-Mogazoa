import { useQuery } from '@tanstack/react-query';
import { userQuery } from '@/api/query';
import Link from 'next/link';
import Image from 'next/image';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const { data } = useQuery(userQuery.all());

  return (
    data && (
      <Link href="#" className={styles.userProfile}>
        <Image src={data.image} alt="프로필 사진" width={28} height={28} />
        <div>{data.nickname}</div>
      </Link>
    )
  );
};

export default UserProfile;
