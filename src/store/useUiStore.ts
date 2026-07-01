import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      isMobileDrawerOpen: false,
      setMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
    }),
    {
      name: 'motoriq-ui-storage',
      partialize: (state) => ({ isSidebarCollapsed: state.isSidebarCollapsed }), // Only persist sidebar state
    }
  )
);
