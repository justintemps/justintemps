import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { Resend } from "resend";
import { RESEND_API_KEY, RESEND_TO_EMAIL } from "$env/static/private";
import { ALTCHA_HMAC_KEY } from "$env/static/private";
import { verifySolution } from "altcha-lib";

const resend = new Resend(RESEND_API_KEY);

// A human needs at least this long between the challenge being issued and the
// form landing on the server. Bots that fetch, solve and post in one go are
// far quicker than this.
const MIN_SOLVE_TIME_MS = 3 * 1000;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;
const MAX_LINKS = 1;

// Deliberately loose: it only needs to reject obvious junk, since Resend will
// refuse a malformed reply-to address anyway.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINK_PATTERN = /https?:\/\/|www\./gi;

const ROBOT_ERROR = "Sorry, but we think you might be a robot.";
const FORM_ERROR = "It looks like you didn't fill out the form correctly.";

/**
 * Reads the `issued` timestamp the challenge endpoint baked into the salt.
 * Returns null if the payload can't be parsed or the param is missing.
 */
function getIssuedAt(payload: string): number | null {
  try {
    const { salt } = JSON.parse(atob(payload)) as { salt?: string };
    const query = salt?.split("?")[1] ?? "";
    const issued = new URLSearchParams(query).get("issued");
    if (!issued) return null;
    const ms = Number(issued);
    return Number.isFinite(ms) ? ms : null;
  } catch {
    return null;
  }
}

/**
 * The name goes into the From header, so strip anything that could break out
 * of it: line breaks, angle brackets and quotes.
 */
function sanitizeName(name: string): string {
  return name
    .replace(/[\r\n<>"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export const actions = {
  default: async (event) => {
    // Get the form data
    const formData = await event.request.formData();
    const altcha = formData.get("altcha");
    const honeypot = asString(formData.get("website"));
    const name = sanitizeName(asString(formData.get("name")));
    const email = asString(formData.get("email")).trim();
    const message = asString(formData.get("message")).trim();

    // Honeypot: humans never see this field, so anything in it is a bot.
    // Pretend it worked so the sender doesn't learn what tripped it.
    if (honeypot) {
      return { success: true };
    }

    // Verify the captcha
    if (!altcha || typeof altcha !== "string") {
      return fail(400, { error: "Missing or invalid captcha" });
    }

    // Verify the captcha. This also rejects expired challenges.
    const verified = await verifySolution(altcha, ALTCHA_HMAC_KEY);

    // If the captcha is not verified, return an error
    if (!verified) {
      return fail(400, { error: ROBOT_ERROR });
    }

    // The signature checked out, so the issued timestamp in the salt is
    // trustworthy. Reject anything solved and posted implausibly fast.
    const issuedAt = getIssuedAt(altcha);
    if (issuedAt === null || Date.now() - issuedAt < MIN_SOLVE_TIME_MS) {
      return fail(400, { error: ROBOT_ERROR });
    }

    // If the required fields are missing, return an error
    if (!name || !email || !message) {
      return fail(400, { error: FORM_ERROR });
    }

    // Field limits. The browser enforces these too, but only for browsers.
    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH ||
      !EMAIL_PATTERN.test(email)
    ) {
      return fail(400, { error: FORM_ERROR });
    }

    // Real enquiries rarely need more than one link; spam rarely has fewer.
    const linkCount = (message.match(LINK_PATTERN) ?? []).length;
    if (linkCount > MAX_LINKS) {
      return fail(400, { error: FORM_ERROR });
    }

    // Send the email as plain text so nothing in the message is rendered as
    // markup in the inbox.
    const { data, error } = await resend.emails.send({
      from: `${name} <contact@justintemps.dev>`,
      to: [RESEND_TO_EMAIL],
      replyTo: email,
      subject: `${name} wants to get in touch`,
      text: message
    });

    // If the email fails to send, return an error
    if (error) {
      console.error(data, error);
      return fail(500, {
        error: "Couldn't send your message. Please try again later."
      });
    }

    // If the email is sent successfully, return a success message
    if (data?.id) {
      return { success: true };
    }
  }
} satisfies Actions;
