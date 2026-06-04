"use client";
import { Fragment, useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Zap, PanelRightOpen, PanelRightClose, Home, Lightbulb, Wand2, Check, Copy, CheckCircle2, LogOut, Loader2, Settings } from "lucide-react";
import { useStanzix } from "../hooks/useStanzix";
import { useAuth } from "../hooks/useAuth";
import { STEPS, VERSION } from "../lib/outputBuilder";
import { getSupabaseClient } from "../lib/supabase/client";
import { Toast, Fireworks, Btn, Badge, LoadingIndicator } from "./stanzix/ui";
import { ContextStep } from "./stanzix/steps/ContextStep";
import { IdentityStep } from "./stanzix/steps/IdentityStep";
import { KnowledgeStep } from "./stanzix/steps/KnowledgeStep";
import { NegativeSpaceStep } from "./stanzix/steps/NegativeSpaceStep";
import { ModesStep } from "./stanzix/steps/ModesStep";
import { PriorityStep } from "./stanzix/steps/PriorityStep";
import { FailureStep } from "./stanzix/steps/FailureStep";
import { TemplatesStep } from "./stanzix/steps/TemplatesStep";
import { ExamplesStep } from "./stanzix/steps/ExamplesStep";
import { ExportStep } from "./stanzix/steps/ExportStep";
import PreviewPanel from "./stanzix/PreviewPanel";
import EditMode from "./stanzix/EditMode";
import SignInGate from "./stanzix/SignInGate";
import PaymentGate from "./stanzix/PaymentGate";
import UsageDisplay from "./stanzix/UsageDisplay";
import PromptLibraryModal from "./stanzix/PromptLibraryModal";
import TemplateLibrary from "./stanzix/TemplateLibrary";
import SettingsPanel from "./stanzix/SettingsPanel";
import IntakeScreen from "./stanzix/IntakeScreen";
import Dashboard from "./stanzix/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import { stripeProPriceId } from "../lib/stripeClient";

const PHASES = [
  { label: "Describe",  steps: [0] },
  { label: "Configure", steps: [1, 2, 3, 4, 5, 6, 7, 8] },
  { label: "Export",    steps: [9] },
];

function getPhaseInfo(step) {
  const phase = PHASES.find(p => p.steps.includes(step));
  if (!phase) return { phase: PHASES[0], posInPhase: 1 };
  return { phase, posInPhase: phase.steps.indexOf(step) + 1 };
}

const FREE_LIMIT = 5;

const STEP_COMPONENTS = [ContextStep, IdentityStep, KnowledgeStep, NegativeSpaceStep, ModesStep, PriorityStep, FailureStep, TemplatesStep, ExamplesStep, ExportStep];

