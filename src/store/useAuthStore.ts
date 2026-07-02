import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'OPERATOR' | 'ENGINEER';

interface AuthState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'OPERATOR', // Default role
      setRole: (role) => set({ role }),
    }),
    {
      name: 'motoriq-auth-storage',
    }
  )
);
