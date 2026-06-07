<div align="center">

<h1>🚀 CareerOS — Web App</h1>
<p><strong>AI-powered Career Operating System for students and job seekers</strong></p>

<p>
  <a href="https://github.com/Careers-Os/careeros-web/stargazers"><img src="https://img.shields.io/github/stars/career-os/careeros-web?style=flat-square&color=1A56DB" alt="Stars"></a>
  <a href="https://github.com/Careers-Os/careeros-web/issues"><img src="https://img.shields.io/github/issues/career-os/careeros-web?style=flat-square&color=1A56DB" alt="Issues"></a>
  <a href="https://github.com/Careers-Os/careeros-web/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square" alt="Contributing"></a>
</p>

<p>
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

## 🧠 What is CareerOS?

CareerOS is an open-source AI platform that replaces the 5–8 disconnected tools job seekers currently juggle.
Instead of switching between ATS checkers, mock interview platforms, job trackers, and LinkedIn tools —
everything lives in one intelligent system that knows your resume, your target role, and your progress.

> Built by a job seeker, for job seekers. Every pain point in this product is real.

---

## ✨ Features

| Module | Description | Status |
|--------|-------------|--------|
| 📄 **Resume Analyzer** | ATS scoring, keyword gaps, section completeness | 🔨 In Progress |
| 🎯 **Recruiter Simulator** | Predicts shortlist probability for your resume | 📋 Planned |
| 🎤 **AI Interview Coach** | Mock interviews tailored to your resume + target company | 📋 Planned |
| 🔍 **Skill Gap Analyzer** | What you're missing for your target role | 📋 Planned |
| 🗺️ **Learning Roadmap** | Day-by-day personalized prep plan | 📋 Planned |
| 📋 **Job Tracker** | Kanban board for all your applications | 📋 Planned |
| 💼 **LinkedIn Optimizer** | Profile scoring + post generator | 📋 Planned |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Next.js Frontend                    │
│         (TypeScript + Tailwind + shadcn/ui)          │
└──────────────────────┬──────────────────────────────┘
                       │ REST / WebSocket
┌──────────────────────▼──────────────────────────────┐
│              Spring Cloud Gateway                    │
│            (Routing + Rate Limiting)                 │
└──────┬────────────┬────────────┬────────────┬───────┘
       │            │            │            │
  ┌────▼───┐  ┌─────▼──┐  ┌─────▼──┐  ┌─────▼──┐
  │  User  │  │Resume  │  │Intervw │  │  Job   │
  │Service │  │Service │  │Service │  │Tracker │
  └────┬───┘  └────┬───┘  └────┬───┘  └────┬───┘
       └────────────┴──────────┴────────────┘
                       │
              ┌────────▼────────┐
              │   AI Layer      │
              │ LangGraph Agent │
              │  Qdrant Vector  │
              │  OpenAI / Groq  │
              └─────────────────┘
```

📖 Full architecture details → [careeros-docs](https://github.com/Careers-Os/careeros-docs)

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query) — async state
- [Zustand](https://zustand-demo.pmnd.rs/) — client state
- [Recharts](https://recharts.org/) — analytics

**Connects to**
- [careeros-api](https://github.com/career-os/careeros-api) — Spring Boot backend
- [careeros-ai](https://github.com/career-os/careeros-ai) — LangGraph AI agents

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- careeros-api running locally (see [careeros-api setup](https://github.com/Careers-Os/careeros-api#getting-started))

### Installation

```bash
# Clone the repository
git clone https://github.com/Careers-Os/careeros-web.git
cd careeros-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=CareerOS
```

---

## 📁 Project Structure

```
careeros-web/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, register
│   ├── dashboard/          # Main dashboard
│   ├── resume/             # Resume analyzer
│   ├── interview/          # Interview coach
│   ├── tracker/            # Job tracker
│   └── roadmap/            # Learning roadmap
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── resume/             # Resume-specific components
│   ├── interview/          # Interview-specific components
│   └── shared/             # Shared components
├── lib/
│   ├── api/                # API client functions
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand stores
│   └── utils/              # Utility functions
├── types/                  # TypeScript types
└── public/                 # Static assets
```

---

## 🤝 Contributing

We welcome contributions! CareerOS is open-source and community-driven.

**Good first issues for new contributors:**

| Issue | Label | Difficulty |
|-------|-------|-----------|
| Build login/signup page | `frontend` `good-first-issue` | Beginner |
| Build dashboard layout | `frontend` | Beginner |
| Resume upload drag-and-drop | `frontend` | Intermediate |
| ATS score visualization component | `frontend` | Intermediate |

👉 See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup guide  
👉 See [all open issues](https://github.com/Careers-Os/careeros-web/issues)  
👉 Join discussions on [GitHub Discussions](https://github.com/Careers-Os/careeros-web/discussions)

---

## 📊 Roadmap

- [x] Project setup and documentation
- [ ] **Phase 1** — Authentication, Resume Upload, ATS Analyzer, Job Tracker *(Week 1–4)*
- [ ] **Phase 2** — Recruiter Simulator, AI Interview Coach, Skill Gap *(Week 5–10)*
- [ ] **Phase 3** — Learning Roadmap, LinkedIn Optimizer, Chrome Extension *(Week 11–16)*

Full roadmap → [careeros-docs/roadmap.md](https://github.com/Careers-Os/careeros-docs)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/vikash1311">Vikash Gautam</a> and contributors</p>
  <p>
    <a href="https://github.com/Careers-Os/careeros-api">careeros-api</a> •
    <a href="https://github.com/Careers-Os/careeros-ai">careeros-ai</a> •
    <a href="https://github.com/Careers-Os/careeros-docs">careeros-docs</a>
  </p>
</div>
