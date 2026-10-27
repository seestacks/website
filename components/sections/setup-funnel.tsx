"use client";

import { useState } from "react";
import { submitEmail } from "@/lib/subscribe";

const SCRIPT_SNIPPET = `claude plugin marketplace add see-stack/claude-code-mods
claude plugin install context-bar@seestack-mods`;

const VAULT_URL = "https://github.com/see-stack/claude-obsidian-memory";
const YOUTUBE_SUB_URL = "https://youtube.com/@seestack?sub_confirmation=1";

export function SetupFunnel({ id = "setup" }: { id?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // The script is the reward for finishing the form, so a provider failure
    // must not stand between the visitor and the commands.
    await submitEmail({ name, email, source: "funnel" });

    // Open YouTube channel with subscription confirmation in a new tab
    if (typeof window !== "undefined") {
      window.open(YOUTUBE_SUB_URL, "_blank");
    }

    setSubmitted(true);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SCRIPT_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id={id} className="section-edge relative overflow-hidden py-16 sm:py-24">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-page relative mx-auto max-w-3xl">
        {!submitted ? (
          <div className="panel bg-ink-raised relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16 shadow-2xl">
            <div className="mx-auto max-w-xl text-center">
              <div className="border-accent/30 bg-accent/10 text-accent mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
                <svg viewBox="0 0 16 16" width="14" height="14" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                  <path d="M5.2 3.3a.7.7 0 0 1 1.06-.6l6 4.1a.7.7 0 0 1 0 1.16l-6 4.34a.7.7 0 0 1-1.06-.6V3.3Z" />
                </svg>
                SUBSCRIBE TO UNLOCK SCRIPTS
              </div>
              
              <h2 className="text-cream text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
                Subscribe to Get the Script & Custom Mods
              </h2>
              
              <p className="text-cream-dim mt-3 text-base leading-relaxed">
                Enter your name and email below. Subscribing gives you free weekly developer tools
                and unlocks the one-line install command, context-bar mod, and Obsidian vault instantly.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
                <div>
                  <label htmlFor="funnel-name" className="text-cream-dim block text-xs font-mono uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="funnel-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="field py-3"
                  />
                </div>

                <div>
                  <label htmlFor="funnel-email" className="text-cream-dim block text-xs font-mono uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="funnel-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="field py-3"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent hover:bg-accent-hi shadow-accent/25 mt-3 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg px-6 py-4 text-base font-semibold text-white shadow-lg transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    "Subscribing & Preparing Setup..."
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" width="20" height="20" className="w-5 h-5 fill-current" aria-hidden="true">
                        <path d="M5.2 3.3a.7.7 0 0 1 1.06-.6l6 4.1a.7.7 0 0 1 0 1.16l-6 4.34a.7.7 0 0 1-1.06-.6V3.3Z" />
                      </svg>
                      <span>SUBSCRIBE & GET THE SCRIPT</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                <p className="text-muted mt-2 text-center font-mono text-xs">
                  Instant access on the next screen. One-click unsubscribe.
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="panel bg-ink-raised relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 border border-hair-hi shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/30 text-accent text-2xl mb-4">
                ✓
              </span>
              <h2 className="text-cream text-3xl font-bold tracking-tight sm:text-4xl">
                Thanks for subscribing, {name ? name.trim() : "Developer"}!
              </h2>
              <p className="text-cream-dim mt-2 text-base">
                Your setup commands are ready below. Copy and run the script in your terminal:
              </p>
            </div>

            {/* Script Box */}
            <div className="mt-8 rounded-xl border border-hair-hi bg-panel p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-hair">
                <span className="text-xs font-mono text-muted tracking-wider uppercase">
                  Terminal Commands (Claude Code CLI)
                </span>
                <button
                  onClick={handleCopy}
                  className="btn btn-secondary py-1 px-3 text-xs font-mono transition-all"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="font-mono text-accent-hi text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-accent/30">
                {SCRIPT_SNIPPET}
              </pre>
            </div>

            {/* Starter Vault Link */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={VAULT_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-secondary flex-1 justify-center py-3 text-sm"
              >
                Open the starter vault on GitHub
              </a>
            </div>

            {/* Huge YouTube Subscribe Box */}
            <div className="border-hair-hi bg-panel mt-10 rounded-xl border p-6 text-center sm:p-8">
              <div className="border-hair-hi text-muted mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium">
                <svg viewBox="0 0 16 16" width="14" height="14" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                  <path d="M5.2 3.3a.7.7 0 0 1 1.06-.6l6 4.1a.7.7 0 0 1 0 1.16l-6 4.34a.7.7 0 0 1-1.06-.6V3.3Z" />
                </svg>
                YOUTUBE @SEESTACK
              </div>

              <h3 className="text-cream text-2xl sm:text-3xl font-bold tracking-tight">
                Subscribe for More Free Tools & Weekly Mods
              </h3>

              <p className="text-cream-dim mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed">
                Every week, I build and release new autonomous agent workflows,
                terminal UI mods, and Obsidian PKM systems live. Subscribe so you don't miss next week's drop!
              </p>

              <div className="mt-6">
                <a
                  href={YOUTUBE_SUB_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bg-accent hover:bg-accent-hi shadow-accent/25 inline-flex items-center justify-center gap-3 rounded-lg px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors"
                >
                  <svg viewBox="0 0 16 16" width="20" height="20" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M5.2 3.3a.7.7 0 0 1 1.06-.6l6 4.1a.7.7 0 0 1 0 1.16l-6 4.34a.7.7 0 0 1-1.06-.6V3.3Z" />
                  </svg>
                  Subscribe to @SeeStack on YouTube
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
