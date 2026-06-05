"use client";
import { useState } from "react";
import { ChevronLeft, Zap, Sparkles, Target, Brain, ShieldOff, Sliders, Mail, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Btn } from "./ui";
import { VERSION } from "../../lib/outputBuilder";

export default function SignInGate({ isMobile, signInWithMagicLink, signUp, signInWithPassword, resetPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState("signin");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submitPassword = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setSending(true);
    try {
      if (mode === "signup") {
        await signUp(email, password);
        setMode("check-email");
      } else {
        await signInWithPassword(email, password);
      }
    } catch (e) {
      const msg = e?.message || "Something went wrong. Try again.";
      if (msg.includes("Invalid login")) {
        setError("Invalid email or password.");
      } else if (msg.includes("already registered")) {
        setError("Account already exists. Sign in instead.");
      } else {
        setError(msg);
      }
    } finally {
      setSending(false);
    }
  };

  const submitMagicLink = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await signInWithMagicLink(email);
      setMagicLinkSent(true);
    } catch (e) {
      setError(e?.message || "Failed to send magic link. Try again.");
    } finally {
      setSending(false);
    }
  };

  const submitReset = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (e) {
      setError(e?.message || "Failed to send reset email. Try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.05)",
    border: error ? "1.5px solid rgba(208,80,80,0.5)" : "1.5px solid rgba(184,134,78,0.2)",
    borderRadius: "10px", color: "#F0EBE0", fontSize: "15px",
    fontFamily: "'Libre Franklin', sans-serif", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "32px 20px" : "60px 24px", position: "relative", overflow: "hidden" }}>
      <a href="/" style={{ position: "absolute", top: isMobile ? "16px" : "24px", left: isMobile ? "16px" : "24px", display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.55)", fontSize: "13px", textDecoration: "none", fontFamily: "'Libre Franklin', sans-serif", transition: "color 0.2s", zIndex: 1 }} onMouseEnter={e => (e.currentTarget.style.color = "#B8864E")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
        <ChevronLeft size={16} /> stanzix.com
      </a>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,78,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="gate-fade" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, #B8864E, #A07442)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={26} color="#1a1a1a" />
        </div>
        <div>
          <h1 style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>Stanzix</h1>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace" }}>Structured Prompt Builder · {VERSION}</div>
        </div>
      </div>

      {magicLinkSent ? (
        <div className="gate-fade-2" style={{ maxWidth: "420px", width: "100%", textAlign: "center", padding: "32px 24px", background: "rgba(184,134,78,0.06)", border: "1px solid rgba(184,134,78,0.25)", borderRadius: "14px" }}>
          <CheckCircle2 size={40} color="#B8864E" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "#F0EBE0" }}>Check your inbox</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "16px" }}>
            We sent a sign-in link to <strong style={{ color: "#B8864E" }}>{email}</strong>.
          </p>
          <button onClick={() => { setMagicLinkSent(false); }} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Back to sign in
          </button>
        </div>
      ) : mode === "check-email" ? (
        <div className="gate-fade-2" style={{ maxWidth: "420px", width: "100%", textAlign: "center", padding: "32px 24px", background: "rgba(184,134,78,0.06)", border: "1px solid rgba(184,134,78,0.25)", borderRadius: "14px" }}>
          <CheckCircle2 size={40} color="#B8864E" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "#F0EBE0" }}>Confirm your email</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "16px" }}>
            We sent a confirmation link to <strong style={{ color: "#B8864E" }}>{email}</strong>. Click it to activate your account.
          </p>
          <button onClick={() => { setMode("signin"); }} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Back to sign in
          </button>
        </div>
      ) : resetSent ? (
        <div className="gate-fade-2" style={{ maxWidth: "420px", width: "100%", textAlign: "center", padding: "32px 24px", background: "rgba(184,134,78,0.06)", border: "1px solid rgba(184,134,78,0.25)", borderRadius: "14px" }}>
          <Mail size={40} color="#B8864E" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "#F0EBE0" }}>Reset link sent</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "16px" }}>
            Check <strong style={{ color: "#B8864E" }}>{email}</strong> for a password reset link.
          </p>
          <button onClick={() => { setResetSent(false); setMode("signin"); }} style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Back to sign in
          </button>
        </div>
      ) : mode === "forgot" ? (
        <>
          <p className="gate-fade-2" style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "380px", lineHeight: 1.7, marginBottom: "24px" }}>
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <div className="gate-fade-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%", maxWidth: "380px" }}>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} onKeyDown={e => e.key === "Enter" && !sending && submitReset()} placeholder="you@example.com" aria-label="Email address" disabled={sending} style={inputStyle} />
            {error && <div role="alert" style={{ fontSize: "12px", color: "#D05050" }}>{error}</div>}
            <Btn primary onClick={submitReset} disabled={sending} style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: "15px", borderRadius: "10px" }}>
              {sending ? "Sending..." : "Send Reset Link"}
            </Btn>
            <button onClick={() => { setError(""); setMode("signin"); }} style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer" }}>
              Back to sign in
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="gate-fade-2" style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "380px", lineHeight: 1.7, marginBottom: "24px" }}>
            {mode === "signup" ? "Create your account to start building structured prompts." : "Sign in to your account."}
          </p>

          <div className="gate-fade-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%", maxWidth: "380px" }}>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} onKeyDown={e => e.key === "Enter" && !sending && submitPassword()} placeholder="you@example.com" aria-label="Email address" disabled={sending} style={inputStyle} />
            <div style={{ position: "relative", width: "100%" }}>
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(""); }} onKeyDown={e => e.key === "Enter" && !sending && submitPassword()} placeholder="Password" aria-label="Password" disabled={sending} style={{ ...inputStyle, paddingRight: "48px" }} />
              <button onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}>
                {showPassword ? <EyeOff size={18} color="rgba(255,255,255,0.4)" /> : <Eye size={18} color="rgba(255,255,255,0.4)" />}
              </button>
            </div>
            {error && <div role="alert" style={{ fontSize: "12px", color: "#D05050" }}>{error}</div>}

            <Btn primary onClick={submitPassword} disabled={sending} style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: "15px", borderRadius: "10px" }}>
              {sending ? "..." : mode === "signup" ? "Create Account" : "Sign In"}
            </Btn>

            {mode === "signin" && (
              <button onClick={() => { setError(""); setMode("forgot"); }} style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer" }}>
                Forgot password?
              </button>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", margin: "4px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            </div>

            <button onClick={submitMagicLink} disabled={sending} style={{ width: "100%", padding: "12px 20px", borderRadius: "10px", border: "1px solid rgba(184,134,78,0.2)", background: "transparent", color: "#B8864E", fontSize: "14px", fontWeight: 500, fontFamily: "'Libre Franklin', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <Mail size={16} /> Send Magic Link Instead
            </button>

            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
              {mode === "signin" ? (
                <>No account? <button onClick={() => { setError(""); setMode("signup"); }} style={{ color: "#B8864E", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontFamily: "'Libre Franklin', sans-serif" }}>Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => { setError(""); setMode("signin"); }} style={{ color: "#B8864E", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontFamily: "'Libre Franklin', sans-serif" }}>Sign in</button></>
              )}
            </div>
          </div>

          <div className="gate-fade-3" style={{ marginTop: "40px", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            {[{ icon: Target, label: "Identity" }, { icon: Brain, label: "Knowledge" }, { icon: ShieldOff, label: "Guardrails" }, { icon: Sliders, label: "Modes" }].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Icon size={14} color="rgba(184,134,78,0.5)" />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace" }}>{label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
