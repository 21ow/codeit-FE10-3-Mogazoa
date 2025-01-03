import axiosInstance from '@/lib/axiosInstance';
import { FollowRequest, FollowResponse } from './type/Follow';

/*** 유저 팔로우 ***/
export const postFollow = async (
  data: FollowRequest
): Promise<FollowResponse> => {
  const URL = `/follow`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};

/*** 유저 언팔로우 ***/
export const deleteFollow = async (
  data: FollowRequest
): Promise<FollowResponse> => {
  const URL = `/follow`;
  const res = await axiosInstance.delete(URL, { data });
  return res.data;
};
