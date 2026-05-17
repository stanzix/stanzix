import {
  Layers, Target, Brain, ShieldOff,
  Sliders, ArrowUp, AlertTriangle, FileText, BookOpen, Download
} from "lucide-react";

export const VERSION = "v1.6";

export const STEPS = [
  { id: "context",   label: "Context",         icon: Layers,        desc: "Name your project, define its domain, and state your goals. This shapes everything Stanzix generates." },
  { id: "identity",  label: "Role",            icon: Target,        desc: "Choose a role for Claude to inhabit. This defines its tone, expertise depth, and default approach." },
  { id: "knowledge", label: "Expertise",       icon: Brain,         desc: "Answer a short quiz so Claude knows what you already understand. It calibrates depth without over-explaining." },
  { id: "negative",  label: "Guardrails",      icon: ShieldOff,     desc: "Select behaviors Claude should never do. These become hard limits baked into every response." },
  { id: "modes",     label: "Behavior",        icon: Sliders,       desc: "Define switchable work modes for different situations. Activate a mode by typing its trigger word." },
  { id: "priority",  label: "Priority",        icon: ArrowUp,       desc: "Set which rule wins when two instructions compete. Claude reads this list top-to-bottom." },
  { id: "failure",   label: "Safety",          icon: AlertTriangle, desc: "Identify failure patterns in your domain and give Claude explicit instructions to prevent each one." },
  { id: "templates", label: "Format",          icon: FileText,      desc: "Optional: define named response formats that Claude can switch into on demand." },
  { id: "examples",  label: "Examples",        icon: BookOpen,      desc: "Show Claude what a perfect response looks like. Examples anchor rules better than instructions alone." },
  { id: "export",    label: "Review & Export", icon: Download,      desc: "Copy two things into Claude project settings: the project description and the compiled instructions." },
];

export const LOADING_PHRASES = [
  "Thinking...", "Analyzing your context...", "Mapping the domain...",
  "Constructing the framework...", "Calibrating precision...",
  "Shaping the architecture...", "Refining the output...", "Almost there...",
];

export function buildOutput({
  selectedIdentity, identityOptions, knowledgeResult,
  selectedNegatives, negativeSuggestions, modes, defaultModeIdx,
  priorities, failures, templatesEnabled, selectedTemplates,
  templates, approvedExamples, examples, customInjection,
}) {
  let out = "";
  out += `## Project Frame Protocol\nThe first conversation in this project is the strategic layer. Use it to establish high-level context, goals, and operating frame for everything that follows. All subsequent conversations are execution within that frame unless the user explicitly opens a new strategic conversation.\n\n`;
  if (selectedIdentity !== null && identityOptions[selectedIdentity]) {
    const id = identityOptions[selectedIdentity];
    out += `## Identity\nYou are a ${id.title}. ${id.description}\nKey traits: ${id.traits?.join(", ")}\n\n`;
  }
  if (knowledgeResult.length > 0) out += `## Assumed Knowledge\n${knowledgeResult.map(k => `- ${k}`).join("\n")}\n\n`;
  const negs = [...selectedNegatives].map(i => negativeSuggestions[i]).filter(Boolean);
  if (negs.length > 0) out += `## Do NOT\n${negs.map(n => `- ${n.instruction}`).join("\n")}\n\n`;
  if (modes.length > 0) {
    out += `## Operational Modes\n`;
    modes.forEach((m, i) => { out += `### ${m.name}${i === defaultModeIdx ? " [DEFAULT]" : ""}\nTrigger: "${m.trigger}"\n${m.description}\n\n`; });
  }
  if (priorities.length > 0) {
    out += `## Priority Hierarchy\n`;
    priorities.forEach((p, i) => { out += `${i + 1}. ${p.rule} (overrides: ${p.overrides}; exception: ${p.exception})\n`; });
    out += "\n";
  }
  if (failures.length > 0) out += `## Failure Preemption\n${failures.map(f => `- ${f.prevention} [blocks: ${f.pattern}]`).join("\n")}\n\n`;
  if (templatesEnabled && selectedTemplates.size > 0) {
    const ts = [...selectedTemplates].map(i => templates[i]).filter(Boolean);
    if (ts.length > 0) { out += `## Output Templates\n`; ts.forEach(t => { out += `### ${t.name}\nWhen: ${t.trigger}\nFormat:\n${t.format}\n\n`; }); }
  }
  const exs = [...approvedExamples].map(i => examples[i]).filter(Boolean);
  if (exs.length > 0) { out += `## Reference Examples\n`; exs.forEach((e, i) => { out += `### Example ${i + 1}\nUser: ${e.userMessage}\nAssistant: ${e.idealResponse}\n\n`; }); }
  if (customInjection.trim()) out += `## Additional Instructions\n${customInjection.trim()}\n`;
  return out || "Complete at least one step to see output here.";
}
