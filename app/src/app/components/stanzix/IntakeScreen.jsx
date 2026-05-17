"use client";
import { useState, useRef } from "react";
import { Zap, ArrowRight, Loader2 } from "lucide-react";

const EXAMPLES = [
  "A customer support bot for my SaaS",
  "Blog content writer for my fitness brand",
  "Legal contract reviewer for a small firm",
  "Sales call prep assistant for B2B reps",
];

export default function IntakeScreen({ onComplete, onSkip, isMobile }) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = async () => {
    if (!value.trim() || submitting) return;
    setSubmitting(true);
    const success = await onComplete(value.trim());
    // On success the component unmounts (routing changes to builder).
    // On failure we re-enable the button so the user can try again.
    if (!success) setSubmitting(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "32px 20px" : "48px 24px",
      minHeight: "100%",
    }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "44px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #d4a24e, #b8862e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Zap size={22} color="#1a1a1a" />
          </div>
          <span style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>Stanzix</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: isMobile ? "22px" : "27px", fontWeight: 700, letterSpacing: "-0.5px", textAlign: "center", marginBottom: "10px", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" }}>
          What are you building this for?
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "28px", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          Describe it in plain language — one sentence is enough.
        </p>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. A customer support bot for my SaaS product"
          rows={3}
          autoFocus
          style={{
            width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px", padding: "14px 16px", color: "#e0e0e0", fontSize: "15px",
            fontFamily: "'DM Sans', sans-serif", resize: "none", outline: "none",
            lineHeight: 1.6, boxSizing: "border-box", marginBottom: "14px",
            transition: "border-color 0.2s",
          }}
        />

        {/* CTA button */}
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || submitting}
          style={{
            width: "100%", padding: "14px 24px", borderRadius: "10px", border: "none",
            background: !value.trim() || submitting ? "rgba(212,162,78,0.3)" : "linear-gradient(135deg, #d4a24e, #b8862e)",
            color: !value.trim() || submitting ? "rgba(255,255,255,0.35)" : "#1a1a1a",
            fontSize: "15px", fontWeight: 700, cursor: !value.trim() || submitting ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
          }}
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="spin" />
              Analyzing your use case...
            </>
          ) : (
            <>
              Build My Prompt
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0 16px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px" }}>EXAMPLES</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Example chips */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setValue(ex); textareaRef.current?.focus(); }}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px", padding: "10px 14px", color: "rgba(255,255,255,0.55)",
                fontSize: "13px", cursor: "pointer", textAlign: "left",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(212,162,78,0.06)";
                e.currentTarget.style.borderColor = "rgba(212,162,78,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              "{ex}"
            </button>
          ))}
        </div>

        {/* Skip link */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onSkip}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.35)", fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: "4px",
            }}
          >
            or: Start from scratch →
          </button>
        </div>
      </div>
    </div>
  );
}
