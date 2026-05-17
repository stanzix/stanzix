"use client";
import { Component } from "react";
import { RefreshCw } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Stanzix error boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            gap: "20px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div style={{ fontSize: "32px" }}>⚠️</div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#e0e0e0", margin: 0 }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: "360px", margin: 0, lineHeight: 1.6 }}>
            An unexpected error occurred. Your saved prompts are safe.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(212,162,78,0.3)",
              background: "rgba(212,162,78,0.08)",
              color: "#d4a24e",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <RefreshCw size={15} />
            Reload page
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre style={{ fontSize: "11px", color: "rgba(255,100,100,0.7)", maxWidth: "600px", overflow: "auto", marginTop: "16px" }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
