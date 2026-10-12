"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, Calendar, Chart, ChevronDown, CreditCard, Folder, Grid, LogOut, More, Settings, TrendingUp, Users, ArrowUpRight } from "@/components/icons";

export type Role = "user" | "admin";
export type PageSlug = "overview" | "projects" | "progress" | "billing" | "people" | "insights" | "settings";

interface NavItem {
  label: string;
  slug: PageSlug;
  href: string;
  icon: (props: { size?: number }) => ReactNode;
}

const profile = {
  user: { name: "Rangga Figo", initials: "RF", label: "Personal workspace" },
  admin: { name: "Bagas Pratama", initials: "BP", label: "Workspace admin" },
};

function navFor(role: Role): NavItem[] {
  return role === "admin"
    ? [
        { label: "Overview", slug: "overview", href: "/dashboard/admin", icon: Grid },
        { label: "People", slug: "people", href: "/dashboard/admin/people", icon: Users },
        { label: "Projects", slug: "projects", href: "/dashboard/admin/projects", icon: Folder },
        { label: "Insights", slug: "insights", href: "/dashboard/admin/insights", icon: Chart },
      ]
    : [
        { label: "Overview", slug: "overview", href: "/dashboard/user", icon: Grid },
        { label: "My projects", slug: "projects", href: "/dashboard/user/projects", icon: Folder },
        { label: "Progress", slug: "progress", href: "/dashboard/user/progress", icon: Chart },
        { label: "Billing", slug: "billing", href: "/dashboard/user/billing", icon: CreditCard },
      ];
}

function Brand() {
  return <div className="brand-mark"><span className="brand-mark-dot"><span /></span><span>utara</span></div>;
}

