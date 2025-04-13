import { json } from "@sveltejs/kit";
import { createChallenge } from "altcha-lib";
import { ALTCHA_HMAC_KEY } from "$env/static/private";

const hmacKey = ALTCHA_HMAC_KEY;

async function generateChallenge() {
  const challenge = await createChallenge({
    hmacKey,
    maxNumber: 100000
  });
  return challenge;
}

export async function GET() {
  const challenge = await generateChallenge();
  return json(challenge);
}
