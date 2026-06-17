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
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-12">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">
              Career<span className="text-[#6366F1]">OS</span>
            </span>
          </span>
          <p className="mt-2 text-sm text-zinc-500">Your AI career operating system</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8">
          <h1 className="text-xl font-semibold text-white mb-1">Create your account</h1>
          <p className="text-sm text-zinc-500 mb-8">
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
              <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vikash Gautam"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.name
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#6366F1]/60 focus:ring-[#6366F1]/30'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.email
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#6366F1]/60 focus:ring-[#6366F1]/30'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.password
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#6366F1]/60 focus:ring-[#6366F1]/30'
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/[0.04] outline-none transition focus:ring-1 ${
                  errors.confirmPassword
                    ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#6366F1]/60 focus:ring-[#6366F1]/30'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#6366F1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5457E5] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0F]"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#6366F1] hover:text-[#818CF8] font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          Open source · MIT License ·{' '}
          <a
            href="https://github.com/Careers-Os"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  )
}
