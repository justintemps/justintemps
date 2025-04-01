import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { Resend } from "resend";
import { RESEND_API_KEY, RESEND_TO_EMAIL } from "$env/static/private";

const resend = new Resend(RESEND_API_KEY);

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return fail(400, { error: "Missing required fields" });
    }

    const { data, error } = await resend.emails.send({
      from: `${name} <site@justintemps.dev>`,
      to: [RESEND_TO_EMAIL],
      subject: `Message from ${name}`,
      html: `<p>${message}</p><p>Email: ${email}</p>`
    });

    if (error) {
      return fail(500, { error: "Failed to send message" });
    }

    if (data?.id) {
      return { success: true };
    }
  }
} satisfies Actions;
