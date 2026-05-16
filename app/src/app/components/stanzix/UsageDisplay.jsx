"use client";
import { useState, useEffect, useCallback } from "react";
import { Zap, Infinity, ExternalLink, Loader2 } from "lucide-react";
import { getSupabaseClient } from "../../lib/supabase/client";

const GOLD = "#d4a24e";
const GOLD_DIM = "rgba(212,162,78,0.15)";
const GOLD_BORDER = "rgba(212,162,78,0.25)";

async function getToken() {
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

export default function UsageDisplay({ onUpgrade, isMobile }) {
  const [usage, setUsage] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const fetchUsage = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    try {
      const res = await fetch("/api/usage", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setUsage(await res.json());
    } catch {}
  }, []);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const openPortal = async () => {
    const token = await getToken();
    if (!token) return;
    setPortalLoading(true);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {}
    setPortalLoading(false);
  };

  if (!usage) return null;

  const isPaid = usage.tier !== "free";
  const pct = isPaid ? 100 : Math.round((usage.used / usage.limit) * 100);
  const atRisk = !isPaid && usage.used >= usage.limit - 1;
  const hitLimit = !isPaid && usage.used >= usage.limit;
  const barColor = hitLimit
    ? "#dc5050"
    : atRisk
    ? "#e0a020"
    : GOLD;

  return (
    <div
      style={{
        padding: isMobile ? "10px 14px" : "10px 16px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {/* Row 1: label + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Zap size={12} color={GOLD} />
          <span style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.5)" }}>
            Usage
          </span>
        </div>

        {isPaid ? (
          <div style={{ display: "flex", alignItems: "center", gap: "5px", background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: "6px", padding: "2px 8px" }}>
            <Infinity size={11} color={GOLD} />
            <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: GOLD, fontWeight: 600 }}>
              {usage.tier === "team" ? "Team" : "Pro"}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: hitLimit ? "#dc5050" : "rgba(255,255,255,0.4)" }}>
            {usage.used}/{usage.limit}
          </span>
        )}
      </div>

      {/* Row 2: progress bar (free) or flat bar (paid) */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: isPaid
              ? `linear-gradient(90deg, ${GOLD}, #b8862e)`
              : barColor,
            borderRadius: "2px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Row 3: CTA */}
      {!isPaid ? (
        <button
          onClick={onUpgrade}
          style={{
            marginTop: "2px",
            width: "100%",
            padding: "7px 10px",
            borderRadius: "8px",
            border: `1px solid ${GOLD_BORDER}`,
            background: hitLimit ? "rgba(212,162,78,0.12)" : "transparent",
            color: GOLD,
            fontSize: "11px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,162,78,0.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = hitLimit ? "rgba(212,162,78,0.12)" : "transparent")}
        >
          <Zap size={11} />
          {hitLimit ? "Limit reached — Upgrade to Pro" : "Upgrade to Pro — $15/mo"}
        </button>
      ) : (
        <button
          onClick={openPortal}
          disabled={portalLoading}
          style={{
            marginTop: "2px",
            width: "100%",
            padding: "7px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            color: "rgba(255,255,255,0.4)",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            cursor: portalLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          {portalLoading ? (
            <Loader2 size={11} className="spin" />
          ) : (
            <ExternalLink size={11} />
          )}
          Manage subscription
        </button>
      )}
    </div>
  );
}
