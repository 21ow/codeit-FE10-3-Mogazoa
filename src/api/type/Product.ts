export type GetProductsRequest = {
  keyword?: string;
  category?: number;
  order?: string;
  cursor?: number;
};

export type Product = {
  id: number;
  name: string;
  image?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  writerId?: number;
  categoryId?: number;
  favoriteCount?: number;
  reviewCount?: number;
};

export type GetProductsResponse = {
  nextCursor: number;
  list: Product[];
};

export type ProductRequest = {
  categoryId: number;
  image: string;
  description: string;
  name: string;
};

export type CategoryMetric = {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
};

export type Category = {
  name: string;
  id: number;
};

export type ProductResponse = {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
  categoryMetric: CategoryMetric;
  category: Category;
  isFavorite: boolean;
  description: string;
};

export type GetProductReviewsRequest = {
  order?: string;
  cursor?: number;
};

export type User = {
  image: string;
  nickname: string;
  id: number;
};

export type ReviewImage = {
  source: string;
  id: number;
};

export type Review = {
  user: User;
  reviewImages: ReviewImage[];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
};

export type GetProductReviewsResponse = {
  nextCursor: number;
  list: Review[];
};
