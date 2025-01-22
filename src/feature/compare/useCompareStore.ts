import { create } from 'zustand';

interface CompareState {
  firstProductName: string;
  secondProductName: string;
  isAactionCompareButton: boolean;
  whoIsWin: string;
  setFirstProductName: (id: string) => void;
  setSecondProductName: (id: string) => void;
  setActionCompareButton: (action: boolean) => void;
  setWhoIsWin: (id: string) => void;
}

const useCompareStore = create<CompareState>((set) => ({
  firstProductName: '',
  secondProductName: '',
  isAactionCompareButton: false,
  whoIsWin: '',
  setFirstProductName: (id: string) => set({ firstProductName: id }),
  setSecondProductName: (id: string) => set({ secondProductName: id }),
  setActionCompareButton: (action: boolean) =>
    set({ isAactionCompareButton: action }),
  setWhoIsWin: (id: string) => set({ whoIsWin: id }),
}));

export default useCompareStore;
