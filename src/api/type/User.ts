export type MostFavoriteCategory = {
  name: string;
  id: number;
};

export type UserResponse = {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
  mostFavoriteCategory: MostFavoriteCategory;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
};

export type PatchUserRequest = {
  description: string;
  nickname: string;
  image: string;
};

export type Item = {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
};

export type UserActionsResponse = {
  nextCursor: number;
  list: Item[];
};

export type UserRelation = {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
};

export type UserRelationsResponse = {
  nextCursor: number;
  list: Array<{
    follower?: UserRelation;
    followee?: UserRelation;
    id: number;
  }>;
};
