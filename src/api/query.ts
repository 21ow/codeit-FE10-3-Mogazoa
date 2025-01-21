import { createQueries } from '@/lib/createQueries';
import { CategoryResponse } from '@/api/type/Category';
import { UserResponse } from '@/api/type/User';
import { GetProductsRequest, GetProductsResponse } from '@/api/type/Product';

export const categoryQuery = createQueries<CategoryResponse[], null>(
  `/categories`
);

export const userQuery = createQueries<UserResponse, null>(`/users/me`);

export const productsQuery = (params: GetProductsRequest) =>
  createQueries<GetProductsResponse, GetProductsRequest>(`/products`, params);
