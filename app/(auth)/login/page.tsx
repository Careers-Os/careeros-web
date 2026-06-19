'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { login, type ApiError } from '@/lib/api/auth'

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="#0A66C2" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await login({ email, password })
      setAuth(data.accessToken, data.refreshToken, data.user)
      router.push('/dashboard')
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  function handleSocialAuth(provider: string) {
    setSocialLoading(provider)
    window.location.href = `/api/auth/${provider}`
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(/auth/logo-bg.jpg)', backgroundPosition: '75% 50%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-[#070B14]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/30" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
{/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            Career<span className="text-[#22D3EE]">OS</span>
          </span>
          <p className="mt-2 text-sm text-slate-400">Your AI career operating system</p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-cyan-400/[0.15] bg-white/[0.04] backdrop-blur-xl p-8 shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
          <div className="pointer-events-none absolute -top-px left-8 right-8 h-px overflow-hidden rounded-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#67E8F9] to-transparent animate-trace" />
          </div>

          <h1 className="text-xl font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-slate-400 mb-6">Sign in to continue to your dashboard</p>

          {/* Social auth */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { id: 'google', icon: <GoogleIcon />, label: 'Google' },
              { id: 'linkedin', icon: <LinkedInIcon />, label: 'LinkedIn' },
              { id: 'github', icon: <GitHubIcon />, label: 'GitHub' },
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => handleSocialAuth(id)}
                disabled={!!socialLoading}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:border-white/[0.15] hover:bg-white/[0.06] disabled:opacity-50"
              >
                {socialLoading === id ? (
                  <svg className="h-4 w-4 animate-spin text-[#22D3EE]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : icon}
                {label}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0D1117] px-3 text-slate-500">or continue with email</span>
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/30"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                <Link href={"/forgot-password" as any} className="text-xs text-[#22D3EE] hover:text-[#67E8F9] transition">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#22D3EE] px-4 py-3 text-sm font-semibold text-[#070B14] transition hover:bg-[#67E8F9] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            No account yet?{' '}
            <Link href="/register" className="text-[#22D3EE] hover:text-[#67E8F9] font-medium transition">Create one free</Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Open source · MIT License ·{' '}
          <a href="https://github.com/Careers-Os" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition">GitHub</a>
        </p>
      </div>
    </div>
  )
}
