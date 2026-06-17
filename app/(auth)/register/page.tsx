'use client'

/**
 * FE-001 — Register page
 * Route: /register
 * Connects to POST /api/auth/register
 */

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { register, type ApiError } from '@/lib/api/auth'

export default function RegisterPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email'
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError(null)
    if (!validate()) return

    setLoading(true)
    try {
      const data = await register({ name: name.trim(), email, password })
      setAuth(data.accessToken, data.refreshToken, data.user)
      router.push('/dashboard')
    } catch (err) {
      const apiErr = err as ApiError
      if (apiErr.errors) {
        setErrors(apiErr.errors)
      } else {
        setGlobalError(apiErr.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] flex items-center justify-center px-4 py-12">
      {/* Background art */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/auth/logo-bg.jpg)',
          backgroundPosition: '75% 50%',
        }}
      />
      {/* Dark gradient overlay so form stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-[#070B14]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/30" />

      <div className="w-full max-w-md relative z-10">
        {/* Wordmark */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">
              Career<span className="text-[#22D3EE]">OS</span>
            </span>
          </span>
          <p className="mt-2 text-sm text-slate-400">Your AI career operating system</p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-cyan-400/[0.15] bg-white/[0.04] backdrop-blur-xl p-8 shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
          {/* Animated trace along the top edge */}
          <div className="pointer-events-none absolute -top-px left-8 right-8 h-px overflow-hidden rounded-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#67E8F9] to-transparent animate-trace" />
          </div>

          <h1 className="text-xl font-semibold text-white mb-1">Create your account</h1>
          <p className="text-sm text-slate-400 mb-8">
            Free forever · No credit card required
          </p>

          {globalError && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
              <p className="text-sm text-red-400">{globalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vikash Gautam"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.name
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#22D3EE]/60 focus:ring-[#22D3EE]/30'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.email
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#22D3EE]/60 focus:ring-[#22D3EE]/30'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.password
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#22D3EE]/60 focus:ring-[#22D3EE]/30'
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.confirmPassword
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#22D3EE]/60 focus:ring-[#22D3EE]/30'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#22D3EE] px-4 py-3 text-sm font-semibold text-[#070B14] transition hover:bg-[#67E8F9] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 focus:ring-offset-2 focus:ring-offset-[#070B14]"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#22D3EE] hover:text-[#67E8F9] font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Open source · MIT License ·{' '}
          <a
            href="https://github.com/Careers-Os"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  )
}