function Sidebar({ role, page }: { role: Role; page: PageSlug }) {
  const items = navFor(role);
  const settingsHref = role === "admin" ? "/dashboard/admin/settings" : "/dashboard/user/settings";
  return (
    <aside className="sidebar">
      <Brand />
      <p className="sidebar-label">Workspace</p>
      <nav className="side-nav">
        {items.map(({ label, slug, href, icon: Icon }) => (
          <Link key={slug} className={`side-link ${page === slug ? "active" : ""}`} href={href}>
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <p className="sidebar-label">Account</p>
      <nav className="side-nav">
        <Link className={`side-link ${page === "settings" ? "active" : ""}`} href={settingsHref}>
          <Settings size={16} />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="sidebar-bottom">
        <div className="profile-mini">
          <span className={`avatar ${role === "admin" ? "admin" : ""}`}>{profile[role].initials}</span>
          <div>
            <p className="profile-name">{profile[role].name}</p>
            <p className="profile-role">{profile[role].label}</p>
          </div>
        </div>
        <button className="logout-link" onClick={() => location.assign("/")}>
          <LogOut size={15} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ role, page }: { role: Role; page: PageSlug }) {
  const items = navFor(role);
  const current = page === "settings" ? { label: "Settings" } : items.find((item) => item.slug === page) ?? items[0];
  return (
    <header className="dashboard-topbar">
      <div className="crumbs"><span>Workspace</span><span>/</span><strong>{current.label}</strong></div>
      <div className="top-actions">
        <button className="icon-button" aria-label="Notifications"><Bell size={16} /></button>
        <div className="top-avatar">
          <span className={`avatar ${role === "admin" ? "admin" : ""}`}>{profile[role].initials}</span>
          <span>{profile[role].name}</span>
        </div>
      </div>
    </header>
  );
}

function Metrics({ role }: { role: Role }) {
  const metrics = role === "admin" ? [{ title: "Active members", value: "48", change: "+12.5%", icon: Users }, { title: "Projects in motion", value: "12", change: "+2 this month", icon: Folder }, { title: "Avg. completion", value: "76%", change: "+8.2%", icon: TrendingUp }, { title: "Team pulse", value: "8.9", change: "out of 10", icon: Chart }] : [{ title: "Open tasks", value: "18", change: "↓ 4 this week", icon: Grid }, { title: "In progress", value: "06", change: "+2 this week", icon: TrendingUp }, { title: "Completed", value: "42", change: "+18.4%", icon: CheckIcon }, { title: "Focus time", value: "14h", change: "+2h 20m", icon: Chart }];
  return <div className="metric-grid">{metrics.map(({ title, value, change, icon: Icon }, index) => <article className="metric-card" key={title}><div className="metric-head"><span>{title}</span><span className="metric-icon"><Icon size={15} /></span></div><p className="metric-value">{value}</p><div className={`metric-change ${role === "user" && index === 0 ? "down" : ""}`}><ArrowUpRight size={12} />{change}</div></article>)}</div>;
}

function CheckIcon(props: { size?: number }) { return <span style={{ fontSize: props.size ?? 15, lineHeight: 1 }}>✓</span>; }

function ProgressChart({ role }: { role: Role }) {
  return <article className="dashboard-card"><div className="card-heading"><div><h2>{role === "admin" ? "Workspace momentum" : "Your momentum"}</h2><p>Tasks completed over the last 6 weeks</p></div><button className="select-button">Last 6 weeks <ChevronDown size={12} /></button></div><div className="chart-wrap"><svg viewBox="0 0 690 218" role="img" aria-label="Momentum chart trending upward"><defs><linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#78c5ae" stopOpacity=".30" /><stop offset="100%" stopColor="#78c5ae" stopOpacity="0" /></linearGradient></defs><g stroke="#edf1ed" strokeWidth="1"><path d="M45 20H675M45 75H675M45 130H675M45 185H675" /></g><path className="chart-fill" d="M45 168 C95 163 103 139 144 145 S198 125 235 132 S284 98 328 113 S375 92 420 96 S475 70 512 78 S565 43 610 56 S652 29 675 33 V185 H45Z" /><path className="chart-line" d="M45 168 C95 163 103 139 144 145 S198 125 235 132 S284 98 328 113 S375 92 420 96 S475 70 512 78 S565 43 610 56 S652 29 675 33" /><circle className="chart-dot" cx="512" cy="78" r="4" /><g className="chart-label"><text x="42" y="209">May 06</text><text x="157" y="209">May 13</text><text x="272" y="209">May 20</text><text x="387" y="209">May 27</text><text x="502" y="209">Jun 03</text><text x="630" y="209">Today</text></g></svg></div><div className="legend-row"><span><i />Completed tasks</span><span><i className="muted" />Team average</span></div></article>;
}

function FocusList({ role }: { role: Role }) {
  const items = role === "admin" ? [{ title: "Website refresh", meta: "8 people · due Jun 18", progress: 84, status: "On track" }, { title: "Q2 product launch", meta: "12 people · due Jun 24", progress: 62, status: "On track" }, { title: "Customer research", meta: "4 people · due Jul 02", progress: 38, status: "Planning" }] : [{ title: "Website refresh", meta: "Due today · 3 tasks left", progress: 84, status: "On track" }, { title: "Q2 product launch", meta: "Due Jun 24 · 12 tasks left", progress: 62, status: "On track" }, { title: "Customer research", meta: "Due Jul 02 · 8 tasks left", progress: 38, status: "Planning" }];
  return <article className="dashboard-card"><div className="card-heading"><div><h2>{role === "admin" ? "Projects at a glance" : "Keep an eye on"}</h2><p>{role === "admin" ? "A quick read on your team's work" : "The things that need your attention"}</p></div><button className="icon-button" aria-label="More options"><More size={16} /></button></div><div className="list">{items.map((item) => <div className="list-item" key={item.title}><div className="list-item-body"><p>{item.title}</p><small>{item.meta}</small><div className="progress-track"><span style={{ width: `${item.progress}%` }} /></div></div><span className={`status-pill ${item.status === "Planning" ? "pending" : ""}`}>{item.status}</span></div>)}</div></article>;
}

function Activity({ role }: { role: Role }) {
  const rows = role === "admin" ? [{ initials: "RR", text: <><strong>Rizky Ramadhan</strong> joined the workspace</>, time: "12 minutes ago" }, { initials: "SD", text: <><strong>Sinta Dewi</strong> completed a milestone</>, time: "48 minutes ago" }, { initials: "FN", text: <><strong>Fajar Nugroho</strong> moved a project to planning</>, time: "2 hours ago" }] : [{ initials: "RF", text: <>You completed <strong>Review homepage copy</strong></>, time: "12 minutes ago" }, { initials: "RR", text: <><strong>Rizky Ramadhan</strong> mentioned you in a comment</>, time: "48 minutes ago" }, { initials: "SD", text: <><strong>Sinta Dewi</strong> completed a milestone</>, time: "2 hours ago" }];
  return <article className="dashboard-card activity-card"><div className="card-heading"><div><h2>Recent activity</h2><p>Small steps, moving things forward</p></div><button className="text-button">View all</button></div><div className="activity-list">{rows.map((row) => <div className="activity-row" key={row.initials + row.time}><span className="activity-avatar">{row.initials}</span><p>{row.text}<time>{row.time}</time></p></div>)}</div></article>;
}

function MembersTable() {
  const rows = [{ name: "Rangga Figo", initials: "RF", role: "Product designer", projects: 4, progress: 91, status: "Active" }, { name: "Rizky Ramadhan", initials: "RR", role: "Engineer", projects: 3, progress: 78, status: "Active" }, { name: "Sinta Dewi", initials: "SD", role: "Researcher", projects: 2, progress: 64, status: "Active" }, { name: "Fajar Nugroho", initials: "FN", role: "Product manager", projects: 3, progress: 52, status: "Away" }];
  return <article className="dashboard-card table-card"><div className="card-heading"><div><h2>Team at a glance</h2><p>People and their current momentum</p></div><button className="select-button">This month <ChevronDown size={12} /></button></div><table className="data-table"><thead><tr><th>Member</th><th>Role</th><th>Projects</th><th>Progress</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row.name}><td><div className="user-cell"><span className="avatar">{row.initials}</span>{row.name}</div></td><td><span className="role-tag">{row.role}</span></td><td>{row.projects}</td><td><div className="tiny-bar"><span style={{ width: `${row.progress}%` }} /></div></td><td><span className={`status-pill ${row.status === "Away" ? "pending" : ""}`}>{row.status}</span></td></tr>)}</tbody></table></article>;
}

export function OverviewContent({ role }: { role: Role }) {
  return (
    <>
      <div className="welcome-row">
        <div>
          <h1>{role === "admin" ? "Good morning, Bagas" : "Good morning, Rangga"}</h1>
          <p>{role === "admin" ? "Here is the pulse of your workspace today." : "Here is a clear view of what is moving today."}</p>
        </div>
        <div className="date-chip"><Calendar size={14} /> Tue, Jun 10, 2025</div>
      </div>
      {role === "admin" && <div className="admin-banner"><div><h2>Workspace is in a good rhythm.</h2><p>48 members are active across 12 projects today.</p></div><div className="banner-badge"><span className="pulse" /> All systems healthy</div></div>}
      <Metrics role={role} />
      <div className="dashboard-grid"><ProgressChart role={role} /><FocusList role={role} /></div>
      {role === "admin" ? <MembersTable /> : <Activity role={role} />}
      {role === "admin" && <Activity role={role} />}
    </>
  );
}

export function DashboardShell({ role, page, children }: { role: Role; page: PageSlug; children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      <Sidebar role={role} page={page} />
      <div className="dashboard-main">
        <Topbar role={role} page={page} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
