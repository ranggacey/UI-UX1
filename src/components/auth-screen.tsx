"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff } from "@/components/icons";

type AuthMode = "login" | "register";
type DemoRole = "user" | "admin";

const demoAccounts = {
  user: { email: "maya@northstar.dev", password: "northstar", name: "Maya Chen" },
  admin: { email: "admin@northstar.dev", password: "northstar", name: "Jordan Lee" },
};

export function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function fillDemo(role: DemoRole) {
    setMode("login");
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].password);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "register") {
      setMessage("Prototype mode: akun belum disimpan. Silakan masuk dengan akun demo di bawah.");
      return;
    }
    const role = email.toLowerCase() === demoAccounts.admin.email ? "admin" : email.toLowerCase() === demoAccounts.user.email ? "user" : null;
    if (!role || password !== demoAccounts[role].password) {
      setMessage("Gunakan salah satu akun demo untuk melihat dashboard yang berbeda.");
      return;
    }
    router.push(`/dashboard/${role}`);
  }

  return (
    <main className="auth-shell noise">
      <section className="auth-brand-panel">
        <div className="brand-mark"><span className="brand-mark-dot"><span /></span>northstar</div>
        <div className="brand-copy">
          <p className="brand-eyebrow">A calmer way to move work forward</p>
          <h1>Make space for the work that matters.</h1>
          <p>Northstar brings your team&apos;s focus, plans, and progress into one considered workspace.</p>
        </div>
        <div className="brand-foot">
          <div className="brand-quote">“The best work happens when everyone knows what matters next.”<strong>— Northstar principle 01</strong></div>
          <div className="brand-signal" aria-label="Momentum is rising"><div className="signal-label"><span>momentum</span><span>+24%</span></div><div className="signal-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand"><div className="brand-mark"><span className="brand-mark-dot"><span /></span>northstar</div></div>
          <p className="form-kicker">Welcome back</p>
          <h2>{mode === "login" ? "Sign in to Northstar" : "Start your workspace"}</h2>
          <p className="form-intro">{mode === "login" ? "Your clearest workday starts here." : "A thoughtful space for your next chapter."}</p>

          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setMessage(""); }} role="tab" aria-selected={mode === "login"}>Sign in</button>
            <button className={`auth-tab ${mode === "register" ? "active" : ""}`} onClick={() => { setMode("register"); setMessage(""); }} role="tab" aria-selected={mode === "register"}>Create account</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              {mode === "register" && <label><span className="field-label">Your name</span><input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Alex Morgan" autoComplete="name" required /></label>}
              <label><span className="field-label">Work email</span><input className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" autoComplete="email" required /></label>
              <label><span className="field-label">Password</span><div className="field-input-wrap"><input className="field-input password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete={mode === "login" ? "current-password" : "new-password"} required /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
            </div>
            {mode === "login" && <div className="form-row"><label className="checkbox-label"><input type="checkbox" defaultChecked /> Keep me signed in</label><button type="button" className="text-button" onClick={() => setMessage("Password reset is ready to connect to your backend later.")}>Forgot password?</button></div>}
            <button className="primary-button" type="submit">{mode === "login" ? "Continue to workspace" : "Create my workspace"}<ArrowRight size={16} /></button>
            {message && <p className="form-message" role="status">{message}</p>}
          </form>

          {mode === "login" && <>
            <div className="demo-divider"><span>Explore the prototype</span></div>
            <div className="demo-grid">
              <button className="demo-card" onClick={() => fillDemo("user")}><div className="demo-card-head"><span className="demo-card-title">User account</span><span className="demo-dot" /></div><p className="demo-card-role">Personal workspace</p><div className="demo-card-email">maya@northstar.dev</div></button>
              <button className="demo-card admin" onClick={() => fillDemo("admin")}><div className="demo-card-head"><span className="demo-card-title">Admin account</span><span className="demo-dot" /></div><p className="demo-card-role">Team overview</p><div className="demo-card-email">admin@northstar.dev</div></button>
            </div>
            <p className="fine-print">Demo only · no data is saved · <a href="https://github.com" target="_blank" rel="noreferrer">open source friendly</a></p>
          </>}
          {mode === "register" && <p className="fine-print"><Check size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} /> No database connected yet — this is a UI prototype.</p>}
        </div>
      </section>
    </main>
  );
}
