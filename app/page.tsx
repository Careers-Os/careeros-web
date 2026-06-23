'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// ── Feature cards data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '⚡',
    title: 'Resume Analyzer',
    description:
      'ATS score, keyword gaps, section-by-section fixes. Know exactly why your resume does or doesn\'t get shortlisted.',
    tag: 'Live',
    href: '/resume',
  },
  {
    icon: '🎯',
    title: 'Recruiter Simulator',
    description:
      'Predicts your shortlist probability before you apply. See your resume the way a recruiter sees it.',
    tag: 'Live',
    href: '/resume',
  },
  {
    icon: '🎤',
    title: 'AI Interview Coach',
    description:
      'Mock interviews tailored to your resume and target company. Real-time feedback on every answer.',
    tag: 'Coming soon',
    href: '/interview',
  },
  {
    icon: '🔍',
    title: 'Skill Gap Analyzer',
    description:
      'Exactly what you\'re missing for your target role — not a generic list, personalized to your profile.',
    tag: 'Coming soon',
    href: '/roadmap',
  },
  {
    icon: '🗺️',
    title: 'Learning Roadmap',
    description:
      'Day-by-day personalized prep plan that bridges your skill gaps and tracks your progress.',
    tag: 'Coming soon',
    href: '/roadmap',
  },
  {
    icon: '📋',
    title: 'Application Tracker',
    description:
      'Kanban board for your entire job search. Never lose track of where you stand with any company.',
    tag: 'Coming soon',
    href: '/tracker',
  },
]

const STATS = [
  { value: '11', label: 'AI nodes per analysis' },
  { value: '6', label: 'ATS scoring categories' },
  { value: '100%', label: 'open source, MIT license' },
]

