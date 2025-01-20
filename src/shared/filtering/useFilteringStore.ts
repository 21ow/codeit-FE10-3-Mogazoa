import { create } from 'zustand';

interface FilteringState {
  filters: { [key: string]: FilterValue };
  setSelectedFilteringData: (id: string, value: string) => void;
}

interface FilterValue {
  value: string;
}

const useFilteringStore = create<FilteringState>((set) => ({
  filters: {},
  setSelectedFilteringData: (id: string, value: string) =>
    set((state) => ({
      filters: { ...state.filters, [id]: { value } },
    })),
}));

export default useFilteringStore;
