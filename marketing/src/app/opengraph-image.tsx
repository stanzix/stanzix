import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Stanzix - Structured Prompts for Claude, ChatGPT, and Every LLM";
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
          background: "#0C0B0A",
          position: "relative",
        }}
      >
        {/* Subtle ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,134,78,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#F0EBE0",
              letterSpacing: "-1px",
            }}
          >
            Stanzix
          </span>
          <span style={{ color: "#B8864E", fontSize: 16, marginTop: 8 }}>
            ●
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#F0EBE0",
            letterSpacing: "-0.5px",
            fontWeight: 500,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          The architecture behind every{" "}
          <span style={{ color: "#B8864E", fontStyle: "italic" }}>
            great prompt
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            color: "#948C7E",
            maxWidth: 500,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Structured prompts for Claude, ChatGPT, and every LLM
        </div>

        {/* Lever preview row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
          }}
        >
          {["Role", "Expertise", "Guardrails", "Behavior", "Priority", "Safety", "Format", "Examples"].map(
            (lever) => (
              <div
                key={lever}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#B8864E",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: "#5E5850",
                    letterSpacing: "0.5px",
                  }}
                >
                  {lever}
                </span>
              </div>
            )
          )}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #B8864E, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
