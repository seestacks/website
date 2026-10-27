import { emailSignup } from "@/content/site.config";

/**
 * Email interest form.
 *
 * There is no backend in this project. When `emailSignup.formAction` is set in
 * `content/site.config.ts`, this renders a plain HTML form that posts straight
 * to an email provider's hosted endpoint. Until then the field and button are
 * rendered in full but `disabled`, with a visible explanation, so nothing is
 * collected and no submission is faked.
 */
export function EmailInterest() {
  const enabled = Boolean(emailSignup.formAction);

  return (
    <section id="subscribe" className="border-hair border-t">
      <div className="container-page py-20 sm:py-28">
        <div className="panel bg-ink-raised relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto max-w-xl text-center">
            <h2 className="text-cream text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
              Get the next system.
            </h2>
            <p className="text-cream-dim mt-4 leading-relaxed">
              One message when a new breakdown is published, with the components
              from it. No newsletter, no drip sequence.
            </p>

            <form
              {...(enabled
                ? { action: emailSignup.formAction as string, method: "post" }
                : {})}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              aria-describedby={enabled ? undefined : "signup-note"}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name={emailSignup.emailFieldName}
                type="email"
                required
                autoComplete="email"
                disabled={!enabled}
                placeholder="you@example.com"
                className="border-hair-hi bg-panel text-cream placeholder:text-muted focus:border-accent min-w-0 flex-1 rounded-lg border px-4 py-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!enabled}
                className="btn btn-primary disabled:cursor-not-allowed disabled:bg-transparent disabled:text-muted disabled:border disabled:border-hair"
              >
                Notify me
              </button>
            </form>

            {!enabled && (
              <p id="signup-note" className="text-muted mt-4 font-mono text-xs">
                {emailSignup.disabledNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
