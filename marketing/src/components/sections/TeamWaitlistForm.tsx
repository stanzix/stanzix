"use client";

import { useState, type FormEvent } from "react";
import { getSupabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "error";

export default function TeamWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const { error } = await getSupabase()
        .from("team_waitlist")
        .insert({ email: email.trim().toLowerCase(), source: "marketing" });

      if (error) {
        if (error.code === "23505") {
          setStatus("success");
        } else {
          setErrorMsg("Something went wrong. Please try again.");
          setStatus("error");
        }
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 w-full py-3 rounded-md border border-green-500/25 bg-green-500/8 text-green-400 font-medium text-sm">
        <span aria-hidden="true">&#10003;</span>
        You&apos;re on the list!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 min-w-0 px-3 py-2.5 rounded-md border border-border bg-background text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 px-4 py-2.5 rounded-md border border-accent text-accent hover:bg-accent/10 font-medium text-sm transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Notify Me"}
        </button>
      </div>
      {status === "error" && errorMsg && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
