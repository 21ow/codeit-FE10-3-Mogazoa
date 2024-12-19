import axios from 'axios';
import axiosInstance from './axiosInstance';
import sessionStorage from './storage/sessionStorage';
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
  console.log('POST - postReviewsIdLike(): ', URL);

  try {
    const res = await axiosInstance.post(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ReviewResponse;
      sessionStorage.setItem(`postReviewsIdLike`, resData);

      return resData;
    } else {
      throw new Error(
        `Failed to postReviewsIdLike() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 리뷰 좋아요 취소 ***/
export const deleteReviewsLike = async (
  reviewId: number
): Promise<ReviewResponse> => {
  const URL = `/reviews/${reviewId}/like`;
  console.log('DELETE - deleteReviewsIdLike(): ', URL);

  try {
    const res = await axiosInstance.delete(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ReviewResponse;
      sessionStorage.setItem(`deleteReviewsIdLike`, resData);

      return resData;
    } else {
      throw new Error(
        `Failed to deleteReviewsIdLike() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 리뷰 생성 ***/
export const postReviews = async (
  data: ReviewRequest
): Promise<ReviewResponse> => {
  const URL = `/reviews`;
  console.log('POST - postReviews(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ReviewResponse;
      sessionStorage.setItem(`postReviews`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postReviews() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 리뷰 삭제 ***/
export const deleteReviews = async (
  reviewId: number
): Promise<DeleteReviewResponse> => {
  const URL = `/reviews/${reviewId}`;
  console.log('DELETE - deleteReviewsId(): ', URL);

  try {
    const res = await axios.delete(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as DeleteReviewResponse;
      sessionStorage.setItem(`deleteReviewsId`, resData);

      return resData;
    } else {
      throw new Error(
        `Failed to deleteReviewsId() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
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
  console.log('PATCH - patchReviewsId(): ', URL);

  try {
    const res = await axios.patch(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ReviewResponse;
      sessionStorage.setItem(`patchReviewsId`, resData);

      return resData;
    } else {
      throw new Error(
        `Failed to patchReviewsId() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
