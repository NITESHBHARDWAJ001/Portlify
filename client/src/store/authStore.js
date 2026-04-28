import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        localStorage.setItem('token', token);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('token');
      },

      updateUser: (updatedUser) => {
        set({ user: updatedUser });
      },

      getToken: () => {
        return get().token || localStorage.getItem('token');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
