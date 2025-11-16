import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isLoading: true, // Start with loading true for the initial check
  login: (userData) => set({ user: userData, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useUserStore;