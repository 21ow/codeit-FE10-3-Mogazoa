import { createQueries } from '@/lib/createQueries';
import { CategoryResponse } from '@/api/type/Category';
import { UserResponse } from '@/api/type/User';

export const categoryQuery = createQueries<CategoryResponse[]>(`/categories`);

export const userQuery = createQueries<UserResponse>(`/users/me`);
