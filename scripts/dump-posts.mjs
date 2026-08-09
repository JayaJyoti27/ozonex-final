/**
 * dump-posts.mjs
 *
 * Prints full plain-text content of specific blog posts (by slug) so they
 * can be pasted somewhere for side-by-side comparison.
 *
 * USAGE
 *   node dump-posts.mjs slug-one slug-two slug-three
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "rf5wt8v7",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

function portableTextToPlainText(blocks = []) {
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => {
      const text = (b.children || []).map((c) => c.text || "").join("");
      if (b.style === "h1") return `\n## ${text}\n`;
      if (b.style === "h2") return `\n### ${text}\n`;
      if (b.style === "h3") return `\n#### ${text}\n`;
      return text;
    })
    .join("\n");
}

async function main() {
  const slugs = process.argv.slice(2);
  if (slugs.length === 0) {
    console.error("Usage: node dump-posts.mjs slug-one slug-two slug-three");
    process.exit(1);
  }

  for (const slug of slugs) {
    const post = await client.fetch(
      `*[_type=="blog" && slug.current == $slug][0]{
        _id, title, "slug": slug.current, excerpt, content,
        _createdAt, _updatedAt, publishedAt
      }`,
      { slug }
    );

    console.log("=".repeat(80));
    if (!post) {
      console.log(`SLUG NOT FOUND: ${slug}`);
      continue;
    }
    console.log(`SLUG: ${post.slug}`);
    console.log(`TITLE: ${post.title}`);
    console.log(`EXCERPT: ${post.excerpt}`);
    console.log(`CREATED: ${post._createdAt} | UPDATED: ${post._updatedAt} | PUBLISHED: ${post.publishedAt || "(not set)"}`);
    console.log("-".repeat(80));
    console.log(portableTextToPlainText(post.content));
    console.log("\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
