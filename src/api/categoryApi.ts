import axiosInstance from '@/lib/axiosInstance';
import { CategoryResponse } from '@/api/type/Category';

/*** 상품 카테고리 조회 ***/
export const getCategories = async (): Promise<CategoryResponse[]> => {
  const URL = `/categories`;
  const res = await axiosInstance.get(URL);
  return res.data;
};
