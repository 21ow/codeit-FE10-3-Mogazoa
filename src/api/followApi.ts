import axiosInstance from '@/lib/axiosInstance';
import sessionStorage from '@/api/storage/sessionStorage';
import { FollowRequest, FollowResponse } from './type/Follow';

/*** 유저 팔로우 ***/
export const postFollow = async (
  data: FollowRequest
): Promise<FollowResponse> => {
  const URL = `/follow`;
  console.log('POST - postFollow(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as FollowResponse;
      sessionStorage.setItem(`postFollow`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postFollow() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 유저 언팔로우 ***/
export const deleteFollow = async (
  data: FollowRequest
): Promise<FollowResponse> => {
  const URL = `/follow`;
  console.log('DELETE - deleteFollow(): ', URL);

  try {
    const res = await axiosInstance.delete(URL, { data });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as FollowResponse;
      sessionStorage.setItem(`deleteFollow`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to deleteFollow() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
