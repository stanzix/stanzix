"use client";
import { useState, useMemo } from "react";
import { X, Library, Copy, Check, Trash2, FileText, AlignLeft } from "lucide-react";
import { Btn } from "./ui";

function formatSavedAt(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

async function copyText(text) {
  const t = String(text || "");
  if (!t) return false;
  try {
    await navigator.clipboard.writeText(t);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = t;
      Object.assign(ta.style, { position: "fixed", left: "-9999px", top: "-9999px", opacity: "0" });
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export default function PromptLibraryModal({
  open,
  onClose,
  history,
  onDelete,
  onSaveCurrent,
  showError,
  canSaveCurrent,
  currentTitle,
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [copiedKind, setCopiedKind] = useState(null);

  const sorted = useMemo(() => [...history].sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt))), [history]);

  const handleCopy = async (entry, kind) => {
    const text = kind === "blurb" ? entry.blurb : entry.instructions;
    if (!text?.trim()) {
      if (showError) showError(kind === "blurb" ? "No saved blurb for this entry." : "Nothing to copy.");
      return;
    }
    const ok = await copyText(text);
    if (!ok) {
      if (showError) showError("Copy failed.");
      return;
    }
    setCopiedId(entry.id);
    setCopiedKind(kind);
    setTimeout(() => {
      setCopiedId((id) => (id === entry.id ? null : id));
      setCopiedKind(null);
    }, 2000);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-library-title"
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
          maxWidth: 560,
          maxHeight: "min(88vh, 720px)",
          background: "#161618",
          border: "1px solid rgba(212,162,78,0.2)",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Library size={20} color="#d4a24e" />
            <h2 id="prompt-library-title" style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
              Prompt library
            </h2>
            <span
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.45)",
                background: "rgba(255,255,255,0.06)",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              {history.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              borderRadius: 8,
              color: "rgba(255,255,255,0.5)",
              display: "flex",
            }}
          >
            <X size={22} />
          </button>
        </div>

        {canSaveCurrent && (
          <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
              Save the instructions you have now (with name: <strong style={{ color: "#e0e0e0" }}>{currentTitle || "Untitled"}</strong>)
            </div>
            <Btn primary small onClick={onSaveCurrent}>
              <FileText size={14} /> Save current to library
            </Btn>
          </div>
        )}

        <div style={{ overflowY: "auto", flex: 1, padding: "12px 14px 18px" }}>
          {sorted.length === 0 ? (
            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, padding: "8px 6px" }}>
              No saved prompts yet. When you copy your full instructions from Export, we add them here automatically. You can also
              click &quot;Save current to library&quot; after you build a prompt.
            </p>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {sorted.map((entry) => {
                const instPreview =
                  entry.instructions.length > 140 ? `${entry.instructions.slice(0, 140)}…` : entry.instructions;
                return (
                  <li
                    key={entry.id}
                    style={{
                      background: "rgba(0,0,0,0.35)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "12px 12px 10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#e8e8e8", lineHeight: 1.3 }}>
                          {entry.projectName || "Untitled"}
                        </div>
                        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                          {formatSavedAt(entry.savedAt)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDelete(entry.id)}
                        aria-label="Remove from library"
                        title="Remove"
                        style={{
                          background: "rgba(220,80,80,0.12)",
                          border: "1px solid rgba(220,80,80,0.25)",
                          borderRadius: 8,
                          padding: "6px 8px",
                          cursor: "pointer",
                          color: "#c75c5c",
                          display: "flex",
                          flexShrink: 0,
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <pre
                      style={{
                        margin: "0 0 10px",
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "rgba(255,255,255,0.55)",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.45,
                        maxHeight: 72,
                        overflow: "hidden",
                      }}
                    >
                      {instPreview}
                    </pre>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <Btn
                        small
                        primary
                        onClick={() => handleCopy(entry, "instructions")}
                        disabled={!entry.instructions?.trim()}
                      >
                        {copiedId === entry.id && copiedKind === "instructions" ? (
                          <>
                            <Check size={14} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Instructions
                          </>
                        )}
                      </Btn>
                      <Btn small onClick={() => handleCopy(entry, "blurb")} disabled={!entry.blurb?.trim()}>
                        {copiedId === entry.id && copiedKind === "blurb" ? (
                          <>
                            <Check size={14} /> Copied
                          </>
                        ) : (
                          <>
                            <AlignLeft size={14} /> Project blurb
                          </>
                        )}
                      </Btn>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
