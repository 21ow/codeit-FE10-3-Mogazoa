import UserDetails from './details/UserDetails';
import UserHistory from './history/UserHistory';
import UserReviewedProduct from './reviewed/UserReviewedProduct';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const userReviewedDummyData = {
    averageRating: 4.5,
    reviewCount: 100,
    mostFavoriteCategory: {
      name: '냥이',
      id: 1,
    },
  };

  const userHistoryDummyData = [
    {
      updatedAt: '2021-08-01',
      createdAt: '2021-08-01',
      writerId: 1,
      categoryId: 1,
      favoriteCount: 100,
      reviewCount: 100,
      rating: 4.5,
      image: '/image/img-catbody.svg',
      name: '냥이',
      id: 1,
    },
    {
      updatedAt: '2021-08-01',
      createdAt: '2021-08-01',
      writerId: 1,
      categoryId: 1,
      favoriteCount: 100,
      reviewCount: 100,
      rating: 4.5,
      image: '/image/img-catbody.svg',
      name: '냥이',
      id: 2,
    },
  ];

  const userDetailsDummyData = {
    image: '/image/catbody.svg',
    nickname: '냥이',
    description: '안녕하세요',
    followeesCount: 100,
    followersCount: 100,
  };

  return (
    <div className={styles.container}>
      <UserDetails data={userDetailsDummyData} />
      <div className={styles.secondContainer}>
        <UserReviewedProduct data={userReviewedDummyData} />
        <UserHistory data={userHistoryDummyData} />
      </div>
    </div>
  );
};

export default UserProfile;
