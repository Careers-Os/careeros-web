'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { login, type ApiError } from '@/lib/api/auth'

export default function LoginPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
          <span className="text-2xl font-bold tracking-tight text-white">
            Careers<span className="text-[#22D3EE]">_OS</span>
          </span>
          <p className="mt-2 text-sm text-slate-400">Your AI career operating system</p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-cyan-400/[0.15] bg-white/[0.04] backdrop-blur-xl p-8 shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
          {/* Animated trace along the top edge */}
          <div className="pointer-events-none absolute -top-px left-8 right-8 h-px overflow-hidden rounded-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#67E8F9] to-transparent animate-trace" />
          </div>

          <h1 className="text-xl font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-slate-400 mb-8">Sign in to continue to your dashboard</p>

          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/30"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <Link href={"/forgot-password" as any} className="text-xs text-[#22D3EE] hover:text-[#67E8F9] transition">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/30"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#22D3EE] px-4 py-3 text-sm font-semibold text-[#070B14] transition hover:bg-[#67E8F9] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 focus:ring-offset-2 focus:ring-offset-[#070B14]"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            No account yet?{' '}
            <Link href="/register" className="text-[#22D3EE] hover:text-[#67E8F9] font-medium transition">
              Create one
            </Link>
          </p>
        </div>

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