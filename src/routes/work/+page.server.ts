import type { WorkSample } from "$lib/types";

export async function load({ fetch }) {
  const response = await fetch("api/work");
  const work: WorkSample[] = await response.json();
  return { work };
}
