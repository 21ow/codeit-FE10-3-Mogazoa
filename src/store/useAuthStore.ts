import { create } from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
}));

export default useAuthStore;
