import { create } from 'zustand';

type Category = {
  selectedCategory: number | undefined;
  setCategory: (category: number) => void;
};

const useCategoryStore = create<Category>((set) => ({
  selectedCategory: undefined,
  setCategory: (id) =>
    set((state) => {
      if (state.selectedCategory !== id) {
        return { selectedCategory: id };
      }
      return {};
    }),
}));

export default useCategoryStore;
