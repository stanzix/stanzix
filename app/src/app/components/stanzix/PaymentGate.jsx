"use client";
import { ChevronLeft, Zap, Loader2, Sparkles, Target, Brain, ShieldOff, Sliders, Check } from "lucide-react";
import { VERSION } from "../../lib/outputBuilder";

const GOLD = "#d4a24e";
const GOLD_DIM = "rgba(212,162,78,0.08)";
const GOLD_BORDER = "rgba(212,162,78,0.25)";

const FEATURES_PRO = [
  { icon: Target, label: "AI-generated agent identity" },
  { icon: Brain, label: "Knowledge base via guided quiz" },
  { icon: ShieldOff, label: "Custom guardrails & negative space" },
  { icon: Sliders, label: "Behavior modes + priority ranking" },
  { icon: Sparkles, label: "Unlimited prompts per month" },
];

const FEATURES_TEAM = [
  { icon: Check, label: "Everything in Pro" },
  { icon: Sliders, label: "Shared team templates" },
  { icon: Target, label: "Team workspaces" },
  { icon: Brain, label: "Usage analytics" },
  { icon: Sparkles, label: "Priority support" },
];

function PlanCard({ title, price, period, features, ctaLabel, onCheckout, pending, pendingLabel, highlight }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "220px",
        background: highlight ? GOLD_DIM : "rgba(255,255,255,0.03)",
        border: `1px solid ${highlight ? GOLD_BORDER : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: "-11px",
            left: "50%",
            transform: "translateX(-50%)",
            background: `linear-gradient(90deg, ${GOLD}, #b8862e)`,
            color: "#1a1a1a",
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
            padding: "3px 10px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
          }}
        >
          MOST POPULAR
        </div>
      )}

      <div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#e0e0e0" }}>{title}</div>
        <div style={{ marginTop: "6px", display: "flex", alignItems: "baseline", gap: "4px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: highlight ? GOLD : "#e0e0e0" }}>
            ${price}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>/{period}</span>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {features.map(({ icon: Icon, label }) => (
          <li key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "5px",
                background: "rgba(212,162,78,0.1)",
                border: "1px solid rgba(212,162,78,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={11} color={GOLD} />
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{label}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCheckout}
        disabled={pending}
        style={{
          marginTop: "auto",
          width: "100%",
          padding: "13px 16px",
          borderRadius: "10px",
          border: highlight ? "none" : `1px solid ${GOLD_BORDER}`,
          cursor: pending ? "not-allowed" : "pointer",
          background: highlight
            ? pending
              ? "rgba(212,162,78,0.4)"
              : `linear-gradient(135deg, ${GOLD}, #b8862e)`
            : GOLD_DIM,
          color: highlight ? "#1a1a1a" : GOLD,
          fontSize: "13px",
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          transition: "opacity 0.2s",
          letterSpacing: "-0.1px",
        }}
      >
        {pending ? (
          <>
            <Loader2 size={15} className="spin" />
            {pendingLabel}
          </>
        ) : (
          <>
            <Zap size={15} />
            {ctaLabel}
          </>
        )}
      </button>
    </div>
  );
}

export default function PaymentGate({ email, onCheckoutPro, onCheckoutTeam, pendingPro, pendingTeam, error, isMobile }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "32px 16px" : "60px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <a
        href="/"
        style={{
          position: "absolute",
          top: isMobile ? "16px" : "24px",
          left: isMobile ? "16px" : "24px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "rgba(255,255,255,0.55)",
          fontSize: "13px",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          transition: "color 0.2s",
          zIndex: 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
      >
        <ChevronLeft size={16} /> stanzix.com
      </a>

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,162,78,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="gate-fade" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "13px",
            background: `linear-gradient(135deg, ${GOLD}, #b8862e)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zap size={24} color="#1a1a1a" />
        </div>
        <div>
          <h1 style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>
            Unlock Stanzix
          </h1>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono', monospace" }}>
            Project Instructions Builder · {VERSION}
          </div>
        </div>
      </div>

      <p
        className="gate-fade-2"
        style={{
          fontSize: isMobile ? "13px" : "14px",
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          maxWidth: "480px",
          lineHeight: 1.7,
          marginBottom: "32px",
        }}
      >
        You've used your 5 free prompts. Upgrade to keep building — cancel any time.
      </p>

      {/* Email badge */}
      <div
        className="gate-fade-2"
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'JetBrains Mono', monospace",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px",
          padding: "6px 12px",
          marginBottom: "28px",
          maxWidth: "320px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {email}
      </div>

      {/* Pricing cards */}
      <div
        className="gate-fade-2"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "16px",
          width: "100%",
          maxWidth: "560px",
        }}
      >
        <PlanCard
          title="Pro"
          price="15"
          period="mo"
          features={FEATURES_PRO}
          ctaLabel="Get Pro"
          pendingLabel="Redirecting..."
          onCheckout={onCheckoutPro}
          pending={pendingPro}
          highlight
        />
        <PlanCard
          title="Team"
          price="39"
          period="user/mo"
          features={FEATURES_TEAM}
          ctaLabel="Get Team"
          pendingLabel="Redirecting..."
          onCheckout={onCheckoutTeam}
          pending={pendingTeam}
          highlight={false}
        />
      </div>

      {/* Global error */}
      {error && (
        <div
          role="alert"
          style={{
            marginTop: "16px",
            fontSize: "13px",
            color: "#dc5050",
            background: "rgba(220,80,80,0.08)",
            border: "1px solid rgba(220,80,80,0.25)",
            borderRadius: "8px",
            padding: "10px 16px",
            maxWidth: "560px",
            width: "100%",
          }}
        >
          {error}
        </div>
      )}

      <p
        style={{
          marginTop: "20px",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Secure payment via Stripe · Cancel any time
      </p>
    </div>
  );
}
