/**
 * FE-001 — Auth Zustand store
 * Persists tokens to localStorage, exposes user state globally
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserResponse } from '@/lib/api/auth'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: UserResponse | null
  isAuthenticated: boolean
  setAuth: (accessToken: string, refreshToken: string, user: UserResponse) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user, isAuthenticated: true }),

      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'careeros-auth',
      // Only persist tokens and user — not functions
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
