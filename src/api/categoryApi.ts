import axiosInstance from '@/lib/axiosInstance';
import sessionStorage from '@/api/storage/sessionStorage';
import { CategoryResponse } from '@/api/type/Category';

/*** 상품 카테고리 조회 ***/
export const getCategories = async (): Promise<CategoryResponse[]> => {
  const URL = `/categories`;
  console.log('GET - getCategories(): ', URL);

  try {
    const res = await axiosInstance.get(URL);

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as CategoryResponse[];
      sessionStorage.setItem(`getCategories`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to getCategories() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
