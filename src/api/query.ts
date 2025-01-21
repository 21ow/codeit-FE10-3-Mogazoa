import { createQueries } from '@/lib/createQueries';
import { CategoryResponse } from '@/api/type/Category';
import { UserResponse } from '@/api/type/User';

export const categoryQuery = createQueries<CategoryResponse[], null>(
  `/categories`
);

export const userQuery = createQueries<UserResponse, null>(`/users/me`);
