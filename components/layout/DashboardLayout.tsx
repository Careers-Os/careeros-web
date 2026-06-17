"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard, FileText, Mic, Briefcase,
  Map, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight,
} from "lucide-react";

const NAV_ITEMS: { label: string; href: string; icon: React.ElementType }[] = [
  { label: "Dashboard",  href: "/dashboard",            icon: LayoutDashboard },
  { label: "Resume",     href: "/dashboard/resume",     icon: FileText        },
  { label: "Interview",  href: "/dashboard/interview",  icon: Mic             },
  { label: "Job Tracker",href: "/dashboard/job-tracker",icon: Briefcase       },
  { label: "Roadmap",    href: "/dashboard/roadmap",    icon: Map             },
  { label: "Settings",   href: "/dashboard/settings",   icon: Settings        },
];

// ── Shared style tokens ──────────────────────────────────────────────────────
const SIDEBAR_W   = 256;
const SIDEBAR_COL = 64;
const HEADER_H    = 64;
const BORDER      = "1px solid hsl(var(--border))";
const BG          = "hsl(var(--background))";
const CARD        = "hsl(var(--card))";
const PRIMARY     = "hsl(var(--primary))";
const PRIMARY_FG  = "hsl(var(--primary-foreground))";
const MUTED_FG    = "hsl(var(--muted-foreground))";
const ACCENT      = "hsl(var(--accent))";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);
  const [isDesktop,  setIsDesktop]  = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const w = collapsed ? SIDEBAR_COL : SIDEBAR_W;

  const sidebarStyle: React.CSSProperties = isDesktop
    ? { width: w, flexShrink: 0, transition: "width 300ms ease" }
    : {
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: SIDEBAR_W, zIndex: 40,
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 300ms ease",
      };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: BG }}>

      {/* Mobile backdrop */}
      {!isDesktop && mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 30, background: "rgba(0,0,0,0.6)" }} />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        ...sidebarStyle,
        display: "flex", flexDirection: "column",
        background: CARD, borderRight: BORDER, overflow: "hidden",
      }}>

        {/* Logo row */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          height: HEADER_H, padding: "0 16px",
          borderBottom: BORDER, flexShrink: 0,
        }}>
          {!collapsed && (
            <Link href={"/dashboard" as any} style={{
              fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em",
              color: PRIMARY, textDecoration: "none",
            }}>
              CareerOS
            </Link>
          )}
          {isDesktop ? (
            <Button variant="ghost" size="icon"
              onClick={() => setCollapsed(c => !c)}
              aria-label="Toggle sidebar">
              {collapsed
                ? <ChevronRight className="h-4 w-4" />
                : <ChevronLeft  className="h-4 w-4" />}
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
            return (
              <Link key={href} href={href as any} title={collapsed ? label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: collapsed ? 0 : 12,
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding: collapsed ? "10px 0" : "10px 12px",
                  marginBottom: 4,
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 150ms, color 150ms",
                  background: active ? PRIMARY : "transparent",
                  color: active ? PRIMARY_FG : MUTED_FG,
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = ACCENT;
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--accent-foreground))";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = MUTED_FG;
                  }
                }}
              >
                <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom email */}
        {!collapsed && (
          <div style={{ borderTop: BORDER, padding: 16, flexShrink: 0 }}>
            <p style={{ fontSize: 12, color: MUTED_FG, marginBottom: 2 }}>Signed in as</p>
            <p style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              user@example.com
            </p>
          </div>
        )}
      </aside>

      {/* ── Main column ── */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden" }}>

        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center",
          height: HEADER_H, padding: "0 24px",
          borderBottom: BORDER, background: BG, flexShrink: 0,
        }}>
          {!isDesktop && (
            <Button variant="ghost" size="icon"
              onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div style={{ flex: 1 }} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost"
                style={{ borderRadius: "50%", width: 32, height: 32, padding: 0 }}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href={"/dashboard/settings" as any}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
