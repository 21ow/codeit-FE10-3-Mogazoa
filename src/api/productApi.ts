import axiosInstance from '@/lib/axiosInstance';
import sessionStorage from './storage/sessionStorage';
import {
  GetProductResponse,
  ProductRequest,
  ProductResponse,
  GetProdcutReviewReQuest,
  GetProdcutReviewResponse,
} from './type/Product';

/*** 상품 목록 조회 ***/
export const getProducts = async (
  keyword: string = '',
  category: number = 0,
  order: string = 'recent',
  cursor: number = 0
): Promise<GetProductResponse | null> => {
  let URL = `/products?order=${order}&cursor=${cursor}`;

  if (keyword.trim() !== '') {
    URL += `&keyword=${keyword}`;
  }

  if (category > 0) {
    URL += `&category=${category}`;
  }

  console.log('GET - getProducts(): ', URL);

  try {
    const res = await axiosInstance.get(URL, {});

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as GetProductResponse;
      sessionStorage.setItem(`getProducts`, resData);

      return resData;
    } else {
      throw new Error('Failed to getProducts()');
    }
  } catch (error) {
    console.error('Error to getProducts():', error);
    throw error;
  }

  return null;
};

/*** 상품 생성 ***/
export const postProducts = async (
  data: ProductRequest
): Promise<ProductResponse> => {
  const URL = `/products`;
  console.log('POST - postProducts(): ', URL);

  try {
    const res = await axiosInstance.post(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProductResponse;
      sessionStorage.setItem(`postProducts`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postProducts() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 상품 상세 조회 ***/
export const getProductsDetail = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `/products/${productId}`;
  console.log('GET - getProductsId(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProductResponse;
      sessionStorage.setItem(`getProductsId`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getProductsId() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 상품 수정 ***/
export const patchProducts = async (
  productId: number,
  data: ProductRequest
): Promise<ProductResponse> => {
  const URL = `/products/${productId}`;
  console.log('PATCH - patchProductsId(): ', URL);

  try {
    const res = await axiosInstance.patch(URL, data);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProductResponse;
      sessionStorage.setItem(`patchProductsId`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to patchProductsId() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 상품 삭제 ***/
export const deleteProducts = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `/products/${productId}`;
  console.log('DELETE - deleteProductsId(): ', URL);

  try {
    const res = await axiosInstance.delete(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProductResponse;
      sessionStorage.setItem(`deleteProductsId`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to deleteProductsId() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 상품 리뷰 목록 조회 ***/
export const getProductsReviews = async (
  productId: number,
  order = 'recent',
  cursor = 0
): Promise<GetProdcutReviewResponse> => {
  const URL = `/products/${productId}/reviews?`;
  console.log('GET - getProductsIdReviews(): ', URL);

  const params: GetProdcutReviewReQuest = { order, cursor };

  try {
    const res = await axiosInstance.get(URL, { params });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as GetProdcutReviewResponse;
      sessionStorage.setItem(`getProductsIdReviews`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getProductsIdReviews() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 상품 찜하기 ***/
export const postProductsFavorite = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `products/${productId}/favorite`;
  console.log('POST - postProductsIdFavorite(): ', URL);

  try {
    const res = await axiosInstance.post(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProductResponse;
      sessionStorage.setItem(`postProductsIdFavorite`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postProductsIdFavorite() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};

/*** 상품 찜하기 취소 ***/
export const deleteProductsFavorite = async (
  productId: number
): Promise<ProductResponse> => {
  const URL = `/products/${productId}/favorite`;
  console.log('DELETE - deleteProductsIdFavorite(): ', URL);

  try {
    const res = await axiosInstance.delete(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProductResponse;
      sessionStorage.setItem(`deleteProductsIdFavorite`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to deleteProductsIdFavorite() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
