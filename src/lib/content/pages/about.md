<script>
  import { onDestroy } from 'svelte';
  import { timeStore } from "$lib/stores/ageStore.ts";

  let age;

  const unsubscribe = timeStore.subscribe((value) => {
    age = value;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

# About me

<figure>
  <img alt="Me holding a gavel in front of an ILO logo banner" src="/selfie.jpg" />
  <figcaption>Bringing down the hammer of social justice.</figcaption>
</figure>

<section>

My name’s Justin Smith. I’m {age} old.

I work at the International Labour Organization (ILO) where I manage digital projects for the Department of Communications.

I used to work on the content side, but these days I’m mostly technical, writing code and managing developers on projects like ILO Live, which is like Hulu for social dialogue.

🛠️ [Here is some work I've done](./work)

I love JavaScript and have lots of experience working with Node.js and React. This website, however, is built with Svelte.

I’m also pretty good with Python, which I’m using to learn more about Machine Learning and Artificial Intelligence.

Sometimes, after I solve a tough problem, I’ll write down my solution so I don’t forget.

✍️ [You can read my writing here](./notes)

I live in Geneva, Switzerland which is great, but my heart’s in Italy where I used to live and still spend a lot of time.

In addition to English, I speak fluent Italian and French. I can also understand PHP, but it’s not my forte. Did I mention I’m from Texas?

I’m married to a wonderful woman and we have two boys who are both diehard fans of AS Roma, like me.

Need to get in touch?

📩 [Shoot me a line](./contact)

And remember...

Forza Roma, sempre.

</section>
