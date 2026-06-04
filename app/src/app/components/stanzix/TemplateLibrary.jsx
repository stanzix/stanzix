"use client";
import { useState, useMemo } from "react";
import { X, Zap, ChevronRight, Lock } from "lucide-react";
import { CATEGORIES, TEMPLATES } from "../../lib/templateLibrary";

const GOLD = "#C07A56";
const GOLD_DIM = "rgba(192,122,86,0.08)";
const GOLD_BORDER = "rgba(192,122,86,0.25)";

export default function TemplateLibrary({ open, onClose, onSelectTemplate, isPaid, onUpgrade, initialCategory }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [tierFilter, setTierFilter] = useState(null);

  const filtered = useMemo(() => {
    let result = TEMPLATES;
    if (activeCategory) result = result.filter((t) => t.category === activeCategory);
    if (tierFilter) result = result.filter((t) => t.tier === tierFilter);
    return result;
  }, [activeCategory, tierFilter]);

  const proCount = TEMPLATES.filter((t) => t.tier === "pro").length;
  const freeCount = TEMPLATES.filter((t) => t.tier === "free").length;

  if (!open) return null;

  const categoryCount = (catId) => TEMPLATES.filter((t) => t.category === catId).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-library-title"
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
          maxWidth: 680,
          maxHeight: "min(90vh, 800px)",
          background: "#161618",
          border: `1px solid ${GOLD_BORDER}`,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Zap size={18} color={GOLD} />
            <h2 id="template-library-title" style={{ fontSize: "15px", fontWeight: 700, color: "#F0EBE0", fontFamily: "'Libre Franklin', sans-serif", margin: 0 }}>
              Template Library
            </h2>
            <span style={{ fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "2px 8px" }}>
              {TEMPLATES.length} templates
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}
          >
            <X size={18} color="rgba(255,255,255,0.5)" />
          </button>
        </div>

        {/* Tier filter */}
        <div style={{ display: "flex", gap: "6px", padding: "10px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
          {[
            { key: null, label: `All (${TEMPLATES.length})` },
            { key: "free", label: `Free (${freeCount})` },
            { key: "pro", label: `Pro Vault (${proCount})` },
          ].map((f) => (
            <button
              key={f.key ?? "all"}
              onClick={() => { setTierFilter(f.key); setSelectedTemplate(null); }}
              style={{
                padding: "4px 10px", borderRadius: "4px", border: "none", cursor: "pointer",
                background: tierFilter === f.key ? GOLD : "rgba(255,255,255,0.05)",
                color: tierFilter === f.key ? "#0C0B0A" : "rgba(255,255,255,0.5)",
                fontSize: "11px", fontWeight: 600, fontFamily: "'Libre Franklin', sans-serif",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category filter pills */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            padding: "10px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            overflowX: "auto",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => { setActiveCategory(null); setSelectedTemplate(null); }}
            style={{
              padding: "5px 12px",
              borderRadius: "6px",
              border: `1px solid ${!activeCategory ? GOLD_BORDER : "rgba(255,255,255,0.08)"}`,
              background: !activeCategory ? GOLD_DIM : "transparent",
              color: !activeCategory ? GOLD : "rgba(255,255,255,0.55)",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "'Libre Franklin', sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSelectedTemplate(null); }}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: `1px solid ${activeCategory === cat.id ? GOLD_BORDER : "rgba(255,255,255,0.08)"}`,
                background: activeCategory === cat.id ? GOLD_DIM : "transparent",
                color: activeCategory === cat.id ? GOLD : "rgba(255,255,255,0.55)",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "'Libre Franklin', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {cat.name} ({categoryCount(cat.id)})
            </button>
          ))}
        </div>

        {/* Template grid + preview */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
          {selectedTemplate ? (
            /* ── Preview state ─────────────────────────────────────── */
            <div>
              <button
                onClick={() => setSelectedTemplate(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "'Libre Franklin', sans-serif", marginBottom: "12px", display: "flex", alignItems: "center", gap: "4px" }}
              >
                ← Back to templates
              </button>

              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace", color: GOLD, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: "4px", padding: "2px 7px", textTransform: "uppercase" }}>
                    {CATEGORIES.find((c) => c.id === selectedTemplate.category)?.name}
                  </span>
                  {selectedTemplate.tier === "pro" && (
                    <span style={{ fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace", color: "#0C0B0A", background: GOLD, borderRadius: "4px", padding: "2px 7px", fontWeight: 700, letterSpacing: "0.5px" }}>PRO</span>
                  )}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#F0EBE0", fontFamily: "'Libre Franklin', sans-serif", margin: "8px 0 6px" }}>
                  {selectedTemplate.name}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "18px", fontFamily: "'Libre Franklin', sans-serif" }}>
                  {selectedTemplate.description}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "Project", value: selectedTemplate.projectName },
                    { label: "Domain", value: selectedTemplate.domain },
                    { label: "Description", value: selectedTemplate.projectDesc },
                    { label: "Goals", value: selectedTemplate.goals },
                  ].map((field) => (
                    <div key={field.label}>
                      <div style={{ fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace", color: GOLD, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>
                        {field.label}
                      </div>
                      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontFamily: "'Libre Franklin', sans-serif" }}>
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {isPaid || selectedTemplate.tier === "free" ? (
                    <button
                      onClick={() => onSelectTemplate(selectedTemplate)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "none",
                        background: `linear-gradient(135deg, ${GOLD}, #A96A49)`,
                        color: "#1a1a1a",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Libre Franklin', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <Zap size={16} />
                      Use This Template
                    </button>
                  ) : (
                    <div>
                      <button
                        onClick={onUpgrade}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: `1px solid ${GOLD_BORDER}`,
                          background: GOLD_DIM,
                          color: GOLD,
                          fontSize: "14px",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "'Libre Franklin', sans-serif",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <Lock size={15} />
                        Upgrade to Pro for Premium Templates
                      </button>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "8px", fontFamily: "'Libre Franklin', sans-serif" }}>
                        30 premium templates in the Pro Vault
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ── Grid state ────────────────────────────────────────── */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {filtered.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  style={{
                    textAlign: "left",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.background = GOLD_DIM; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#F0EBE0", fontFamily: "'Libre Franklin', sans-serif" }}>
                        {template.name}
                      </span>
                      {template.tier === "pro" && (
                        <span style={{ fontSize: "9px", fontFamily: "'IBM Plex Mono', monospace", color: GOLD, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: "3px", padding: "1px 5px", fontWeight: 600, letterSpacing: "0.5px" }}>PRO</span>
                      )}
                    </div>
                    <ChevronRight size={14} color="rgba(255,255,255,0.3)" />
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "'Libre Franklin', sans-serif", lineHeight: 1.4 }}>
                    {template.description}
                  </span>
                  {!activeCategory && (
                    <span style={{ fontSize: "9px", fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>
                      {CATEGORIES.find((c) => c.id === template.category)?.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
