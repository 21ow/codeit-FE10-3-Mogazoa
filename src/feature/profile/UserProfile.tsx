'use client';

import UserDetails from './details/UserDetails';
import UserHistory from './history/UserHistory';
import UserReviewedProduct from './reviewed/UserReviewedProduct';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <UserDetails />
      <div className={styles.secondContainer}>
        <UserReviewedProduct />
        <UserHistory />
      </div>
    </div>
  );
};

export default UserProfile;
