import { create } from 'zustand';

interface FavoriteData {
  isFavorite: boolean;
  favoriteCount: number;
  categoryMetric: {
    favoriteCount: number;
  };
}

interface FavoriteStore {
  favorites: { [productId: number]: boolean };
  favoriteCounts: { [productId: number]: number };
  setFavorite: (productId: number, isFavorite: boolean) => void;
  setFavoriteCount: (productId: number, favoriteCount: number) => void;
  toggleFavorite: (productId: number) => void;
  initializeFavorites: (initialData: Record<number, FavoriteData>) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: {},
  favoriteCounts: {},

  setFavorite: (productId, isFavorite) =>
    set((state) => {
      const wasFavorite = state.favorites[productId] || false;
      const currentCount = state.favoriteCounts[productId] || 0;

      const updatedCount =
        isFavorite && !wasFavorite
          ? currentCount + 1
          : !isFavorite && wasFavorite
            ? Math.max(0, currentCount - 1)
            : currentCount;

      return {
        favorites: { ...state.favorites, [productId]: isFavorite },
        favoriteCounts: { ...state.favoriteCounts, [productId]: updatedCount },
      };
    }),

  setFavoriteCount: (productId, favoriteCount) =>
    set((state) => ({
      favoriteCounts: { ...state.favoriteCounts, [productId]: favoriteCount },
    })),

  toggleFavorite: (productId) =>
    set((state) => {
      const isCurrentlyFavorite = state.favorites[productId] || false;
      const newFavorites = {
        ...state.favorites,
        [productId]: !isCurrentlyFavorite,
      };

      const currentCount = state.favoriteCounts[productId] || 0;
      const updatedCount = isCurrentlyFavorite
        ? Math.max(0, currentCount - 1)
        : currentCount + 1;

      return {
        favorites: newFavorites,
        favoriteCounts: { ...state.favoriteCounts, [productId]: updatedCount },
      };
    }),

  initializeFavorites: (initialData) =>
    set(() => {
      const favorites: { [productId: number]: boolean } = {};
      const favoriteCounts: { [productId: number]: number } = {};

      for (const productId in initialData) {
        const numericId = Number(productId);
        const data = initialData[numericId];

        favorites[numericId] = data.isFavorite;
        favoriteCounts[numericId] = data.favoriteCount;
      }

      return { favorites, favoriteCounts };
    }),
}));
