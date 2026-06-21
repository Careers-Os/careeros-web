'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function ResetPasswordInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

  useEffect(() => {
    if (!token) {
      setValidating(false)
      setTokenValid(false)
      return
    }
    fetch(`${API}/api/auth/reset-password/validate?token=${token}`)
      .then((r) => r.json())
      .then((data) => setTokenValid(data.valid))
      .catch(() => setTokenValid(false))
      .finally(() => setValidating(false))
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Reset failed')
      }
      setDone(true)
      setTimeout(() => router.push('/login' as any), 3000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
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

          {validating ? (
            <div className="flex items-center justify-center py-8">
              <svg className="h-6 w-6 animate-spin text-[#22D3EE]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            </div>
          ) : !tokenValid ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Link expired</h2>
              <p className="text-sm text-slate-400 mb-6">This reset link is invalid or has expired. Request a new one.</p>
              <Link href="/forgot-password" className="text-sm text-[#22D3EE] hover:text-[#67E8F9] transition font-medium">
                Request new link
              </Link>
            </div>
          ) : done ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Password reset!</h2>
              <p className="text-sm text-slate-400">Redirecting you to sign in...</p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-white mb-1">Set new password</h1>
              <p className="text-sm text-slate-400 mb-8">Choose a strong password for your account.</p>

              {error && (
                <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">New password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/30"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition">
                      {showPassword ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#22D3EE] px-4 py-3 text-sm font-semibold text-[#070B14] transition hover:bg-[#67E8F9] disabled:opacity-50"
                >
                  {loading ? 'Resetting...' : 'Reset password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-[#22D3EE]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    }>
      <ResetPasswordInner />
    </Suspense>
  )
}
