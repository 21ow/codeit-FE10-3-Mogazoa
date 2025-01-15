import axiosInstance from '@/lib/axiosInstance';
import {
  GetProductsRequest,
  GetProductsResponse,
  ProductRequest,
  ProductResponse,
  GetProductReviewsRequest,
  GetProductReviewsResponse,
} from './type/Product';

/*** 상품 목록 조회 ***/
export const getProducts = async (
  params: GetProductsRequest
): Promise<GetProductsResponse | null> => {
  const URL = `/products`;
  const res = await axiosInstance.get(URL, { params });
  return res.data || null;
};

/*** 상품 생성 ***/
export const postProducts = async (
  data: ProductRequest
): Promise<ProductResponse> => {
  const URL = `/products`;
  const res = await axiosInstance.post(URL, data);
  return res.data;
};

/*** 상품 상세 조회 ***/
export const getProductsDetail = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `/products/${productId}`;
  const res = await axiosInstance.get(URL);
  return res.data;
};

/*** 상품 수정 ***/
export const patchProducts = async (
  productId: number,
  data: ProductRequest
): Promise<ProductResponse> => {
  const URL = `/products/${productId}`;
  const res = await axiosInstance.patch(URL, data);
  return res.data;
};

/*** 상품 삭제 ***/
export const deleteProducts = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `/products/${productId}`;
  const res = await axiosInstance.delete(URL);
  return res.data;
};

/*** 상품 리뷰 목록 조회 ***/
export const getProductsReviews = async (
  productId: number,
  order = 'recent',

  cursor = 1
): Promise<GetProductReviewsResponse> => {
  const URL = `/products/${productId}`;
  const params: GetProductReviewsRequest = { order, cursor };
  const res = await axiosInstance.get(URL, { params });
  return res.data;
};

/*** 상품 찜하기 ***/
export const postProductsFavorite = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `products/${productId}/favorite`;
  const res = await axiosInstance.post(URL);
  return res.data;
};

/*** 상품 찜하기 취소 ***/
export const deleteProductsFavorite = async (
  productId: number
): Promise<ProductResponse> => {

  const URL = `/products/${productId}/favorite`;
  const res = await axiosInstance.delete(URL);
  return res.data;
};
