/**
 * The one place the site talks to its own subscribe route.
 *
 * `app/api/subscribe/route.ts` validates the address and forwards it to the
 * provider named in `content/email.ts`. Nothing is stored locally.
 */

export type SubscribeInput = {
  email: string;
  name?: string;
  /** Which form sent it. Forwarded as the provider tag, for segmentation. */
  source?: string;
};

/** Resolves to `true` only when the route accepted the address. */
export async function submitEmail(input: SubscribeInput): Promise<boolean> {
  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return response.ok;
  } catch {
    return false;
  }
}
