"use client";

import { useState } from "react";
import {
  ArrowUpRight, Bell, Calendar, Chart, Check, ChevronDown, Clock, CreditCard,
  Folder, Grid, LogOut, More, Plus, Search, TrendingUp, Users,
} from "@/components/icons";

type IconComponent = (props: { size?: number }) => React.ReactNode;

/* ---------------------------------- shared ---------------------------------- */

export function WelcomeRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="welcome-row">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="date-chip"><Calendar size={14} /> Tue, Jun 10, 2025</div>
    </div>
  );
}

interface MetricItem {
  title: string;
  value: string;
  change: string;
  icon: IconComponent;
  down?: boolean;
}

export function MetricCards({ items }: { items: MetricItem[] }) {
  return (
    <div className="metric-grid">
      {items.map(({ title, value, change, icon: Icon, down }) => (
        <article className="metric-card" key={title}>
          <div className="metric-head"><span>{title}</span><span className="metric-icon"><Icon size={15} /></span></div>
          <p className="metric-value">{value}</p>
          <div className={`metric-change ${down ? "down" : ""}`}><ArrowUpRight size={12} />{change}</div>
        </article>
      ))}
    </div>
  );
}

function AvatarStack({ members, max = 3 }: { members: string[]; max?: number }) {
  const shown = members.slice(0, max);
  const rest = members.length - shown.length;
  return (
    <div className="avatar-stack">
      {shown.map((m) => <span className="avatar" key={m}>{m}</span>)}
      {rest > 0 && <span className="avatar more">+{rest}</span>}
    </div>
  );
}

