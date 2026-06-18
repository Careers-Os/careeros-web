'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'

/**
 * OAuth callback page (/auth/callback)
 * Picks up accessToken + refreshToken from URL params
 * after the API route completes the OAuth exchange,
 * stores them in Zustand, then redirects to dashboard.
 */
export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const error = searchParams.get('error')

    if (error || !accessToken || !refreshToken) {
      router.replace('/login?error=' + (error || 'oauth_failed'))
      return
    }

    // Decode user info from JWT payload (base64)
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]))
      const user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name || payload.email,
        targetRole: null,
        targetCompanies: [],
        experienceLevel: null,
      }
      setAuth(accessToken, refreshToken, user)
      router.replace('/dashboard')
    } catch {
      router.replace('/login?error=token_parse_failed')
    }
  }, [searchParams, setAuth, router])

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
      <div className="text-center">
        <svg className="mx-auto h-8 w-8 animate-spin text-[#22D3EE]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <p className="mt-4 text-sm text-slate-400">Completing sign in...</p>
      </div>
    </div>
  )
}