// ── Animated grid background ─────────────────────────────────────────────────
function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Radial glow top-left */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#22D3EE] opacity-[0.04] blur-3xl" />
      {/* Radial glow bottom-right */}
      <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-500 opacity-[0.05] blur-3xl" />
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070B14]/90 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold tracking-tight text-white">
          Career<span className="text-[#22D3EE]">OS</span>
        </span>
        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a
            href="https://github.com/Careers-Os"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-[#22D3EE] px-4 py-1.5 text-sm font-semibold text-[#070B14] hover:bg-[#06b6d4] transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <GridBackground />

      {/* Badge */}
      <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
        <span className="text-xs font-medium text-[#22D3EE] tracking-wide uppercase">
          Open source · MIT License
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
        Your career,{' '}
        <span className="text-[#22D3EE]">operating</span>{' '}
        as a system
      </h1>

      <p className="relative mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
        Seven disconnected tools for resumes, interviews, applications, and skill gaps —
        replaced by one AI platform that knows your full profile and actually helps you land the job.
      </p>

      {/* CTAs */}
      <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/register"
          className="rounded-xl bg-[#22D3EE] px-8 py-3.5 text-base font-bold text-[#070B14] hover:bg-[#06b6d4] transition-all hover:scale-[1.02] active:scale-100"
        >
          Start for free
        </Link>
        <a
          href="https://github.com/Careers-Os"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-8 py-3.5 text-base font-semibold text-white hover:bg-white/[0.06] transition-all"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          View on GitHub
        </a>
      </div>

      {/* Stats */}
      <div className="relative mt-16 grid grid-cols-3 gap-8 border-t border-white/[0.06] pt-10">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-3xl font-extrabold text-[#22D3EE]">{value}</p>
            <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Problem section ───────────────────────────────────────────────────────────
function Problem() {
  const tools = [
    'ATS checker',
    'Mock interview app',
    'Resume builder',
    'Job tracker spreadsheet',
    'Skill gap finder',
    'LinkedIn optimizer',
    'Application deadline calendar',
  ]

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24" id="problem">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
            The problem
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Most people don't fail at interviews.{' '}
            <span className="text-slate-400">They fail before anyone reads their resume.</span>
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed">
            Placement prep means juggling a different tool for every task, none of which know who you are or what you're trying to achieve. Context gets lost. Progress resets. The work multiplies.
          </p>
          <p className="mt-4 text-slate-400 leading-relaxed">
            CareerOS replaces the stack with one platform that holds your full context — your resume, target role, skill gaps, applications, and prep history — and uses it everywhere.
          </p>
        </div>
        <div className="space-y-3">
          {tools.map((tool, i) => (
            <div
              key={tool}
              className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-4 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-red-500/30 bg-red-500/10 text-xs font-bold text-red-400">
                {i + 1}
              </span>
              <span className="text-sm text-slate-400">{tool}</span>
              <span className="ml-auto text-xs text-slate-600">separate tab</span>
            </div>
          ))}
          <div className="mt-2 rounded-lg border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-4 py-3 text-sm text-[#22D3EE]">
            → CareerOS replaces all of these
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Features grid ─────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24" id="features">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
          What's inside
        </p>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Seven modules. One context.
        </h2>
        <p className="mt-4 mx-auto max-w-xl text-slate-400">
          Every module knows your resume, your target role, and your history. They share context. Work done in one flows into all the others.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-[#22D3EE]/20 hover:bg-white/[0.04]"
          >
            {/* Live badge */}
            <span
              className={`absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                f.tag === 'Live'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-white/[0.04] text-slate-500 border border-white/[0.06]'
              }`}
            >
              {f.tag}
            </span>

            <div className="mb-4 text-2xl">{f.icon}</div>
            <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>

            {f.tag === 'Live' && (
              <Link
                href={f.href}
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:gap-2 transition-all"
              >
                Try it →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── How it works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Upload your resume',
      body: 'PDF or DOCX. CareerOS parses it, scores it against ATS criteria, and builds your profile.',
    },
    {
      step: '02',
      title: 'Set your target role',
      body: 'Tell us the role and companies you\'re targeting. Every analysis from here uses that as its benchmark.',
    },
    {
      step: '03',
      title: 'Close the gap',
      body: 'Resume fixes, interview prep, skill roadmap — all generated from your actual profile, not a template.',
    },
  ]

  return (
    <section
      className="relative mx-auto max-w-6xl px-6 py-24"
      id="how-it-works"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
          How it works
        </p>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Three steps from today to offer
        </h2>
      </div>

      <div className="relative grid gap-8 md:grid-cols-3">
        {/* Connector line */}
        <div className="absolute top-8 left-[16.67%] right-[16.67%] hidden h-px bg-gradient-to-r from-transparent via-[#22D3EE]/20 to-transparent md:block" />

        {steps.map(({ step, title, body }) => (
          <div key={step} className="relative text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/5">
              <span className="font-mono text-sm font-bold text-[#22D3EE]">{step}</span>
            </div>
            <h3 className="mb-2 font-semibold text-white">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Open source section ───────────────────────────────────────────────────────
function OpenSource() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[#22D3EE]/10 bg-[#22D3EE]/[0.03] px-8 py-14 text-center md:px-16">
        {/* Background accent */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-[#22D3EE] opacity-[0.04] blur-3xl" />
        </div>

        <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
          100% open source
        </p>
        <h2 className="relative mb-5 text-3xl font-extrabold text-white md:text-4xl">
          Built in public. Built with contributors.
        </h2>
        <p className="relative mx-auto mb-8 max-w-lg text-slate-400">
          CareerOS is MIT licensed. Every line of code is on GitHub. We're actively looking for contributors in frontend, backend, AI engineering, and DevOps.
        </p>

        <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/Careers-Os"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-7 py-3 font-semibold text-white hover:bg-[#22D3EE]/10 transition-all"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Star on GitHub
          </a>
          <a
            href="https://github.com/Careers-Os/careeros-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-2"
          >
            Read the contribution guide
          </a>
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-32 text-center">
      <h2 className="text-3xl font-extrabold text-white md:text-5xl">
        Ready to run your job search<br />
        <span className="text-[#22D3EE]">like a system?</span>
      </h2>
      <p className="mt-5 text-slate-400">
        Free. Open source. No credit card required.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/register"
          className="rounded-xl bg-[#22D3EE] px-10 py-4 text-base font-bold text-[#070B14] hover:bg-[#06b6d4] transition-all hover:scale-[1.02] active:scale-100"
        >
          Create free account
        </Link>
        <Link
          href="/login"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Already have an account? Sign in →
        </Link>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8 text-center text-xs text-slate-600">
      <p>
        CareerOS · Open source AI career platform ·{' '}
        <a
          href="https://github.com/Careers-Os"
          className="hover:text-slate-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/Careers-Os
        </a>
      </p>
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <Nav />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <OpenSource />
      <CTA />
      <Footer />
    </main>
  )
}
