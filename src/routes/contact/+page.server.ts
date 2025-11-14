import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { Resend } from "resend";
import { RESEND_API_KEY, RESEND_TO_EMAIL } from "$env/static/private";
import { ALTCHA_HMAC_KEY } from "$env/static/private";
import { verifySolution } from "altcha-lib";

const resend = new Resend(RESEND_API_KEY);

export const actions = {
  default: async (event) => {
    // Get the form data
    const formData = await event.request.formData();
    const altcha = formData.get("altcha");
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Verify the captcha
    if (!altcha || typeof altcha !== "string") {
      return fail(400, { error: "Missing or invalid captcha" });
    }

    // Verify the captcha
    const verified = await verifySolution(altcha, ALTCHA_HMAC_KEY);

    // If the captcha is not verified, return an error
    if (!verified) {
      return fail(400, { error: "Sorry, but we think you might be a robot." });
    }

    // If the required fields are missing, return an error
    if (!name || !email || !message) {
      return fail(400, {
        error: "It looks like you didn't fill out the form correctly."
      });
    }

    // Send the email
    const { data, error } = await resend.emails.send({
      from: `${name} <contact@justintemps.dev>`,
      to: [RESEND_TO_EMAIL],
      replyTo: email as string,
      subject: `${name} wants to get in touch`,
      html: `<p>${message}</p>`
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
