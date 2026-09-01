import type { Action } from "svelte/action";

export interface RevealOptions {
  /** Fraction of the element that must be on screen before it reveals. */
  threshold?: number;
  /** Insets the viewport used for the check, e.g. "0px 0px -10% 0px". */
  rootMargin?: string;
}

/**
 * Scroll-triggered reveal. Ensures the element carries the `reveal` class and
 * adds `is-revealed` the first time it scrolls into view. All of the visual
 * work lives in CSS keyed off those two classes, so without JavaScript the
 * element simply renders in its final, visible state.
 *
 * Put `class="reveal"` on the element in the markup too: paired with the
 * `html.js` hook set in app.html, that hides it from the very first paint
 * instead of flashing it visible until hydration catches up.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (
  node,
  options = {}
) => {
  const { threshold = 0.2, rootMargin = "0px 0px -10% 0px" } = options;
  const show = () => node.classList.add("is-revealed");

  node.classList.add("reveal");

  if (typeof IntersectionObserver === "undefined") {
    show();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        show();
        observer.disconnect();
      }
    },
    { threshold, rootMargin }
  );
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
};
