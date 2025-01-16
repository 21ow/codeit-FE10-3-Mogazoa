import axiosInstance from '@/lib/axiosInstance';

import {
  UserResponse,
  PatchUserRequest,
  UserActionsResponse,
  UserRelationsResponse,
} from './type/User';

/*** 내 정보 조회 ***/
export const getUsersMe = async (): Promise<UserResponse> => {
  const URL = `/users/me`;
  const res = await axiosInstance.get(URL);
  return res.data;
};

/*** 내 정보 수정 ***/
export const patchUsersMe = async (
  data: PatchUserRequest
): Promise<UserResponse | null> => {
  const URL = `/users/me`;
  const res = await axiosInstance.patch(URL, data);
  return res.data;
};

/*** 유저 랭킹 조회 ***/
export const getUsersRanking = async (): Promise<UserResponse[]> => {
  const URL = `/users/ranking`;
  const res = await axiosInstance.get(URL);
  return res.data;
};

/*** 유저 정보 조회 ***/
export const getUsersInfo = async (userId: string): Promise<UserResponse> => {
  const URL = `/users/${userId}`;
  const res = await axiosInstance.get(URL);
  return res.data;
};

/*** 유저가 생성한 상품 조회 ***/
export const getUsersProducts = async (
  userId: string,
  cursor?: number
): Promise<UserActionsResponse> => {
  const URL = `/users/${userId}/created-products`;
  const res = await axiosInstance.get(URL, {
    params: cursor ? { cursor } : {},
  });
  return res.data;
};

/*** 유저가 리뷰한 상품 조회 ***/
export const getUsersReviews = async (
  userId: string,
  cursor?: number
): Promise<UserActionsResponse> => {
  const URL = `/users/${userId}/reviewed-products`;
  const res = await axiosInstance.get(URL, {
    params: cursor ? { cursor } : {},
  });
  return res.data;
};

/*** 유저가 찜한 상품 조회 ***/
export const getUsersLikes = async (
  userId: string,
  cursor?: number
): Promise<UserActionsResponse> => {
  const URL = `/users/${userId}/favorite-products`;
  const res = await axiosInstance.get(URL, {
    params: cursor ? { cursor } : {},
  });
  return res.data;
};

/*** 유저가 팔로우한 유저 조회 ***/
export const getUsersFollowing = async (
  userId: string,
  cursor?: number
): Promise<UserRelationsResponse> => {
  const URL = `/users/${userId}/followees`;
  const res = await axiosInstance.get(URL, {
    params: cursor ? { cursor } : {},
  });
  return res.data;
};

/*** 유저를 팔로우한 유저 조회 ***/
export const getUsersFollowers = async (
  userId: string,
  cursor?: number
): Promise<UserRelationsResponse> => {
  const URL = `/users/${userId}/followers`;
  const res = await axiosInstance.get(URL, {
    params: cursor ? { cursor } : {},
  });
  return res.data;
};
