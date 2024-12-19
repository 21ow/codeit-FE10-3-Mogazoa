import axiosInstance from './axiosInstance';
import sessionStorage from './storage/sessionStorage';
import {
  UserResponse,
  PatchUserRequest,
  UserActionResponse,
  UserRelationsResponse,
} from './type/User';

/*** 내 정보 조회 ***/
export const getUsersMe = async (): Promise<UserResponse> => {
  const URL = `/users/me`;
  console.log('GET - getUsersMe(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserResponse;
      sessionStorage.setItem(`getUsersMe`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUsersMe() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 내 정보 수정 ***/
export const patchUsersMe = async (
  data: PatchUserRequest
): Promise<UserResponse | null> => {
  const URL = `/users/me`;
  console.log('PATCH - patchUsersMe(): ', URL);

  try {
    const res = await axiosInstance.patch(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserResponse;
      sessionStorage.setItem(`patchUsersMe`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to patchUsersMe() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저 랭킹 조회 ***/
export const getUsersRanking = async (): Promise<UserResponse[]> => {
  const URL = `/users/ranking`;
  console.log('GET - getUsersRanking(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserResponse[];
      sessionStorage.setItem(`getUsersRanking`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUsersRanking() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저 정보 조회 ***/
export const getUsersInfo = async (userId: string): Promise<UserResponse> => {
  const URL = `/users/${userId}`;
  console.log('GET - getUserId(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserResponse;
      sessionStorage.setItem(`getUserId`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUserId() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저가 생성한 상품 조회 ***/
export const getUsersProducts = async (
  userId: string,
  cursor?: number
): Promise<UserActionResponse> => {
  const URL =
    cursor === undefined
      ? `/users/${userId}/created-products`
      : `/users/${userId}/created-products/${cursor}`;
  console.log('GET - getUserIdCreatedProducts(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserActionResponse;
      sessionStorage.setItem(`getUserIdCreatedProducts`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUserIdCreatedProducts() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저가 리뷰한 상품 조회 ***/
export const getUsersReviews = async (
  userId: string,
  cursor?: number
): Promise<UserActionResponse> => {
  const URL =
    cursor === undefined
      ? `/users/${userId}/reviewed-products`
      : `/users/${userId}/reviewed-products/${cursor}`;
  console.log('GET - getUserIdReviewedProducts(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserActionResponse;
      sessionStorage.setItem(`getUserIdReviewedProducts`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUserIdReviewedProducts() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저가 찜한 상품 조회 ***/
export const getUsersLikes = async (
  userId: string,
  cursor?: number
): Promise<UserActionResponse> => {
  const URL =
    cursor === undefined
      ? `/users/${userId}/favorite-products`
      : `/users/${userId}/favorite-products/${cursor}`;
  console.log('GET - getUserIdFavoriteProducts(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserActionResponse;
      sessionStorage.setItem(`getUserIdFavoriteProducts`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUserIdFavoriteProducts() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저가 팔로우한 유저 조회 ***/
export const getUsersFollowing = async (
  userId: string,
  cursor?: number
): Promise<UserRelationsResponse> => {
  const URL =
    cursor === undefined
      ? `/users/${userId}/followees`
      : `/users/${userId}/followees/${cursor}`;
  console.log('GET - getUserIdFollowees(): ', URL);

  try {
    const res = await axiosInstance.get(URL, {
      headers: {
        accept: 'application/json',
      },
    });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserRelationsResponse;
      sessionStorage.setItem(`getUserIdFollowees`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUserIdFollowees() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저를 팔로우한 유저 조회 ***/
export const getUsersFollowers = async (
  userId: string,
  cursor?: number
): Promise<UserRelationsResponse> => {
  const URL =
    cursor === undefined
      ? `/users/${userId}/followers`
      : `/users/${userId}/followers/${cursor}`;
  console.log('GET - getUserIdFollowers(): ', URL);

  try {
    const res = await axiosInstance.get(URL, {
      headers: {
        accept: 'application/json',
      },
    });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as UserRelationsResponse;
      sessionStorage.setItem(`getUserIdFollowers`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getUserIdFollowers() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
