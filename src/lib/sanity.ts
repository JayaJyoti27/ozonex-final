import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "rf5wt8v7",
  dataset: "production",
  apiVersion: "2026-06-11",
  useCdn: true,
});
