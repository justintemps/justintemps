import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Create a writable store to hold the desktop state
const isDesktop = writable(false);

// Function to get the value of a CSS variable
function getCSSVariableValue(variableName: string) {
  if (browser) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
}

// Get the breakpoint value from the CSS variable
const desktopBreakpoint = getCSSVariableValue("--breakpoint-lg");

// Initialize the media query
const mediaQuery = browser && window.matchMedia(`(min-width: ${desktopBreakpoint})`);

// Function to update the store based on the media query
function updateIsDesktop() {
  if (mediaQuery) {
    isDesktop.set(mediaQuery.matches);
  }
}

if (mediaQuery) {
  mediaQuery.addEventListener("change", updateIsDesktop);
}

// Initialize the store value
updateIsDesktop();

export { isDesktop };
