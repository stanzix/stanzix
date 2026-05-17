"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScaffoldLine from "@/components/ui/ScaffoldLine";

const FAQS = [
  {
    question: "What is Stanzix?",
    answer:
      "Stanzix is a structured prompt builder. You describe what you need, configure 8 levers that shape the prompt, and get a ready-to-use structured prompt for any AI model.",
  },
  {
    question: "How is this different from a prompt library?",
    answer:
      "Prompt libraries give you pre-written prompts for common tasks. Stanzix builds custom prompts for YOUR specific tasks using a consistent architecture. You're not picking from someone else's prompts. You're generating your own.",
  },
  {
    question: "Which AI tools does it work with?",
    answer:
      "Stanzix generates prompts that work with Claude, ChatGPT, Gemini, Llama, Mistral, or any large language model. We don't connect to your AI directly. You copy the structured prompt and paste it wherever you use AI.",
  },
  {
    question: "Do I need to know prompt engineering?",
    answer:
      "No. The 8 levers have plain-language labels: Role, Expertise, Guardrails, Behavior, Conflict, Safety, Format, Examples. If you can describe what you want Claude to do, you can use Stanzix.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. We don't train models on your prompts. We don't sell your data. Your saved templates are private to your account.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from your account settings, no questions asked. Your free tier remains available forever.",
  },
  {
    question: "What if I need a custom prompt structure?",
    answer:
      "Pro and Team users can save custom templates and reuse them. If you have a structured prompt format you use repeatedly, save it as a template and regenerate variations with one click.",
  },
  {
    question: "How do I get started?",
    answer:
      'Click "Try Stanzix Free" above. No credit card required. You can build your first structured prompt in under 60 seconds.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-sm text-text-dim uppercase tracking-wider mb-4">
          FAQ
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-12">
          Common questions.
        </h2>

        <div className="max-w-3xl">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-serif text-xl md:text-2xl font-medium text-text-primary">
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 text-text-dim transition-transform duration-250 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M2 5L8 11L14 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <ScaffoldLine className="w-12 mb-1" />
                )}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-base text-text-secondary leading-relaxed pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
