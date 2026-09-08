import { json } from "@sveltejs/kit";
import { createChallenge } from "altcha-lib";
import { ALTCHA_HMAC_KEY } from "$env/static/private";

const hmacKey = ALTCHA_HMAC_KEY;

// How long a challenge stays valid after it's issued. Long enough for a human
// to write a message, short enough that a solved payload can't be replayed
// for hours.
const CHALLENGE_TTL_MS = 10 * 60 * 1000;

// The proof-of-work range. Bigger means more hashes to solve on average: a
// human still waits well under a second, a bulk sender pays for every attempt.
const MAX_NUMBER = 1_000_000;

async function generateChallenge() {
  const now = Date.now();
  const challenge = await createChallenge({
    hmacKey,
    maxNumber: MAX_NUMBER,
    expires: new Date(now + CHALLENGE_TTL_MS),
    // Extra params are baked into the salt, which the HMAC signature covers,
    // so the server can trust them when the solution comes back.
    params: { issued: String(now) }
  });
  return challenge;
}

export async function GET() {
  const challenge = await generateChallenge();
  return json(challenge);
}
