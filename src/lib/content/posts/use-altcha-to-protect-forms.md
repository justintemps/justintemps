---
title: Use ALTCHA to protect your forms
description: There are plenty of reasons to prefer the open-source alternative to mainstream solutions, and it's super easy to set up.
date: 2025-04-12
tags:
  - Svelte
  - Captcha
published: true
---

Any form that you expose to the public has to be protected from spammers. Otherwise, sooner or later, a bot will find it and bombard you with fake submissions.

So how do you tell the difference between real users and bots? For a long time, the standard solution has been to use widgets like Google's ubiquitous [ReCAPTCHA](https://cloud.google.com/security/products/recaptcha). By now, everyone has, at some point, had to prove they are human by clicking a checkbox and, if challenged, identifying pictures of cars, bridges, bicycles, or other objects from a selection of fuzzy images.

These solutions work by analyzing user behavior and other factors to determine if an action is being performed by a human or a bot. This is pretty effective — except that it comes at the expense of your users' data, privacy, and time. There are [lots of reasons](https://prosopo.io/blog/google-privacy-nightmare/) why you, as a developer, might have reservations about asking your users to sacrifice those things, let alone make them jump through hoops to [train other people's machine learning models](https://apnews.com/article/technology-technology-issues-digitization-spamming-artificial-intelligence-9e2aec49792c3a1e31c1f94f1a5e7ede) just so they can give you the information your website is asking for.

But I won’t go into those here, because in addition to being potentially invasive, it’s also unnecessary. For most situations, embedded CAPTCHA widgets are overkill. There’s a simpler way that doesn’t require users to give up any of their privacy at all. It’s called [ALTCHA](https://altcha.org/captcha/).

## A high-level overview

Instead of challenging users with puzzles or exposing their data to machine learning algorithms, ALTCHA uses a [Proof of Work](https://en.wikipedia.org/wiki/Proof_of_work) mechanism that requires the browser — not the user — to perform a computational task that helps ensure the source of the form data is legit. The best part is that ALTCHA is easy to self-host; there's no need to rely on third-party APIs unless you want to.

To illustrate, we're going to create a simple API endpoint that generates a cryptographic challenge for our ALTCHA widget to solve. Then we're going to add the widget to the front end, where it will appear to the user as a checkbox input in a form. Finally, we're going to update the form handler to check whether the ALTCHA widget’s solution is correct before processing the rest of the form data.

If you're interested in understanding why this works, I’ve provided a brief explanation at the end of this blog post.

## A simple example using Svelte

Here I'll illustrate a straightforward setup using Svelte, which is what I've used to secure the form on my [contact page](/contact). The logic here is the same regardless of the stack you're using, so this should be pretty easy to follow even if you’re not a Svelte user. Moreover, ALTCHA has official libraries for practically [any framework](https://altcha.org/captcha/#examples) under the sun, so be sure to check out the examples on their website.

Here’s the form we want to protect — nothing fancy:

```html
<form method="POST" action="/contact">
  <label>
    Your email address
    <input type="email" name="email" required />
  </label>
  <label>
    Your message
    <textarea name="message" required></textarea>
  </label>
  <button type="submit" name="submit">Submit</button>
</form>
```

A simplified version of the form handler might look like this:

```javascript
// +page.server.js

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get("email");
    const message = formData.get("message");

    // Do something with the data...

    return { success: true };
  }
};
```

First, install a pair of libraries. The first is used on the server to generate the challenge and verify the solution; the second renders the widget on the client.

```bash
npm install altcha-lib altcha
```

Now, let’s implement the ALTCHA check as an endpoint on our backend. In SvelteKit, that means adding a route to your `api` folder.

```javascript
// src/api/altcha/+server.js

import { json } from "@sveltejs/kit";
import { createChallenge } from "altcha-lib";
import { ALTCHA_HMAC_KEY } from "$env/static/private";

async function generateChallenge() {
  const challenge = await createChallenge({
    hmacKey: ALTCHA_HMAC_KEY,
    maxNumber: 100000
  });
  return challenge;
}

export async function GET() {
  const challenge = await generateChallenge();
  return json(challenge);
}
```

A call to our endpoint might return something like this:

```json
{
  "algorithm": "SHA-256",
  "challenge": "d99a72df6bda8fee9c84c0e2f99883817d94f9f8f251fa4d4f5a39a608b764f3",
  "maxnumber": 100000,
  "salt": "7546a3f5d6d952f74270aae6",
  "signature": "2a3a1c57c4d15200ac5a80b7c67f42d2cb388ad737adf01d8083177c77ba6ca4"
}
```

## Create an ALTCHA widget

Now that we can generate a challenge, let’s add an ALTCHA widget to the front end to solve it.

```svelte
<!-- src/lib/components/Altcha.svelte -->

<script>
  import { browser } from "$app/environment";

  if (browser) {
    import("altcha");
  }

  export let value = "";
</script>

<altcha-widget
  challengeurl="/api/altcha"
  onstatechange={(ev) => {
    const { payload, state } = ev.detail;
    if (state === "verified" && payload) {
      value = payload;
    } else {
      value = "";
    }
  }}
></altcha-widget>
```

Once ALTCHA solves the challenge, we store the solution in the form input’s value. This way, when the user submits the form, we get the ALTCHA solution in the form data.

Unlike most CAPTCHA widgets, ALTCHA is [completely customizable](https://altcha.org/docs/widget-customization/).

Add the widget to your form:

```svelte
<script>
  import Altcha from "$lib/components/Altcha.svelte";
</script>

<form method="POST" action="/contact">
  <label>
    Your email address
    <input type="email" name="email" required />
  </label>
  <label>
    Your message
    <textarea name="message" required></textarea>
  </label>
  <Altcha />
  <button type="submit" name="submit">Submit</button>
</form>
```

## Set up the handler

Update your form handler to validate the challenge solution.

```javascript
// +page.server.js

import { ALTCHA_HMAC_KEY } from "$env/static/private";
import { verifySolution } from "altcha-lib";

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const altcha = formData.get("altcha");

    if (!altcha || typeof altcha !== "string") {
      return fail(400, { error: "Missing or invalid CAPTCHA" });
    }

    const verified = await verifySolution(altcha, ALTCHA_HMAC_KEY);

    if (!verified) {
      return fail(400, { error: "Sorry, but we think you might be a robot." });
    }

    return { success: true };
  }
};
```

That’s it! Your form is now safe from bots, and your users don’t have to solve another CAPTCHA puzzle.

## Wait, why does this work?

You might wonder how this works, given that we’re not trying to determine whether the user is human. To understand, put yourself in the position of a busy little spam bot. The simplest way to abuse a form is to scrape the page and POST spammy data directly to the handler.

But ALTCHA makes that difficult. It adds a required field that can’t be completed without JavaScript. So instead of just scraping and submitting, the bot has to execute the JavaScript as if it were a browser — which takes time and resources.

For a human, this process takes a couple of seconds — barely noticeable. For a bot trying to hammer your form hundreds or thousands of times, that overhead becomes a major obstacle.

The goal of ALTCHA isn’t to make spamming impossible, but to make it more trouble than it’s worth. In 99% of cases, that’s enough. For more advanced needs, ALTCHA has additional features [you can explore here](https://altcha.org/anti-spam/).
