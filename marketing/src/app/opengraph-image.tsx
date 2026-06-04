import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Stanzix - Structured Prompts for Claude, ChatGPT, and Every LLM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C0B0A",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#F0EBE0",
              letterSpacing: "-1px",
            }}
          >
            Stanzix
          </span>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#B8864E",
              marginTop: 8,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#F0EBE0",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          The architecture behind every great prompt
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#948C7E",
            marginBottom: 48,
          }}
        >
          Structured prompts for Claude, ChatGPT, and every LLM
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Role</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Expertise</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Guardrails</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Behavior</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Priority</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Safety</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Format</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#B8864E",
              }}
            />
            <span style={{ fontSize: 14, color: "#5E5850" }}>Examples</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
