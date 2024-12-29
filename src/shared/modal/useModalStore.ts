import { create } from 'zustand';

interface ModalContent {
  isVisible: boolean;
  content: React.ReactNode;
}

interface ModalState {
  modals: { [key: string]: ModalContent };
  openModal: (id: string, content: React.ReactNode) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: {},
  openModal: (id: string, content: React.ReactNode) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isVisible: true, content } },
    })),
  closeModal: (id: string) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isVisible: false, content: null } },
    })),
}));

export default useModalStore;
