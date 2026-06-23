import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  targetRole?: string | null
  targetCompanies?: string[]
  experienceLevel?: string | null
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setAuth: (accessToken: string, refreshToken: string, user: AuthUser) => void
  clearAuth: () => void
  updateUser: (user: Partial<AuthUser>) => void
}

// Cookie helpers — runs only in browser
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (accessToken, refreshToken, user) => {
        // Write to cookie so Next.js middleware can read it server-side
        setCookie('careeros_access_token', accessToken)
        set({ accessToken, refreshToken, user, isAuthenticated: true })
      },

      clearAuth: () => {
        deleteCookie('careeros_access_token')
        set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false })
      },

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: 'careeros-auth',
      // Only persist non-sensitive fields to localStorage for UX convenience
      // The real auth source of truth is the cookie (middleware) + in-memory token
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        refreshToken: state.refreshToken,
      }),
    }
  )
)