function FilterPills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="filter-pills">
      {options.map((option) => (
        <button key={option} className={`filter-pill ${value === option ? "active" : ""}`} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div className="bars" role="img" aria-label="Bar chart">
      {data.map((value, index) => (
        <div className="bar-col" key={labels[index]}>
          <span className="bar-value">{value}</span>
          <div className={`bar ${index < data.length - 1 ? "dim" : ""}`} style={{ height: `${Math.max(6, (value / max) * 100)}%` }} />
          <span className="bar-label">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function statusClass(status: string) {
  if (status === "Planning" || status === "Paused") return "status-pill pending";
  if (status === "At risk") return "status-pill risk";
  return "status-pill";
}

/* ------------------------------- user: projects ------------------------------ */

const USER_PROJECTS = [
  { name: "Website refresh", desc: "New marketing site with the updated brand and CMS.", team: ["MC", "AT", "SK"], due: "Today", progress: 84, status: "Active" },
  { name: "Q2 product launch", desc: "Launch plan, assets, and rollout checklist.", team: ["MC", "AT", "SK", "RB"], due: "Jun 24", progress: 62, status: "Active" },
  { name: "Customer research", desc: "Interviews and synthesis for the new onboarding.", team: ["MC", "SK"], due: "Jul 02", progress: 38, status: "Planning" },
  { name: "Mobile app redesign", desc: "Fresh navigation and a calmer home screen.", team: ["MC", "DP"], due: "Jul 20", progress: 12, status: "Planning" },
  { name: "Design system v2", desc: "Tokens, components, and documentation refresh.", team: ["MC", "NR"], due: "On hold", progress: 45, status: "Paused" },
  { name: "Brand refresh", desc: "Logo, palette, and voice guidelines.", team: ["MC", "SK", "NR"], due: "Done Jun 02", progress: 100, status: "Completed" },
];

export function UserProjectsContent() {
  const [filter, setFilter] = useState("All");
  const visible = USER_PROJECTS.filter((p) => filter === "All" || p.status === filter);
  return (
    <>
      <WelcomeRow title="My projects" subtitle="Everything you are working on, in one place." />
      <MetricCards
        items={[
          { title: "Active projects", value: "5", change: "+1 this month", icon: Folder },
          { title: "Completed", value: "08", change: "+3 this month", icon: Check },
          { title: "Overdue", value: "01", change: "needs attention", icon: Clock, down: true },
          { title: "Total tasks", value: "64", change: "+12 this week", icon: Grid },
        ]}
      />
      <div className="toolbar">
        <FilterPills options={["All", "Active", "Planning", "Paused", "Completed"]} value={filter} onChange={setFilter} />
        <button className="button-primary"><Plus size={14} /> New project</button>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article className="dashboard-card project-card" key={project.name}>
            <div className="project-top">
              <div>
                <p className="project-name">{project.name}</p>
                <p className="project-desc">{project.desc}</p>
              </div>
              <span className={statusClass(project.status)}>{project.status}</span>
            </div>
            <div>
              <div className="project-progress-meta"><span>{project.progress}% complete</span></div>
              <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
            </div>
            <div className="project-foot">
              <AvatarStack members={project.team} />
              <span className="due-chip"><Clock size={12} /> {project.due}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* ------------------------------- user: progress ------------------------------ */

const WEEK_LABELS = ["Apr 28", "May 05", "May 12", "May 19", "May 26", "Jun 02"];

export function UserProgressContent() {
  return (
    <>
      <WelcomeRow title="Progress" subtitle="Your momentum, week by week." />
      <MetricCards
        items={[
          { title: "Tasks completed", value: "42", change: "+18.4%", icon: Check },
          { title: "Day streak", value: "12", change: "personal best", icon: TrendingUp },
          { title: "Focus time", value: "14h", change: "+2h 20m", icon: Clock },
          { title: "Completion rate", value: "78%", change: "+6.1%", icon: Chart },
        ]}
      />
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <div className="card-heading">
            <div><h2>Tasks completed</h2><p>Per week for the last 6 weeks</p></div>
            <button className="select-button">This quarter <ChevronDown size={12} /></button>
          </div>
          <BarChart data={[6, 9, 7, 11, 8, 12]} labels={WEEK_LABELS} />
        </article>
        <article className="dashboard-card">
          <div className="card-heading">
            <div><h2>This week&apos;s streak</h2><p>Show up a little every day</p></div>
          </div>
          <div className="streak-row">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div className="streak-day" key={index}>
                <span className={`streak-dot ${index < 5 ? "on" : ""} ${index === 4 ? "today" : ""}`}>{index < 5 ? "✓" : ""}</span>
                {day}
              </div>
            ))}
          </div>
          <div className="list">
            {[
              { title: "Early bird", meta: "Finished 5 tasks before 9 AM" },
              { title: "Deep focus", meta: "3 sessions over 90 minutes" },
              { title: "Closer", meta: "Cleared every task due this week" },
            ].map((item) => (
              <div className="list-item" key={item.title}>
                <div className="list-item-body"><p>{item.title}</p><small>{item.meta}</small></div>
                <span className="status-pill">Earned</span>
              </div>
            ))}
          </div>
        </article>
      </div>
      <article className="dashboard-card table-card">
        <div className="card-heading">
          <div><h2>Progress by project</h2><p>Where your completed tasks came from</p></div>
        </div>
        <table className="data-table">
          <thead><tr><th>Project</th><th>Completed</th><th>Remaining</th><th>Progress</th></tr></thead>
          <tbody>
            {[
              { name: "Website refresh", done: 21, left: 3, progress: 84 },
              { name: "Q2 product launch", done: 12, left: 12, progress: 62 },
              { name: "Customer research", done: 6, left: 8, progress: 38 },
              { name: "Brand refresh", done: 14, left: 0, progress: 100 },
            ].map((row) => (
              <tr key={row.name}>
                <td><span className="user-cell">{row.name}</span></td>
                <td>{row.done} tasks</td>
                <td>{row.left} tasks</td>
                <td><div className="tiny-bar"><span style={{ width: `${row.progress}%` }} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

/* ------------------------------- user: billing ------------------------------- */

export function UserBillingContent() {
  return (
    <>
      <WelcomeRow title="Billing" subtitle="Your plan, payment method, and invoices." />
      <div className="grid-2">
        <article className="dashboard-card plan-card">
          <div className="card-heading">
            <div><p className="card-kicker">Current plan</p><h2 className="plan-name">Northstar Pro</h2></div>
            <span className="status-pill">Active</span>
          </div>
          <p className="plan-price">$12 <span>/ member / month, billed annually</span></p>
          <ul className="plan-features">
            {["Unlimited projects and tasks", "100 GB shared storage", "Advanced insights and reports", "Priority support"].map((feature) => (
              <li key={feature}><Check size={14} /> {feature}</li>
            ))}
          </ul>
          <div className="card-actions">
            <button className="button-primary">Manage plan</button>
            <button className="button-ghost">Cancel plan</button>
          </div>
        </article>
        <article className="dashboard-card">
          <div className="card-heading">
            <div><h2>Payment method</h2><p>Used for your subscription</p></div>
            <button className="text-button">Update</button>
          </div>
          <div className="card-brand">
            <span className="card-chip">VISA</span>
            <div>
              <p className="card-number">•••• •••• •••• 4242</p>
              <small className="card-meta">Expires 08/2028</small>
            </div>
          </div>
          <div className="settings-row">
            <div><h3>Billing email</h3><p>Receipts and invoices go here</p></div>
            <span className="row-value">maya@northstar.dev</span>
          </div>
          <div className="settings-row">
            <div><h3>Next charge</h3><p>Renews automatically</p></div>
            <span className="row-value">$576.00 · Jul 01</span>
          </div>
        </article>
      </div>
      <article className="dashboard-card table-card">
        <div className="card-heading">
          <div><h2>Invoices</h2><p>Your recent billing history</p></div>
          <button className="select-button">2025 <ChevronDown size={12} /></button>
        </div>
        <table className="data-table">
          <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { id: "INV-2025-06", date: "Jun 01, 2025", amount: "$576.00" },
              { id: "INV-2025-05", date: "May 01, 2025", amount: "$576.00" },
              { id: "INV-2025-04", date: "Apr 01, 2025", amount: "$552.00" },
              { id: "INV-2025-03", date: "Mar 01, 2025", amount: "$552.00" },
            ].map((row) => (
              <tr key={row.id}>
                <td><span className="user-cell">{row.id}</span></td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td><span className="status-pill">Paid</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

/* ------------------------------- user: settings ------------------------------ */

function Toggle({ defaultOn = true, label }: { defaultOn?: boolean; label: string }) {
  return (
    <label className="switch" aria-label={label}>
      <input type="checkbox" defaultChecked={defaultOn} />
      <i />
    </label>
  );
}

export function UserSettingsContent() {
  return (
    <>
      <WelcomeRow title="Settings" subtitle="Make northstar yours." />
      <div className="grid-2">
        <article className="dashboard-card">
          <div className="card-heading"><div><h2>Profile</h2><p>How you appear to your team</p></div></div>
          <div className="form-grid">
            <div>
              <label className="field-label" htmlFor="set-name">Full name</label>
              <input className="field-input" id="set-name" defaultValue="Maya Chen" />
            </div>
            <div>
              <label className="field-label" htmlFor="set-role">Role</label>
              <input className="field-input" id="set-role" defaultValue="Product designer" />
            </div>
          </div>
          <div className="field-block">
            <label className="field-label" htmlFor="set-email">Email</label>
            <input className="field-input" id="set-email" defaultValue="maya@northstar.dev" />
          </div>
          <div className="card-actions"><button className="button-primary">Save changes</button></div>
        </article>
        <article className="dashboard-card">
          <div className="card-heading"><div><h2>Notifications</h2><p>Choose what reaches you</p></div></div>
          <div className="settings-list">
            <div className="settings-row">
              <div><h3>Task reminders</h3><p>Nudges before things are due</p></div>
              <Toggle label="Task reminders" />
            </div>
            <div className="settings-row">
              <div><h3>Mentions</h3><p>When someone tags you in a comment</p></div>
              <Toggle label="Mentions" />
            </div>
            <div className="settings-row">
              <div><h3>Weekly digest</h3><p>A calm summary every Monday morning</p></div>
              <Toggle label="Weekly digest" />
            </div>
            <div className="settings-row">
              <div><h3>Product updates</h3><p>News about new northstar features</p></div>
              <Toggle defaultOn={false} label="Product updates" />
            </div>
          </div>
        </article>
        <article className="dashboard-card">
          <div className="card-heading"><div><h2>Appearance</h2><p>Light, dark, or follow your system</p></div></div>
          <div className="segmented" role="group" aria-label="Theme">
            <button className="active">Light</button>
            <button>Dark</button>
            <button>System</button>
          </div>
          <div className="settings-row" style={{ marginTop: 8 }}>
            <div><h3>Reduce motion</h3><p>Minimize animations across the app</p></div>
            <Toggle defaultOn={false} label="Reduce motion" />
          </div>
        </article>
        <article className="dashboard-card">
          <div className="card-heading"><div><h2>Session</h2><p>Signed in on this device</p></div></div>
          <div className="settings-row">
            <div><h3>maya@northstar.dev</h3><p>MacBook Pro · Semarang, Indonesia</p></div>
            <span className="status-pill">Current</span>
          </div>
          <div className="card-actions">
            <button className="button-ghost"><LogOut size={14} /> Sign out</button>
          </div>
        </article>
      </div>
    </>
  );
}

/* ------------------------------- admin: people ------------------------------- */

const TEAM_MEMBERS = [
  { name: "Maya Chen", initials: "MC", email: "maya@northstar.dev", role: "Product designer", team: "Design", projects: 4, active: "2m ago", status: "Active" },
  { name: "Alex Tan", initials: "AT", email: "alex@northstar.dev", role: "Engineer", team: "Engineering", projects: 3, active: "5m ago", status: "Active" },
  { name: "Sarah Kim", initials: "SK", email: "sarah@northstar.dev", role: "Researcher", team: "Research", projects: 2, active: "18m ago", status: "Active" },
  { name: "Ravi Bose", initials: "RB", email: "ravi@northstar.dev", role: "Product manager", team: "Product", projects: 3, active: "1h ago", status: "Active" },
  { name: "Lina Hartono", initials: "LH", email: "lina@northstar.dev", role: "Marketer", team: "Growth", projects: 2, active: "3h ago", status: "Active" },
  { name: "Dimas Prasetyo", initials: "DP", email: "dimas@northstar.dev", role: "Engineer", team: "Engineering", projects: 2, active: "Yesterday", status: "Active" },
  { name: "Nadia Rahma", initials: "NR", email: "nadia@northstar.dev", role: "Designer", team: "Design", projects: 1, active: "2d ago", status: "Away" },
  { name: "Tom Becker", initials: "TB", email: "tom@northstar.dev", role: "Support lead", team: "Support", projects: 1, active: "5d ago", status: "Away" },
];

export function AdminPeopleContent() {
  const [query, setQuery] = useState("");
  const visible = TEAM_MEMBERS.filter((m) =>
    `${m.name} ${m.email} ${m.role} ${m.team}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <WelcomeRow title="People" subtitle="Everyone in your workspace." />
      <MetricCards
        items={[
          { title: "Total members", value: "48", change: "+12.5%", icon: Users },
          { title: "Active today", value: "12", change: "right now", icon: TrendingUp },
          { title: "Pending invites", value: "03", change: "2 sent today", icon: Bell },
          { title: "Teams", value: "06", change: "+1 this quarter", icon: Grid },
        ]}
      />
      <div className="toolbar">
        <div className="search-wrap">
          <Search size={15} />
          <input
            className="search-input"
            placeholder="Search name, email, or team…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button className="button-primary"><Plus size={14} /> Invite member</button>
      </div>
      <article className="dashboard-card table-card">
        <table className="data-table">
          <thead><tr><th>Member</th><th>Role</th><th>Team</th><th>Projects</th><th>Last active</th><th>Status</th><th aria-label="Actions" /></tr></thead>
          <tbody>
            {visible.map((member) => (
              <tr key={member.email}>
                <td>
                  <div className="user-cell">
                    <span className="avatar">{member.initials}</span>
                    <span><span className="cell-name">{member.name}</span><span className="cell-sub">{member.email}</span></span>
                  </div>
                </td>
                <td><span className="role-tag">{member.role}</span></td>
                <td>{member.team}</td>
                <td>{member.projects}</td>
                <td>{member.active}</td>
                <td><span className={member.status === "Away" ? "status-pill pending" : "status-pill"}>{member.status}</span></td>
                <td><button className="icon-button" aria-label={`More options for ${member.name}`}><More size={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <p className="empty-note">No members match “{query}”.</p>}
      </article>
    </>
  );
}

/* ------------------------------ admin: projects ------------------------------ */

const ALL_PROJECTS = [
  { name: "Website refresh", desc: "Marketing site rebuild", owner: "Maya Chen", initials: "MC", team: ["MC", "AT", "SK", "DP", "NR"], due: "Jun 18", progress: 84, status: "On track" },
  { name: "Q2 product launch", desc: "Launch plan and rollout", owner: "Ravi Bose", initials: "RB", team: ["RB", "MC", "AT", "SK"], due: "Jun 24", progress: 62, status: "On track" },
  { name: "API migration", desc: "Move to the new gateway", owner: "Alex Tan", initials: "AT", team: ["AT", "DP"], due: "Jun 30", progress: 45, status: "At risk" },
  { name: "Customer research", desc: "Onboarding interviews", owner: "Sarah Kim", initials: "SK", team: ["SK", "MC"], due: "Jul 02", progress: 38, status: "Planning" },
  { name: "Mobile app redesign", desc: "New navigation model", owner: "Alex Tan", initials: "AT", team: ["AT", "MC", "NR"], due: "Jul 20", progress: 12, status: "Planning" },
  { name: "Brand refresh", desc: "Logo and guidelines", owner: "Maya Chen", initials: "MC", team: ["MC", "SK", "NR"], due: "Jun 02", progress: 100, status: "Completed" },
];

export function AdminProjectsContent() {
  const [filter, setFilter] = useState("All");
  const visible = ALL_PROJECTS.filter((p) => filter === "All" || p.status === filter);
  return (
    <>
      <WelcomeRow title="Projects" subtitle="Every project across the workspace." />
      <MetricCards
        items={[
          { title: "In motion", value: "12", change: "+2 this month", icon: Folder },
          { title: "Planning", value: "04", change: "2 starting soon", icon: Clock },
          { title: "At risk", value: "02", change: "needs attention", icon: TrendingUp, down: true },
          { title: "Completed", value: "23", change: "+5 this quarter", icon: Check },
        ]}
      />
      <div className="toolbar">
        <FilterPills options={["All", "On track", "Planning", "At risk", "Completed"]} value={filter} onChange={setFilter} />
        <button className="button-primary"><Plus size={14} /> New project</button>
      </div>
      <article className="dashboard-card table-card">
        <table className="data-table">
          <thead><tr><th>Project</th><th>Owner</th><th>Team</th><th>Progress</th><th>Due</th><th>Status</th></tr></thead>
          <tbody>
            {visible.map((project) => (
              <tr key={project.name}>
                <td>
                  <div className="user-cell">
                    <span><span className="cell-name">{project.name}</span><span className="cell-sub">{project.desc}</span></span>
                  </div>
                </td>
                <td>
                  <div className="user-cell"><span className="avatar">{project.initials}</span>{project.owner}</div>
                </td>
                <td><AvatarStack members={project.team} max={4} /></td>
                <td>
                  <div className="progress-cell">
                    <div className="tiny-bar"><span style={{ width: `${project.progress}%` }} /></div>
                    <span className="progress-num">{project.progress}%</span>
                  </div>
                </td>
                <td>{project.due}</td>
                <td><span className={statusClass(project.status)}>{project.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

/* ------------------------------ admin: insights ------------------------------ */

export function AdminInsightsContent() {
  return (
    <>
      <WelcomeRow title="Insights" subtitle="How your team works, at a glance." />
      <MetricCards
        items={[
          { title: "Avg. completion", value: "76%", change: "+8.2%", icon: TrendingUp },
          { title: "Tasks completed", value: "1,248", change: "+14.3%", icon: Check },
          { title: "Avg. cycle time", value: "4.2d", change: "↓ 0.6d faster", icon: Clock },
          { title: "Team pulse", value: "8.9", change: "out of 10", icon: Chart },
        ]}
      />
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <div className="card-heading">
            <div><h2>Completed tasks</h2><p>Whole team, per week</p></div>
            <button className="select-button">Last 6 weeks <ChevronDown size={12} /></button>
          </div>
          <BarChart data={[42, 55, 48, 61, 58, 72]} labels={WEEK_LABELS} />
        </article>
        <article className="dashboard-card">
          <div className="card-heading">
            <div><h2>Task status</h2><p>Where all open work sits right now</p></div>
          </div>
          <div className="stacked-bar" role="img" aria-label="Task status breakdown">
            <span style={{ width: "58%", background: "#4aa58d" }} />
            <span style={{ width: "27%", background: "#efb95d" }} />
            <span style={{ width: "15%", background: "#dcebe4" }} />
          </div>
          <div className="list">
            {[
              { title: "Done", meta: "724 tasks shipped", value: "58%" },
              { title: "In progress", meta: "337 tasks moving", value: "27%" },
              { title: "To do", meta: "187 tasks queued", value: "15%" },
            ].map((item) => (
              <div className="list-item" key={item.title}>
                <div className="list-item-body"><p>{item.title}</p><small>{item.meta}</small></div>
                <span className="row-value">{item.value}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
      <article className="dashboard-card">
        <div className="card-heading">
          <div><h2>Workload</h2><p>Open tasks per person this week</p></div>
          <button className="text-button">Rebalance</button>
        </div>
        <div className="list">
          {[
            { name: "Maya Chen", initials: "MC", tasks: 18, load: "High", loadClass: "risk" },
            { name: "Alex Tan", initials: "AT", tasks: 14, load: "Balanced", loadClass: "" },
            { name: "Sarah Kim", initials: "SK", tasks: 11, load: "Balanced", loadClass: "" },
            { name: "Ravi Bose", initials: "RB", tasks: 9, load: "Light", loadClass: "pending" },
          ].map((row) => (
            <div className="list-item" key={row.name}>
              <div className="user-cell" style={{ minWidth: 170 }}><span className="avatar">{row.initials}</span>{row.name}</div>
              <div className="list-item-body">
                <small>{row.tasks} open tasks</small>
                <div className="progress-track"><span style={{ width: `${Math.min(100, (row.tasks / 20) * 100)}%` }} /></div>
              </div>
              <span className={`status-pill ${row.loadClass}`}>{row.load}</span>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

/* ------------------------------ admin: settings ------------------------------ */

export function AdminSettingsContent() {
  return (
    <>
      <WelcomeRow title="Workspace settings" subtitle="Identity, access, and defaults for your team." />
      <div className="grid-2">
        <article className="dashboard-card">
          <div className="card-heading"><div><h2>Workspace</h2><p>How your workspace appears</p></div></div>
          <div className="field-block">
            <label className="field-label" htmlFor="ws-name">Workspace name</label>
            <input className="field-input" id="ws-name" defaultValue="Northstar" />
          </div>
          <div className="field-block">
            <label className="field-label" htmlFor="ws-url">Workspace URL</label>
            <input className="field-input" id="ws-url" defaultValue="northstar.app/w/northstar" />
          </div>
          <div className="card-actions"><button className="button-primary">Save changes</button></div>
        </article>
        <article className="dashboard-card">
          <div className="card-heading">
            <div><h2>Access</h2><p>Who can do what</p></div>
            <button className="text-button">Manage roles</button>
          </div>
          <div className="settings-list">
            {[
              { title: "Admins", meta: "Full control of the workspace", value: "3" },
              { title: "Members", meta: "Can create and edit projects", value: "38" },
              { title: "Guests", meta: "View-only on invited projects", value: "7" },
              { title: "Pending invites", meta: "Waiting to join", value: "3" },
            ].map((row) => (
              <div className="settings-row" key={row.title}>
                <div><h3>{row.title}</h3><p>{row.meta}</p></div>
                <span className="row-value">{row.value}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="dashboard-card">
          <div className="card-heading"><div><h2>Defaults</h2><p>Rules for new members</p></div></div>
          <div className="settings-list">
            <div className="settings-row">
              <div><h3>New member role</h3><p>Assigned automatically on invite</p></div>
              <button className="select-button">Member <ChevronDown size={12} /></button>
            </div>
            <div className="settings-row">
              <div><h3>Guest access</h3><p>Let members invite view-only guests</p></div>
              <Toggle label="Guest access" />
            </div>
            <div className="settings-row">
              <div><h3>Weekly digest</h3><p>Send every member a Monday summary</p></div>
              <Toggle label="Weekly digest" />
            </div>
          </div>
        </article>
        <article className="dashboard-card danger-card">
          <div className="card-heading"><div><h2>Danger zone</h2><p>Irreversible actions</p></div></div>
          <div className="settings-row">
            <div><h3>Archive workspace</h3><p>Projects become read-only for everyone</p></div>
            <button className="button-danger">Archive</button>
          </div>
          <div className="settings-row">
            <div><h3>Delete workspace</h3><p>Removes all projects and data permanently</p></div>
            <button className="button-danger">Delete</button>
          </div>
        </article>
      </div>
    </>
  );
}
