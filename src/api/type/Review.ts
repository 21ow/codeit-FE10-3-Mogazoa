export type ReviewRequest = {
  productId: number;
  images: string[];
  content: string;
  rating: number;
};

export type User = {
  image: string;
  nickname: string;
  id: number;
};

export type ReviewImage = {
  source?: string;
  id?: number;
};

export type ReviewResponse = {
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

export type DeleteReviewResponse = {
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  rating: number;
  content: string;
  id: number;
};

export type PatchReviewRequest = {
  images: ReviewImage[];
  content: string;
  rating: number;
};
