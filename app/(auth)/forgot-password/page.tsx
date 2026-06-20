'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      if (!res.ok) throw new Error('Request failed')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/auth/logo-bg.jpg)', backgroundPosition: '75% 50%' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-[#070B14]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/30" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            Career<span className="text-[#22D3EE]">OS</span>
          </span>
          <p className="mt-2 text-sm text-slate-400">Your AI career operating system</p>
        </div>

        <div className="relative rounded-2xl border border-cyan-400/[0.15] bg-white/[0.04] backdrop-blur-xl p-8 shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
          <div className="pointer-events-none absolute -top-px left-8 right-8 h-px overflow-hidden rounded-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#67E8F9] to-transparent" />
          </div>

          {sent ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Check your email</h2>
              <p className="text-sm text-slate-400 mb-6">
                If <span className="text-white">{email}</span> is registered, you'll receive a reset link within a few minutes.
              </p>
              <Link href="/login" className="text-sm text-[#22D3EE] hover:text-[#67E8F9] transition">
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-white mb-1">Forgot password?</h1>
              <p className="text-sm text-slate-400 mb-8">Enter your email and we'll send you a reset link.</p>

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
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#22D3EE] px-4 py-3 text-sm font-semibold text-[#070B14] transition hover:bg-[#67E8F9] disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Remember it?{' '}
                <Link href="/login" className="text-[#22D3EE] hover:text-[#67E8F9] font-medium transition">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
