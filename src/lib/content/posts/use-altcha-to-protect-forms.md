---
title: Use ALTCHA to protect your forms
description: There are plenty of reasons to prefer the open-source alternative to mainstream solutions and it's super easy to set up.
date: 2025-4-12
tags:
  - Svelte
  - Captcha
published: true
---

Any form that you expose to the public has to be protected from spammers somehow. Otherwise, sooner or later, a bot will find it and bombard you with fake submissions.

So how to tell the difference between real users and bots? For a long time, the standard solution has been to use widgets like Google's ubiquitous [ReCAPTCHA](https://cloud.google.com/security/products/recaptcha). By now, everyone has at some point had to prove they are human by clicking on a checkbox and, if challenged, identify pictures of cars, bridges, bicycles or other objects from a selection of fuzzy images.

These solutions work by analysing user behaviour and other factors to determine if an action is being performed by a human or by a bot. This is pretty effective, except that it comes at the expense of your users' data, privacy and time. There are [several reasons](https://prosopo.io/blog/google-privacy-nightmare/) why you, as a developer, might have reservations about asking your users to sacrifice those things, let alone requiring them to [help train machine learning models](https://apnews.com/article/technology-technology-issues-digitization-spamming-artificial-intelligence-9e2aec49792c3a1e31c1f94f1a5e7ede) before they can give you the data that you want.

But I wont' go into that here, because in addition to being potentially invasive, it's also unnecessary. For most situations, embedded CAPTCHA widgets are overkill. There's a simpler way that doesn't require users to give up any of their privacy at all. It's called [ALTCHA](https://altcha.org/captcha/).

## A high-level overview

The basic premise is that instead of challenging users with puzzles or exposing their data to machine-learning algorithms, ALTCHA uses a Proof of Work mechanism that requires the browser — not the user — to perform a computational task. The best part is that it's easy to self-host; there's no need to rely on third-party APIs unless you want to.

First, we're going to create an API endpoint on your server that will generate a cryptographic challenge. Then we're going to add the ALTCHA widget to the front-end, which will be rendered as a checkbox input of the form.

When a user clicks on the checkbox, the ALTCHA widget will fetch the challenge from the API endpoint, solve it and then submit the solution together with the form data. Your form handler will then check that the solution is correct and, if it is, process the rest of the form data as usual. If it's not or if a solution is missing, the handler will return an error.

If you're interested to understand why this works, I've provided a brief explanation after the example below.

## An example using Svelte

Here I'll illustrate a straightforward setup using Svelte, which is what I've used to secure the form on my [contact page](/contact). The logic here is the same whatever stack you're using so this should be pretty easy to follow if you're not a Svelte user. Moreover, ALTCHA supports official libraries for practically [any framework](https://altcha.org/captcha/#examples) under the sun, so be sure to check out the examples on their website.

First, let's assume that you have a form that looks like this:

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

A simplified version of your form handler would look something like this.

```javascript
// +page.server.js

export const actions = {
  default: async (event) => {
    // Get the form data
    const formData = await event.request.formData();
    const email = formData.get("email");
    const message = formData.get("message");

    // Sanitize, validate and do something with the data...
    // Then tell the client everything worked out
    return { success: true };
  }
};
```

Before we do anything, we need to install our altcha dependencies:

```shell
$ npm install altcha altcha-lib
```

Now, let's go implement the Altcha check as endpoint on our backend. The way to do that in Svelte is by adding a route to your api folder. (Next.js has a similar concept, so if that's what you're using this should look familiar.)

```js
// src/api/altcha/+server.js

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
```

## Why does this work?

Imagine you're a bot scouring the internet in search of forms to spam. The simplest way to do this is to scrape the form html from a web page and submit it directly to the handler. But that won't work with ALTCHA adds a required field to the form that it can't complete unless it can fetch and solve a puzzle with JavaScript.

Instead of just scraping the page, the bot now has to load your website's JavaScript so that the Altcha widget can do its thing. That's a lot of extra work for a simple spam both, which not only has to use extra computational and memory resources, but now has to figure out a math puzzle as well.

For a human, JavaScript is getting loaded anyway and the whole process of resolving the challenge only takes a few seconds. But for a bot hoping to slam your form with hundreds, thousands or millions of fake submissions, that's a very big hurdle indeed. And while I didn't illustrate this here, it would be trivial to set up a condition whereby the challenge takes progressively longer to solve if you're getting a suspicious number of attempts froma a single source.

The goal of ALTCHA isn't to make your forms impossible to spam, so much as to make spaming them more trouble than it's worth. In 99% of use cases, that should be more than enough.
