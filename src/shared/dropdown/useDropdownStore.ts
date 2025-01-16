import { create } from 'zustand';

interface DropdownContent {
  isVisible: boolean;
  content: React.ReactNode;
  selectedOption?: string;
}

interface DropdownState {
  dropdowns: { [key: string]: DropdownContent };
  openDropdown: (id: string, content?: React.ReactNode) => void;
  closeDropdown: (id: string) => void;
}

const useDropdownStore = create<DropdownState>((set) => ({
  dropdowns: {},
  openDropdown: (id: string, content: React.ReactNode) =>
    set((state) => ({
      dropdowns: { ...state.dropdowns, [id]: { isVisible: true, content } },
    })),
  closeDropdown: (id: string) =>
    set((state) => ({
      dropdowns: {
        ...state.dropdowns,
        [id]: { isVisible: false, content: null },
      },
    })),
}));

export default useDropdownStore;
