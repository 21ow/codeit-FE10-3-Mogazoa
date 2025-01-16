import axiosInstance from '@/lib/axiosInstance';

import {
  ReviewRequest,
  ReviewResponse,
  DeleteReviewResponse,
  PatchReviewRequest,
} from './type/Review';

/*** 리뷰 좋아요 ***/
export const postReviewsLike = async (
  reviewId: number
): Promise<ReviewResponse> => {
  const URL = `/reviews/${reviewId}/like`;
  const res = await axiosInstance.post(URL);
  return res.data;
};

/*** 리뷰 좋아요 취소 ***/
export const deleteReviewsLike = async (
  reviewId: number
): Promise<ReviewResponse> => {
  const URL = `/reviews/${reviewId}/like`;
  const res = await axiosInstance.delete(URL);
  return res.data;
};

/*** 리뷰 생성 ***/
export const postReviews = async (
  data: ReviewRequest
): Promise<ReviewResponse> => {
  const URL = `/reviews`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};

/*** 리뷰 삭제 ***/
export const deleteReviews = async (
  reviewId: number
): Promise<DeleteReviewResponse> => {
  const URL = `/reviews/${reviewId}`;
  const res = await axiosInstance.delete(URL);
  return res.data;
};

/*** 리뷰 수정 ***/
/*
 * 이미지를 수정할 때, 기존 이미지를 유지하려면 id를, 새로운 이미지를 추가하려면 source를 넣어주세요.
 * 요청에 포함되지 않는 기존 이미지는 삭제됩니다.
 */
export const patchReviews = async (
  reviewId: number,
  data: PatchReviewRequest
): Promise<ReviewResponse> => {
  const URL = `/reviews/${reviewId}`;
  const res = await axiosInstance.patch(URL, data);
  return res.data;
};
