"use client";
import { useEffect } from "react";
import { Settings, X, Mail, ExternalLink, LogOut, Crown } from "lucide-react";
import { VERSION } from "../../lib/outputBuilder";

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: "10px",
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4a24e",
      textTransform: "uppercase",
      letterSpacing: "1.2px",
      marginBottom: "12px",
    }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "20px 0" }} />;
}

export default function SettingsPanel({
  open,
  onClose,
  email,
  isPaid,
  usageCount,
  freeLimit,
  onManageSubscription,
  onSignOut,
  onUpgrade,
  isMobile,
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const usageRatio = usageCount != null && freeLimit ? usageCount / freeLimit : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-panel-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 480,
          maxHeight: "min(88vh, 600px)",
          background: "#161618",
          border: "1px solid rgba(212,162,78,0.2)",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Settings size={20} color="#d4a24e" />
            <h2 id="settings-panel-title" style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
              Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close settings"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", color: "rgba(255,255,255,0.5)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>

          {/* Account */}
          <SectionLabel>Account</SectionLabel>
          <div style={{
            fontSize: "13px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "12px",
            wordBreak: "break-all",
          }}>
            {email}
          </div>
          <button
            onClick={() => { onSignOut(); onClose(); }}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <LogOut size={14} />
            Sign out
          </button>

          <Divider />

          {/* Plan */}
          <SectionLabel>Plan</SectionLabel>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "14px",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              background: isPaid ? "rgba(212,162,78,0.12)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${isPaid ? "rgba(212,162,78,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: isPaid ? "#d4a24e" : "rgba(255,255,255,0.6)",
            }}>
              {isPaid && <Crown size={13} />}
              {isPaid ? "Pro" : "Free"}
            </div>
          </div>

          {!isPaid && usageCount != null && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "6px",
              }}>
                <span>Monthly usage</span>
                <span>{usageCount} / {freeLimit}</span>
              </div>
              <div style={{
                height: "4px",
                borderRadius: "2px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${Math.min(usageRatio * 100, 100)}%`,
                  borderRadius: "2px",
                  background: usageRatio >= 1 ? "#dc5050" : usageRatio >= 0.8 ? "#d4a24e" : "rgba(255,255,255,0.3)",
                  transition: "width 0.3s ease",
                }} />
              </div>
            </div>
          )}

          {isPaid ? (
            <button
              onClick={onManageSubscription}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(212,162,78,0.25)",
                background: "rgba(212,162,78,0.06)",
                color: "#d4a24e",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Manage subscription
              <ExternalLink size={13} />
            </button>
          ) : (
            <button
              onClick={() => { onUpgrade(); onClose(); }}
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #d4a24e, #b8862e)",
                color: "#1a1a1a",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Crown size={14} />
              Upgrade to Pro
            </button>
          )}

          <Divider />

          {/* Support */}
          <SectionLabel>Support</SectionLabel>
          <a
            href={`mailto:support@stanzix.com?subject=${encodeURIComponent("Stanzix Support Request")}&body=${encodeURIComponent(`Account: ${email}\n\n`)}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              textDecoration: "none",
              boxSizing: "border-box",
            }}
          >
            <Mail size={15} />
            Contact Support
          </a>

          {/* Version footer */}
          <div style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "11px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(255,255,255,0.2)",
          }}>
            Stanzix {VERSION}
          </div>
        </div>
      </div>
    </div>
  );
}
