export type FollowRequest = {
  id: number;
};

export type FavoriteCategory = {
  name: 'string';
  id: number;
};

export type FollowResponse = {
  updatedAt: 'string';
  createdAt: 'string';
  teamId: 'string';
  image: 'string';
  description: 'string';
  nickname: 'string';
  id: number;
  mostFavoriteCategory: FavoriteCategory;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
};
