type ApiUrl = string | ((...args: string[]) => string);

type ApiMethod = {
  url: ApiUrl;
  storageKey: string | null;
  storageType: 'session' | 'local' | null;
  auth: boolean;
};

type ApiEndpoint = {
  [method in 'get' | 'post' | 'patch' | 'delete']?: ApiMethod;
};

const apiEndpoints: Record<string, ApiEndpoint> = {
  usersMe: {
    get: {
      url: `/users/me`,
      storageKey: 'me',
      storageType: 'session',
      auth: true,
    },
    patch: {
      url: `/users/me`,
      storageKey: 'me',
      storageType: 'session',
      auth: false,
    },
  },
  usersRanking: {
    get: {
      url: `/users/ranking`,
      storageKey: null,
      storageType: null,
      auth: false,
    },
  },
  userId: {
    get: {
      url: (userId: string) => `/users/${userId}`,
      storageKey: 'userId',
      storageType: 'session',
      auth: true,
    },
  },
  userCreated: {
    get: {
      url: (userId: string, cursor?: string) =>
        cursor === undefined
          ? `/users/${userId}/created-products`
          : `/users/${userId}/created-products/${cursor}`,
      storageKey: 'created-products',
      storageType: 'session',
      auth: false,
    },
  },
  userReviewed: {
    get: {
      url: (userId: string, cursor?: string) =>
        cursor === undefined
          ? `/users/${userId}/reviewed-products`
          : `/users/${userId}/reviewed-products/${cursor}`,
      storageKey: 'reviewed-products',
      storageType: 'session',
      auth: false,
    },
  },
  usersFavorite: {
    get: {
      url: (userId: string, cursor?: string) =>
        cursor === undefined
          ? `/users/${userId}/favorite-products`
          : `/users/${userId}/favorite-products/${cursor}`,
      storageKey: 'favorite-products',
      storageType: 'session',
      auth: false,
    },
  },
  usersFollowing: {
    get: {
      url: (userId: string, cursor?: string) =>
        cursor === undefined
          ? `/users/${userId}/followees`
          : `/users/${userId}/followees/${cursor}`,
      storageKey: 'followees',
      storageType: 'session',
      auth: false,
    },
  },
  usersFollowers: {
    get: {
      url: (userId: string, cursor?: string) =>
        cursor === undefined
          ? `/users/${userId}/followers`
          : `/users/${userId}/followers/${cursor}`,
      storageKey: 'followers',
      storageType: 'session',
      auth: false,
    },
  },
  reviewsLike: {
    get: {
      url: (reviewId: string) => `/reviews/${reviewId}/like`,
      storageKey: 'reviewsLike',
      storageType: 'session',
      auth: true,
    },
    delete: {
      url: (reviewId: string) => `/reviews/${reviewId}/like`,
      storageKey: 'reviewsLike',
      storageType: 'session',
      auth: false,
    },
  },
  reviews: {
    post: {
      url: `/reviews`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
  },
  reviewId: {
    delete: {
      url: (reviewId: string) => `/reviews/${reviewId}`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
    patch: {
      url: (reviewId: string) => `/reviews/${reviewId}`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
  },
  products: {
    get: {
      url: (keyword, category, order, cursor) => {
        const params = new URLSearchParams({
          keyword: encodeURIComponent(keyword),
          category: category.toString(),
          order,
          cursor: cursor.toString(),
        }).toString();
        return `/products?${params}`;
      },
      storageKey: null,
      storageType: null,
      auth: true,
    },
    post: {
      url: `/products`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
  },
  productId: {
    get: {
      url: (productId: string) => `/products/${productId}`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
    patch: {
      url: (productId: string) => `/products/${productId}`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
    delete: {
      url: (productId: string) => `/products/${productId}`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
  },
  productReviews: {
    get: {
      url: (productId, order, cursor) => {
        const params = new URLSearchParams({
          productId,
          order,
          cursor: cursor.toString(),
        }).toString();
        return `/products?${params}`;
      },
      storageKey: null,
      storageType: null,
      auth: true,
    },
  },
  productFavorite: {
    post: {
      url: (productId: string) => `products/${productId}/favorite`,
      storageKey: 'productFavorite',
      storageType: 'session',
      auth: true,
    },
    delete: {
      url: (productId: string) => `products/${productId}/favorite`,
      storageKey: 'productFavorite',
      storageType: 'session',
      auth: true,
    },
  },
  oauth: {
    post: {
      url: `/oauthApps`,
      storageKey: 'oauthApps',
      storageType: 'local',
      auth: true,
    },
  },
  image: {
    post: {
      url: `/images/upload`,
      storageKey: null,
      storageType: null,
      auth: true,
    },
  },
  follow: {
    post: {
      url: `/follow`,
      storageKey: 'follow',
      storageType: 'session',
      auth: true,
    },
    delete: {
      url: `/follow`,
      storageKey: 'follow',
      storageType: 'session',
      auth: true,
    },
  },
  categories: {
    get: {
      url: `/categories`,
      storageKey: null,
      storageType: null,
      auth: false,
    },
  },
  authSignUp: {
    post: {
      url: `/auth/signUp`,
      storageKey: 'signUp',
      storageType: 'local',
      auth: false,
    },
  },
  authSignIn: {
    post: {
      url: `auth/signIn`,
      storageKey: 'signIn',
      storageType: 'session',
      auth: false,
    },
  },
  socialSignUp: {
    post: {
      url: (provider: string) => `/auth/signUp/${provider}`,
      storageKey: 'socialSignUp',
      storageType: 'local',
      auth: false,
    },
  },
  socialSignIn: {
    post: {
      url: (provider: string) => `/auth/signIn/${provider}`,
      storageKey: 'socialSignIn',
      storageType: 'session',
      auth: false,
    },
  },
};

export default apiEndpoints;
