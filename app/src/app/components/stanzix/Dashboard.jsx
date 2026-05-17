"use client";
import { useState } from "react";
import { Zap, LogOut, Copy, Trash2, Check, Plus, ArrowRight } from "lucide-react";

function relativeDate(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", {
    month: "short", day: "numeric",
    year: diffDays > 365 ? "numeric" : undefined,
  });
}

function formatDate(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function Dashboard({
  email,
  hasActiveSession,
  activeProjectName,
  activeDomain,
  activeLastEdited,
  promptHistory,
  usageCount,
  freeLimit,
  isPaid,
  onContinue,
  onNewPrompt,
  onStartFromScratch,
  onEditExisting,
  onCopyPrompt,
  onDeletePrompt,
  onSignOut,
  onManageSubscription,
  isMobile,
}) {
  const isNewUser = promptHistory.length === 0 && !hasActiveSession;
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const usageAtRisk = !isPaid && usageCount !== null && usageCount >= freeLimit - 1;
  const usageHit = !isPaid && usageCount !== null && usageCount >= freeLimit;

  const handleCopy = async (entry) => {
    await onCopyPrompt(entry);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    if (deleteConfirmId === id) {
      onDeletePrompt(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(c => c === id ? null : c), 3000);
    }
  };

  // ── New User State ─────────────────────────────────────────────────────────
  if (isNewUser) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "32px 20px" : "48px 24px", minHeight: "100%" }}>
        <div style={{ width: "100%", maxWidth: "520px" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #d4a24e, #b8862e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Zap size={22} color="#1a1a1a" />
            </div>
            <span style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>Stanzix</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: 700, letterSpacing: "-0.8px", textAlign: "center", marginBottom: "14px", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0", lineHeight: 1.2 }}>
            Welcome to Stanzix
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "32px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
            Build structured prompts for Claude, ChatGPT, and every LLM.{isMobile ? " " : <br />}
            Describe what you need, configure 8 levers, get a prompt that works.
          </p>

          {/* Free tier badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: "rgba(212,162,78,0.06)", border: "1px solid rgba(212,162,78,0.15)", borderRadius: "10px", marginBottom: "28px" }}>
            <Zap size={18} color="#d4a24e" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#e0e0e0", fontFamily: "'DM Sans', sans-serif" }}>
                5 free prompts to start
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "2px", fontFamily: "'DM Sans', sans-serif" }}>
                No credit card required. Upgrade anytime for unlimited.
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onNewPrompt}
            style={{ width: "100%", padding: "14px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #d4a24e, #b8862e)", color: "#1a1a1a", fontSize: "15px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}
          >
            Build Your First Prompt
            <ArrowRight size={18} />
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0 14px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* Edit existing */}
          <button
            onClick={onEditExisting}
            style={{ width: "100%", padding: "12px 20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif" }}
          >
            Paste existing instructions → Edit
          </button>

          {/* Sign out */}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button
              onClick={onSignOut}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <LogOut size={13} />
              Sign out ({email})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Returning User State ───────────────────────────────────────────────────
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>

      {/* Compact header */}
      <header style={{ padding: isMobile ? "12px 16px" : "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg, #d4a24e, #b8862e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Zap size={15} color="#1a1a1a" />
          </div>
          <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.3px", fontFamily: "'DM Sans', sans-serif" }}>Stanzix</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!isPaid && usageCount !== null && (
            <div
              title={usageHit ? "Monthly limit reached" : `${freeLimit - usageCount} prompts remaining this month`}
              style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: usageHit ? "#dc5050" : usageAtRisk ? "#d4a24e" : "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.04)", border: `1px solid ${usageHit ? "rgba(220,80,80,0.3)" : usageAtRisk ? "rgba(212,162,78,0.25)" : "rgba(255,255,255,0.08)"}`, borderRadius: "6px", padding: "4px 10px", cursor: "default" }}
            >
              {usageCount} / {freeLimit} free
            </div>
          )}
          {isPaid && typeof onManageSubscription === "function" && (
            <button
              onClick={onManageSubscription}
              title="Manage subscription"
              style={{ background: "none", border: "1px solid rgba(212,162,78,0.25)", borderRadius: "6px", cursor: "pointer", padding: "4px 10px", display: "flex", alignItems: "center", gap: "4px", color: "#d4a24e", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {!isMobile && "Manage subscription"}
              {isMobile && "Billing"}
            </button>
          )}
          <button
            onClick={onSignOut}
            title={`Sign out (${email})`}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.45)" }}
          >
            <LogOut size={15} />
            {!isMobile && <span style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>Sign out</span>}
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", width: "100%", padding: isMobile ? "24px 16px 40px" : "36px 32px 48px" }}>

        {/* Active session card */}
        {hasActiveSession && (
          <div style={{ background: "rgba(212,162,78,0.04)", border: "1px solid rgba(212,162,78,0.18)", borderLeft: "3px solid #d4a24e", borderRadius: "10px", padding: isMobile ? "16px 18px" : "20px 24px", marginBottom: "32px" }}>
            <div style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#d4a24e", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "10px" }}>
              ▶ Active Session
            </div>
            <div style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: 700, color: "#e0e0e0", fontFamily: "'DM Sans', sans-serif", marginBottom: activeDomain ? "4px" : "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {activeProjectName || "Untitled Project"}
            </div>
            {activeDomain && (
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>
                {activeDomain}
              </div>
            )}
            {activeLastEdited && (
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px" }}>
                Edited {relativeDate(activeLastEdited)}
              </div>
            )}
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
              <button
                onClick={onContinue}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #d4a24e, #b8862e)", color: "#1a1a1a", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Continue Editing
              </button>
              <button
                onClick={onNewPrompt}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Start Fresh
              </button>
            </div>
          </div>
        )}

        {/* Library section header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Your Prompts
          </div>
          {promptHistory.length > 0 && (
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
              {promptHistory.length} saved
            </div>
          )}
        </div>

        {/* Library entries */}
        {promptHistory.length === 0 ? (
          <div style={{ padding: "28px 0 32px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
              Prompts you export will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
            {promptHistory.map((entry) => (
              <div key={entry.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#e0e0e0", fontFamily: "'DM Sans', sans-serif", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {entry.projectName || "Untitled"}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "8px" }}>
                  {formatDate(entry.savedAt)}
                </div>
                {entry.instructions && (
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, marginBottom: "12px", flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {entry.instructions.slice(0, 140)}
                  </div>
                )}
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "auto" }}>
                  <button
                    onClick={() => handleCopy(entry)}
                    style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: copiedId === entry.id ? "#50b450" : "rgba(255,255,255,0.65)", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s", fontWeight: 500 }}
                  >
                    {copiedId === entry.id ? <Check size={13} /> : <Copy size={13} />}
                    {copiedId === entry.id ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    title={deleteConfirmId === entry.id ? "Click again to confirm" : "Delete"}
                    style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 10px", borderRadius: "6px", border: `1px solid ${deleteConfirmId === entry.id ? "rgba(220,80,80,0.4)" : "rgba(255,255,255,0.08)"}`, background: deleteConfirmId === entry.id ? "rgba(220,80,80,0.08)" : "transparent", color: deleteConfirmId === entry.id ? "#dc5050" : "rgba(255,255,255,0.3)", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}
                  >
                    <Trash2 size={13} />
                    {deleteConfirmId === entry.id && <span>Delete?</span>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New prompt CTA */}
        <div style={{ textAlign: "center", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={onNewPrompt}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #d4a24e, #b8862e)", color: "#1a1a1a", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            <Plus size={16} />
            New Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
