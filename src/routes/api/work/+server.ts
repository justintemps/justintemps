import { json } from "@sveltejs/kit";
import type { WorkSample } from "$lib/types";

async function getWork() {
  let work: WorkSample[] = [];

  const paths = import.meta.glob("/src/lib/content/work/*.md", {
    eager: true
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as Omit;
      const sample = { ...metadata } satisfies WorkSample;
      work.push(sample);
    }
  }

  return work;
}

export async function GET() {
  const work = await getWork();
  return json(work);
}
