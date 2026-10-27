/**
 * Email capture configuration.
 *
 * The subscribe form posts to an email provider's hosted endpoint through
 * `app/api/subscribe/route.ts`. There is no database in this project.
 */

/**
 * While `formAction` is `null` the form still renders but stays disabled and
 * says so, so nothing is collected and no submission is faked.
 */
export const emailSignup = {
  formAction: "https://buttondown.com/api/emails/embed-subscribe/seestack" as string | null,
  emailFieldName: "email",
  /** Shown under the form while `formAction` is null. */
  disabledNote: "Signup isn't open yet.",
};
