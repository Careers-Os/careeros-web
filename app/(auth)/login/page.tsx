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
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md relative">
        <div className="mb-10 text-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            Career<span className="text-[#6366F1]">OS</span>
          </span>
          <p className="mt-2 text-sm text-zinc-500">Your AI career operating system</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
          <h1 className="text-xl font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-zinc-500 mb-8">Sign in to continue to your dashboard</p>
          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#6366F1]/60 focus:ring-1 focus:ring-[#6366F1]/30" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</label>
                <Link href={"/forgot-password" as any} className="text-xs text-[#6366F1] hover:text-[#818CF8]">Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#6366F1]/60 focus:ring-1 focus:ring-[#6366F1]/30" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-[#6366F1] px-4 py-3 text-sm font-semibold text-white hover:bg-[#5457E5] disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-500">
            No account yet?{' '}
            <Link href="/register" className="text-[#6366F1] hover:text-[#818CF8] font-medium">Create one</Link>
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-600">
          Open source · MIT License · <a href="https://github.com/Careers-Os" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400">GitHub</a>
        </p>
      </div>
    </div>
  )
}