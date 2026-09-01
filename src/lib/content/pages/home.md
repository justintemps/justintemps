---
title: Justin Smith
subtitle: Digital Communications
description: The website of Justin Smith, Web Developer, AI practitioner and Digital Communication Officer at the International Labour Organization.
---

<script>
  import profile from "$lib/assets/images/profile-illustration.webp";
  import { reveal } from "$lib/actions/reveal";
</script>

<section class="hp--intro reveal" use:reveal>

<img
  class="hp--intro--img"
  src={profile}
  width="858"
  height="870"
  alt="A hand-drawn illustration of me wearing a blue baseball cap, sipping an espresso on a sunny Venetian terrace"
  fetchpriority="high"
/>

My name is Justin Smith.
I’m a Digital Communication Officer at the International Labour Organization, a
specialised agency of the United Nations.

</section>

<section class="hp--list reveal" use:reveal>

## This is my website

- ✍️ [You can read my writing](./notes)
- 🛠️ [Check out my projects](./work)
- 🤙 [Get in touch](./contact)
- 🔌 [Or read this shameless plug](./about)

<div class="hp--joke reveal" use:reveal={{ threshold: 0.6 }}>
<p>And that's it.</p>
<p>That's all there is to do here.</p>
</div>

</section>
