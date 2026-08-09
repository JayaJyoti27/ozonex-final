/**
 * delete-posts.mjs
 *
 * Safely deletes specific blog posts by slug, with a dry-run by default.
 *
 * SETUP
 *   Create a WRITE-enabled token at https://sanity.io/manage
 *   (Project -> API -> Tokens -> Add API token -> Editor or Write permission)
 *
 * USAGE
 *   Dry run (shows what WOULD be deleted, deletes nothing):
 *     SANITY_TOKEN=your_write_token node delete-posts.mjs slug-one slug-two
 *
 *   Actually delete (irreversible):
 *     SANITY_TOKEN=your_write_token node delete-posts.mjs --confirm slug-one slug-two
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "rf5wt8v7",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false, // must be false for write operations
});

async function main() {
  const args = process.argv.slice(2);
  const confirm = args.includes("--confirm");
  const slugs = args.filter((a) => a !== "--confirm");

  if (slugs.length === 0) {
    console.error("Usage: node delete-posts.mjs [--confirm] slug-one slug-two");
    process.exit(1);
  }

  if (!process.env.SANITY_TOKEN) {
    console.error("SANITY_TOKEN env var is required (needs write permission).");
    process.exit(1);
  }

  console.log(confirm ? "MODE: LIVE DELETE (irreversible)" : "MODE: DRY RUN (nothing will be deleted)");
  console.log("");

  for (const slug of slugs) {
    const post = await client.fetch(
      `*[_type=="blog" && slug.current == $slug][0]{ _id, title, "slug": slug.current }`,
      { slug }
    );

    if (!post) {
      console.log(`SKIP — not found: ${slug}`);
      continue;
    }

    console.log(`FOUND: "${post.title}" (${post.slug}) [_id: ${post._id}]`);

    if (confirm) {
      await client.delete(post._id);
      console.log(`  -> DELETED`);
    } else {
      console.log(`  -> would delete (dry run — re-run with --confirm to actually delete)`);
    }
    console.log("");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