function StanzixInner() {
  const auth = useAuth();
  const pe = useStanzix(auth.user);

  // Subscription state — true when user has an active paid plan
  const [isPaid, setIsPaid] = useState(false);
  // Paywall visibility — only shown when free limit is hit
  const [showPaywall, setShowPaywall] = useState(false);
  const [pendingPro, setPendingPro] = useState(false);
  const [pendingTeam, setPendingTeam] = useState(false);
  const [teamWaitlistJoined, setTeamWaitlistJoined] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [templateCategory, setTemplateCategory] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Detect checkout=success / canceled / plan=pro params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("checkout");
    if (result === "success") { setIsPaid(true); setShowPaywall(false); }
    if (result === "canceled") setCheckoutError("Payment was canceled. Try again when you're ready.");
    if (params.get("plan") === "pro") setShowPaywall(true);
    if (result || params.get("plan")) window.history.replaceState({}, "", window.location.pathname);
  }, []);

  // Fetch subscription status from Supabase after auth
  useEffect(() => {
    if (!auth.user) return;
    (async () => {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase
          .from("profiles")
          .select("subscription_tier, subscription_status")
          .eq("id", auth.user.id)
          .maybeSingle();
        if (data?.subscription_tier !== "free" && data?.subscription_status === "active") {
          setIsPaid(true);
        }
      } catch {}
    })();
  }, [auth.user]);

  const initiatePortal = async () => {
    if (!auth.user) return;
    try {
      const supabase = getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {}
  };

  const initiateCheckout = async (priceId, setPending) => {
    if (!auth.user) return;
    setPending(true);
    setCheckoutError("");
    try {
      const supabase = getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || "Failed to start checkout. Please try again.");
        setPending(false);
      }
    } catch {
      setCheckoutError("Failed to start checkout. Please try again.");
      setPending(false);
    }
  };

  const joinTeamWaitlist = async () => {
    if (!auth.user) return;
    setPendingTeam(true);
    setCheckoutError("");
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("team_waitlist")
        .insert({ email: auth.user.email, user_id: auth.user.id, source: "app" });
      if (error) {
        if (error.code === "23505") {
          setTeamWaitlistJoined(true);
        } else {
          setCheckoutError("Something went wrong. Please try again.");
        }
      } else {
        setTeamWaitlistJoined(true);
      }
    } catch {
      setCheckoutError("Something went wrong. Please try again.");
    } finally {
      setPendingTeam(false);
    }
  };

  // Usage counter (for header display and warning banners)
  const [usageCount, setUsageCount] = useState(null);

  const onExportLogged = async () => {
    const usage = await pe.logExport();
    if (usage) {
      setUsageCount(usage.used);
      if (!isPaid && usage.used >= FREE_LIMIT) setShowPaywall(true);
    }
  };

  useEffect(() => {
    if (!auth.user || isPaid) return;
    (async () => {
      try {
        const supabase = getSupabaseClient();
        const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0);
        const { count } = await supabase
          .from("usage")
          .select("*", { count: "exact", head: true })
          .eq("user_id", auth.user.id)
          .eq("action", "export")
          .gte("created_at", start.toISOString());
        const c = count ?? 0;
        setUsageCount(c);
        if (c >= FREE_LIMIT) setShowPaywall(true);
      } catch {}
    })();
  }, [auth.user, isPaid]);

  // Step transition animation
  const [stepEntering, setStepEntering] = useState(false);
  const prevStepRef = useRef(pe.step);
  useEffect(() => {
    if (prevStepRef.current !== pe.step) {
      setStepEntering(true);
      const t = setTimeout(() => setStepEntering(false), 220);
      prevStepRef.current = pe.step;
      return () => clearTimeout(t);
    }
  }, [pe.step]);


  const stepProps = [
    { projectName: pe.projectName, setProjectName: pe.setProjectName, domain: pe.domain, setDomain: pe.setDomain, projectDesc: pe.projectDesc, setProjectDesc: pe.setProjectDesc, goals: pe.goals, setGoals: pe.setGoals, refineSuggestions: pe.refineSuggestions, generateLoading: pe.generateLoading, refineLoading: pe.refineLoading, generateField: pe.generateField, refineField: pe.refineField, acceptRefinement: pe.acceptRefinement, dismissRefinement: pe.dismissRefinement, trackActivity: pe.trackActivity },
    { loading: pe.loading, itemLoading: pe.itemLoading, identityOptions: pe.identityOptions, selectedIdentity: pe.selectedIdentity, setSelectedIdentity: pe.setSelectedIdentity, generateIdentities: pe.generateIdentities, updateIdentityOption: pe.updateIdentityOption, trackActivity: pe.trackActivity },
    { loading: pe.loading, quizQuestions: pe.quizQuestions, quizAnswers: pe.quizAnswers, setQuizAnswers: pe.setQuizAnswers, knowledgeResult: pe.knowledgeResult, generateQuiz: pe.generateQuiz, processQuizAnswers: pe.processQuizAnswers, trackActivity: pe.trackActivity },
    { loading: pe.loading, itemLoading: pe.itemLoading, negativeSuggestions: pe.negativeSuggestions, selectedNegatives: pe.selectedNegatives, setSelectedNegatives: pe.setSelectedNegatives, generateNegativeSpace: pe.generateNegativeSpace, updateNegative: pe.updateNegative, trackActivity: pe.trackActivity },
    { loading: pe.loading, modes: pe.modes, defaultModeIdx: pe.defaultModeIdx, setDefaultModeIdx: pe.setDefaultModeIdx, itemLoading: pe.itemLoading, generateModes: pe.generateModes, regenerateMode: pe.regenerateMode, updateMode: pe.updateMode, trackActivity: pe.trackActivity },
    { loading: pe.loading, priorities: pe.priorities, dragIdx: pe.dragIdx, dragOverIdx: pe.dragOverIdx, itemLoading: pe.itemLoading, generatePriorities: pe.generatePriorities, regeneratePriority: pe.regeneratePriority, handleDragStart: pe.handleDragStart, handleDragOver: pe.handleDragOver, handleDragEnd: pe.handleDragEnd, movePriority: pe.movePriority, updatePriority: pe.updatePriority, trackActivity: pe.trackActivity },
    { loading: pe.loading, failures: pe.failures, itemLoading: pe.itemLoading, generateFailures: pe.generateFailures, regenerateFailure: pe.regenerateFailure, updateFailure: pe.updateFailure, trackActivity: pe.trackActivity },
    { loading: pe.loading, templates: pe.templates, templatesEnabled: pe.templatesEnabled, setTemplatesEnabled: pe.setTemplatesEnabled, selectedTemplates: pe.selectedTemplates, setSelectedTemplates: pe.setSelectedTemplates, generateTemplates: pe.generateTemplates, trackActivity: pe.trackActivity },
    { loading: pe.loading, examples: pe.examples, approvedExamples: pe.approvedExamples, setApprovedExamples: pe.setApprovedExamples, generateExamples: pe.generateExamples, updateExample: pe.updateExample, trackActivity: pe.trackActivity },
    { projectBlurb: pe.projectBlurb, compiledOutput: pe.compiledOutput, customInjection: pe.customInjection, setCustomInjection: pe.setCustomInjection, copied: pe.copied, copiedBlurb: pe.copiedBlurb, feedbackText: pe.feedbackText, setFeedbackText: pe.setFeedbackText, feedbackSubmitted: pe.feedbackSubmitted, feedbackSending: pe.feedbackSending, onCopy: pe.copyToClipboard, onCopyBlurb: pe.copyBlurb, onSubmitFeedback: pe.submitFeedback, onSaveToLibrary: pe.savePromptToHistory, onExportLogged, trackActivity: pe.trackActivity },
  ];

  const CurrentStep = STEP_COMPONENTS[pe.step];

  // Usage display helpers
  const usageAtRisk = !isPaid && usageCount !== null && usageCount >= FREE_LIMIT - 1;
  const usageHit = !isPaid && usageCount !== null && usageCount >= FREE_LIMIT;

  return (
    <div style={{ minHeight: "100vh", background: "#0C0B0A", color: "#F0EBE0", fontFamily: "'Libre Franklin', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Libre+Franklin:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 8px rgba(192,122,86,0.1); } 50% { box-shadow: 0 0 20px rgba(192,122,86,0.3); } }
        @keyframes shimmerBar { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes fadeInScale { 0% { opacity:0; transform:scale(0.5); } 50% { opacity:1; transform:scale(1.1); } 100% { opacity:1; transform:scale(1); } }
        @keyframes gateFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flipHint { 0%,100% { transform: rotateY(0deg); } 50% { transform: rotateY(12deg); } }
        @keyframes stepEnter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .spin { animation: spin 1s linear infinite; }
        .gate-fade { animation: gateFade 0.6s ease forwards; }
        .gate-fade-2 { animation: gateFade 0.6s 0.15s ease forwards; opacity: 0; }
        .gate-fade-3 { animation: gateFade 0.6s 0.3s ease forwards; opacity: 0; }
        .step-enter { animation: stepEnter 0.22s ease-out both; }
        textarea:focus, input:focus { border-color: rgba(192,122,86,0.4) !important; }
        button:focus-visible, [tabindex]:focus-visible, a:focus-visible { outline: 2px solid #C07A56; outline-offset: 2px; }
        button:hover:not(:disabled) { opacity: 0.85; }
        .flip-card { perspective: 800px; cursor: pointer; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
        .flip-card-inner:not(.flipped) { animation: flipHint 2s 1.5s ease-in-out 1; }
        .flip-card-inner.flipped { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { position: absolute; top: 0; left: 0; width: 100%; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 12px; box-sizing: border-box; overflow: hidden; }
        .flip-card-back { transform: rotateY(180deg); }
        @media (max-width: 767px) { textarea, input { font-size: 16px !important; } }
      `}</style>

      {pe.error && <Toast msg={pe.error} onDismiss={() => pe.showError(null)} />}
      {pe.showFireworks && <Fireworks />}

      {auth.loading || (auth.user && pe.hydrating) ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader2 size={32} color="#C07A56" className="spin" />
        </div>
      ) : !auth.user ? (
        <SignInGate isMobile={pe.isMobile} signInWithMagicLink={auth.signInWithMagicLink} />
      ) : showPaywall && !isPaid ? (
        <PaymentGate
          email={auth.user.email}
          onCheckoutPro={() => initiateCheckout(stripeProPriceId, setPendingPro)}
          onCheckoutTeam={joinTeamWaitlist}
          pendingPro={pendingPro}
          pendingTeam={pendingTeam}
          teamWaitlistJoined={teamWaitlistJoined}
          error={checkoutError}
          isMobile={pe.isMobile}
          promptLibraryCount={pe.promptHistory.length}
          onOpenPromptLibrary={() => setShowPromptLibrary(true)}
          onBack={() => { setShowPaywall(false); pe.setViewMode("dashboard"); }}
        />
      ) : pe.viewMode === "dashboard" ? (
        <Dashboard
          email={auth.user.email}
          hasActiveSession={!!(pe.projectName || pe.domain || pe.projectDesc || pe.goals)}
          activeProjectName={pe.projectName}
          activeDomain={pe.domain}
          activeLastEdited={null}
          promptHistory={pe.promptHistory}
          usageCount={usageCount}
          freeLimit={FREE_LIMIT}
          isPaid={isPaid}
          onContinue={() => pe.setViewMode("builder")}
          onNewPrompt={() => { pe.resetSession(); pe.setViewMode("intake"); }}
          onStartFromScratch={() => { pe.resetSession(); pe.setIntakeComplete(true); pe.setViewMode("builder"); }}
          onEditExisting={() => { pe.setAppMode("edit"); pe.setViewMode("builder"); }}
          onCopyPrompt={async (entry) => {
            try {
              await navigator.clipboard.writeText(entry.instructions);
            } catch {
              const ta = document.createElement("textarea");
              ta.value = entry.instructions;
              Object.assign(ta.style, { position: "fixed", left: "-9999px", top: "-9999px", opacity: "0" });
              document.body.appendChild(ta); ta.focus(); ta.select();
              document.execCommand("copy"); document.body.removeChild(ta);
            }
          }}
          onDeletePrompt={pe.removePromptFromHistory}
          onSignOut={auth.signOut}
          onManageSubscription={initiatePortal}
          onBrowseTemplates={(catId) => { setTemplateCategory(catId || null); setShowTemplateLibrary(true); }}
          onOpenSettings={() => setShowSettings(true)}
          isMobile={pe.isMobile}
        />
      ) : pe.viewMode === "intake" ? (
        <IntakeScreen
          onComplete={async (input) => {
            const ok = await pe.parseIntake(input);
            if (ok) pe.setViewMode("builder");
            return ok;
          }}
          onSkip={() => { pe.setIntakeComplete(true); pe.setViewMode("builder"); }}
          isMobile={pe.isMobile}
        />
      ) : (
        <>
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: pe.isMobile ? "0 16px" : "0 28px", height: "56px", borderBottom: "1px solid #2C2824", flexShrink: 0, background: "#0C0B0A" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "18px", color: "#F0EBE0" }}>Stanzix</span>
              <span style={{ color: "#C07A56", fontSize: "6px", marginTop: "2px" }}>●</span>
              {!pe.isMobile && <span style={{ fontFamily: "'Libre Franklin', sans-serif", fontSize: "11px", color: "#5E5850", marginLeft: "8px" }}>Builder</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {!isPaid && usageCount !== null && !pe.isMobile && (
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#5E5850", padding: "4px 10px", border: "1px solid #2C2824", borderRadius: "4px" }}>
                  {usageCount} / {FREE_LIMIT} free
                </span>
              )}
              <Badge active={pe.appMode === "create"} onClick={() => { pe.setAppMode("create"); pe.setParsedPreview(null); }}>Create</Badge>
              <Badge active={pe.appMode === "edit"} onClick={() => pe.setAppMode("edit")}>Edit</Badge>
              {!pe.isMobile && <div style={{ width: "1px", height: "20px", background: "#2C2824", margin: "0 8px" }} />}
              {!pe.isMobile && (
                <button onClick={() => pe.setShowPreview(!pe.showPreview)} aria-label={pe.showPreview ? "Hide preview panel" : "Show preview panel"} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                  {pe.showPreview ? <PanelRightClose size={16} color="#5E5850" /> : <PanelRightOpen size={16} color="#5E5850" />}
                </button>
              )}
              <button onClick={() => setShowSettings(true)} title="Settings" aria-label="Settings" style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center" }}>
                <Settings size={16} color="#5E5850" />
              </button>
              <button onClick={() => pe.setViewMode("dashboard")} title="Back to dashboard" aria-label="Dashboard" style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: "'Libre Franklin', sans-serif", fontSize: "12px", color: "#5E5850" }}>Dashboard</span>
              </button>
            </div>
          </header>

          {/* ── Progress bar ──────────────────────────────────────────────── */}
          {pe.appMode === "create" && (
            <div style={{ height: "3px", background: "#2C2824", flexShrink: 0 }}>
              <div style={{ width: `${((pe.step + 1) / STEPS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #7D5038, #C07A56)", borderRadius: "0 2px 2px 0", transition: "width 0.3s ease" }} />
            </div>
          )}

          {/* ── Mobile nav ──────────────────────────────────────────────────── */}
          {pe.isMobile && pe.appMode === "create" && (
            <div style={{ borderBottom: "1px solid #2C2824", background: "rgba(0,0,0,0.1)", flexShrink: 0 }}>
              <button onClick={() => pe.setShowMobileNav(!pe.showMobileNav)} aria-expanded={pe.showMobileNav} aria-label="Toggle step navigation" style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                  {(() => { const Icon = STEPS[pe.step].icon; return <Icon size={14} color="#C07A56" />; })()}
                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace", color: "#C07A56", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                        {getPhaseInfo(pe.step).phase.label}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#F0EBE0" }}>{STEPS[pe.step].label}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#5E5850", marginTop: "2px" }}>{STEPS[pe.step].desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#C07A56", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "rgba(192,122,86,0.08)", border: "1px solid rgba(192,122,86,0.25)" }}>All Steps</span>
                  <ChevronRight size={14} color="#C07A56" style={{ transform: pe.showMobileNav ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                </div>
              </button>
              {pe.showMobileNav && (
                <nav aria-label="Steps" style={{ padding: "0 0 8px", maxHeight: "300px", overflowY: "auto", borderTop: "1px solid #2C2824" }}>
                  {STEPS.map((s, i) => {
                    const Icon = s.icon; const active = pe.step === i; const completed = i < pe.step;
                    return (
                      <button key={s.id} onClick={() => { pe.setStep(i); pe.setShowMobileNav(false); pe.trackActivity(); }} aria-current={active ? "step" : undefined} style={{ width: "100%", padding: "10px 16px", background: active ? "rgba(192,122,86,0.08)" : "transparent", border: "none", borderLeft: active ? "3px solid #C07A56" : "3px solid transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", opacity: 1 }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <Icon size={14} color={active ? "#C07A56" : completed ? "#7DB86A" : "rgba(255,255,255,0.3)"} />
                          {completed && <CheckCircle2 size={8} color="#7DB86A" style={{ position: "absolute", top: -3, right: -3 }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "13px", fontWeight: active ? 600 : 400, color: active ? "#F0EBE0" : "#948C7E" }}>{s.label}</div>
                          <div style={{ fontSize: "10px", color: active ? "rgba(192,122,86,0.7)" : "#5E5850", fontFamily: "'IBM Plex Mono', monospace", marginTop: "1px" }}>{s.desc}</div>
                        </div>
                        {active && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C07A56", flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          )}

          {/* ── Body ───────────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {/* Sidebar nav (desktop, create mode) */}
            {!pe.isMobile && pe.appMode === "create" && (
              <nav style={{ width: "200px", minWidth: "200px", borderRight: "1px solid #2C2824", padding: "16px 0", flexShrink: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "2px" }}>
                {STEPS.map((s, i) => {
                  const active = pe.step === i;
                  const completed = i < pe.step;
                  return (
                    <button key={s.id} onClick={() => { pe.setStep(i); pe.trackActivity(); }} aria-current={active ? "step" : undefined} style={{ width: "100%", padding: "9px 20px", background: active ? "rgba(192,122,86,0.08)" : "transparent", borderRight: active ? "2px solid #C07A56" : "2px solid transparent", borderLeft: "none", borderTop: "none", borderBottom: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: completed ? "#C07A56" : active ? "#F0EBE0" : "#5E5850", fontWeight: active ? 600 : 400, width: "16px" }}>{completed ? "✓" : String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: "'Libre Franklin', sans-serif", fontSize: "13px", color: active ? "#F0EBE0" : completed ? "#948C7E" : "#5E5850", fontWeight: active ? 500 : 400 }}>{s.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
            <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {pe.appMode === "edit" ? (
                <EditMode
                  isMobile={pe.isMobile}
                  loading={pe.loading}
                  parsedPreview={pe.parsedPreview}
                  pastedInstructions={pe.pastedInstructions}
                  setPastedInstructions={pe.setPastedInstructions}
                  selectedSections={pe.selectedSections}
                  setSelectedSections={pe.setSelectedSections}
                  onParse={pe.handleEditParse}
                  onApply={pe.applyParsed}
                  onCancel={() => pe.setParsedPreview(null)}
                />
              ) : (
                <div style={{ padding: pe.isMobile ? "16px" : "36px 48px", flex: 1, maxWidth: "600px", width: "100%", margin: "0 auto" }}>
                  {/* Step header */}
                  <div style={{ marginBottom: "28px" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: "#C07A56", fontStyle: "italic", marginBottom: "8px", letterSpacing: "0.5px" }}>Step {pe.step + 1} of {STEPS.length}</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 500, letterSpacing: "-0.3px", marginBottom: "8px", color: "#F0EBE0" }}>{STEPS[pe.step].label}</h2>
                    <p style={{ fontFamily: "'Libre Franklin', sans-serif", fontSize: "14px", color: "#948C7E", lineHeight: 1.7 }}>{STEPS[pe.step].desc}</p>
                  </div>

                  {/* Idle assist nudge — suppress on step 0 when context is pre-filled */}
                  {pe.showAssist && pe.step < 9 && !(pe.step === 0 && pe.projectName && pe.domain && pe.projectDesc && pe.goals) && (
                    <div style={{ background: "rgba(192,122,86,0.08)", border: "1px solid rgba(192,122,86,0.25)", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                      <Lightbulb size={18} color="#C07A56" />
                      <span style={{ flex: 1, fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Looks like you might be stuck. Want me to auto-generate this section?</span>
                      <Btn small primary onClick={pe.autoFillCurrent}><Wand2 size={14} /> Auto-fill</Btn>
                    </div>
                  )}

                  {/* Usage warning banner */}
                  {usageAtRisk && !usageHit && (
                    <div style={{ background: "rgba(192,122,86,0.06)", border: "1px solid rgba(192,122,86,0.2)", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", fontSize: "12px", color: "rgba(192,122,86,0.85)" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{FREE_LIMIT - usageCount} prompt{FREE_LIMIT - usageCount === 1 ? "" : "s"} left</span>
                      <span style={{ color: "#948C7E" }}>this month on the free plan.</span>
                    </div>
                  )}
                  {usageHit && (
                    <div style={{ background: "rgba(208,80,80,0.06)", border: "1px solid rgba(208,80,80,0.25)", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "12px", color: "rgba(208,120,120,0.9)" }}>
                      Monthly limit reached. Upgrade to Pro for unlimited prompts.
                    </div>
                  )}

                  {pe.loading && <LoadingIndicator />}

                  {/* Step content — fade-in on step change */}
                  <div className={stepEntering ? "step-enter" : ""}>
                    <CurrentStep {...stepProps[pe.step]} />
                  </div>

                  {/* Navigation */}
                  <div style={{ marginTop: "36px", paddingTop: "20px", borderTop: "1px solid #2C2824" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <Btn onClick={() => { pe.setStep(Math.max(0, pe.step - 1)); pe.trackActivity(); }} disabled={pe.step === 0}>
                        <ChevronLeft size={16} /> Previous
                      </Btn>
                      {pe.step < 9
                        ? <Btn primary onClick={() => {
                            const next = Math.min(9, pe.step + 1);
                            if (pe.step === 0) pe.triggerCascade();
                            pe.setStep(next);
                            pe.trackActivity();
                          }} disabled={!pe.canAdvance()}>
                            Next <ChevronRight size={16} />
                          </Btn>
                        : <Btn primary onClick={pe.copyToClipboard}>
                            {pe.copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Instructions</>}
                          </Btn>
                      }
                    </div>
                    {pe.step === 0 && !pe.canAdvance() && (
                      <div style={{ fontSize: "11px", color: "#5E5850", fontFamily: "'IBM Plex Mono', monospace", marginTop: "8px", textAlign: "right" }}>
                        Add a project name or description to continue
                      </div>
                    )}
                  </div>
                </div>
              )}
            </main>

            <PreviewPanel
              isMobile={pe.isMobile}
              showPreview={pe.showPreview}
              setShowPreview={pe.setShowPreview}
              compiledOutput={pe.compiledOutput}
              copied={pe.copied}
              onCopy={async () => {
                try {
                  await navigator.clipboard.writeText(pe.compiledOutput);
                } catch {
                  const ta = document.createElement("textarea");
                  ta.value = pe.compiledOutput;
                  Object.assign(ta.style, { position: "fixed", left: "-9999px", top: "-9999px", opacity: "0" });
                  document.body.appendChild(ta); ta.focus(); ta.select();
                  document.execCommand("copy"); document.body.removeChild(ta);
                }
              }}
              currentStep={pe.step}
            />
          </div>

          {/* ── Usage / subscription footer ─────────────────────────────── */}
          <UsageDisplay
            isMobile={pe.isMobile}
            onUpgrade={() => setShowPaywall(true)}
          />
        </>
      )}

      {auth.user && !auth.loading && !pe.hydrating && (
        <PromptLibraryModal
          open={showPromptLibrary}
          onClose={() => setShowPromptLibrary(false)}
          history={pe.promptHistory}
          onDelete={pe.removePromptFromHistory}
          onSaveCurrent={pe.savePromptToHistory}
          showError={pe.showError}
          canSaveCurrent={pe.compiledOutput.trim().length >= 20}
          currentTitle={pe.projectName.trim() || pe.domain.trim() || "Untitled"}
        />
      )}

      {auth.user && !auth.loading && !pe.hydrating && (
        <>
          <TemplateLibrary
            open={showTemplateLibrary}
            onClose={() => setShowTemplateLibrary(false)}
            onSelectTemplate={(t) => { pe.loadTemplate(t); setShowTemplateLibrary(false); }}
            isPaid={isPaid}
            onUpgrade={() => { setShowTemplateLibrary(false); setShowPaywall(true); }}
            initialCategory={templateCategory}
          />
          <SettingsPanel
            open={showSettings}
            onClose={() => setShowSettings(false)}
            email={auth.user?.email}
            isPaid={isPaid}
            usageCount={usageCount}
            freeLimit={FREE_LIMIT}
            onManageSubscription={initiatePortal}
            onSignOut={auth.signOut}
            onUpgrade={() => { setShowSettings(false); setShowPaywall(true); }}
            isMobile={pe.isMobile}
          />
        </>
      )}
    </div>
  );
}

export default function StanzixWithBoundary(props) {
  return (
    <ErrorBoundary>
      <StanzixInner {...props} />
    </ErrorBoundary>
  );
}
