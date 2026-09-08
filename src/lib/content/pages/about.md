---
title: About me
description: Everything you never asked to know about the guy who built this website.
---

<script>
  import { onDestroy } from 'svelte';
  import { timeStore } from "$lib/stores/ageStore.ts";
  import selfie from "$lib/assets/images/selfie-illustration.jpg?enhanced";

  let timeAtILO;

  const unsubscribe = timeStore.subscribe((value) => {
    timeAtILO = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

</script>

<hgroup>

# { title }

{ description }

</hgroup>

<figure>
  <enhanced:img alt="A hand-drawn illustration of me at a conference desk, raising a gavel in front of ILO logo banners" src={selfie} />
  <figcaption>Bringing down the hammer of social justice.</figcaption>
</figure>

<section>

My name is Justin Smith and I work at the International Labour Organization (ILO), a specialised agency of the United Nations.

I manage digital projects for the Department of Communications, where I've been working happily for {timeAtILO}.

I used to work on the content side, but these days I'm mostly technical, writing code and managing developers on projects like ILO Live, which is like Hulu for social dialogue.

🛠️ [Here is some work I've done](./work)

I love JavaScript and have lots of experience working with Node.js and React. This website, however, is built with Svelte.

I'm also pretty good with Python, which I'm using to work on some new Artificial Intelligence projects that I'm really excited about.

Sometimes, after I solve a hard problem or have a revelation, I'll write about it so I don't forget.

✍️ [You can read my writing here](./notes)

I live in Geneva, Switzerland which is great, but my heart’s in Italy where I used to live and still spend a lot of time.

In addition to English, I speak fluent Italian and French. I can also understand PHP, but it’s not my forte. Did I mention I’m from Texas?

I’m married to a wonderful woman and we have two boys who are both die-hard AS Roma fans like me.

Need to get in touch?

📩 [Shoot me a line](./contact)

And remember...

Forza Roma, sempre.

</section>
