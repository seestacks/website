"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { submitEmail } from "@/lib/subscribe";

type Status = "idle" | "sending" | "done" | "error";

type Props = {
  /** Unique input id; the hero and the funnel can be on the same page. */
  id: string;
  /** Forwarded to the provider as the list tag. */
  source?: string;
  /** One line under the form, for a secondary link or a reassurance. */
  note?: ReactNode;
};

/**
 * The compact email capture used in the hero: one field, one button, and an
 * optional line below. Taller than a button row by design, because the field
 * is the primary action rather than a link.
 */
export function SubscribeForm({ id, source = "site", note }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === "sending") return;

    setStatus("sending");
    const ok = await submitEmail({ email, source });
    setStatus(ok ? "done" : "error");
  }

  return (
    <div className="w-full max-w-md">
      {status === "done" ? (
        <p className="text-cream flex min-h-12 items-center gap-2.5 text-sm">
          <span className="text-accent" aria-hidden="true">
            ✓
          </span>
          You&apos;re on the list. Check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor={id} className="sr-only">
            Email address
          </label>
          <input
            id={id}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your work e-mail"
            className="field h-12 sm:flex-1"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-primary h-12 px-6 disabled:opacity-60"
          >
            {status === "sending" ? "Signing up..." : "Sign up free"}
          </button>
        </form>
      )}

      <p aria-live="polite" className="text-muted mt-3 text-sm">
        {status === "error" ? (
          <span className="text-red-400 font-mono text-xs">
            That didn&apos;t go through. Try again?
          </span>
        ) : (
          note
        )}
      </p>
    </div>
  );
}
