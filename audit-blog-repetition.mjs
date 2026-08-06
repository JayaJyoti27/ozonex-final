/**
 * audit-blog-repetition.mjs
 *
 * Pulls every blog post from Sanity and flags:
 *   1. Phrases (6+ words) repeated across multiple different posts
 *   2. Posts sharing an identical heading-sequence "skeleton"
 *   3. Repeated opening / closing sentences across posts
 *
 * SETUP
 *   npm install @sanity/client
 *
 * USAGE
 *   SANITY_PROJECT_ID=xxxx SANITY_DATASET=production node audit-blog-repetition.mjs
 *
 * (Add a token via SANITY_TOKEN env var only if your dataset isn't public-read.)
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "rf5wt8v7",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN, // optional
  useCdn: true,
});

const MIN_PHRASE_WORDS = 6; // phrases shorter than this are too common to be meaningful
const STOPWORD_ONLY_SKIP = true; // skip phrases that are mostly filler words

const STOPWORDS = new Set([
  "the","a","an","and","or","of","to","in","for","on","with","is","are","this",
  "that","it","as","by","at","be","from","your","our","their","its",
]);

function portableTextToPlainText(blocks = []) {
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children || []).map((c) => c.text || "").join(""))
    .filter(Boolean);
}

function headingSkeleton(blocks = []) {
  return blocks
    .filter((b) => b._type === "block" && (b.style === "h1" || b.style === "h2" || b.style === "h3"))
    .map((b) => (b.children || []).map((c) => c.text || "").join("").trim().toLowerCase())
    .filter(Boolean);
}

function nGrams(text, n) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const grams = [];
  for (let i = 0; i <= words.length - n; i++) {
    grams.push(words.slice(i, i + n).join(" "));
  }
  return grams;
}

function isMeaningfulPhrase(phrase) {
  if (!STOPWORD_ONLY_SKIP) return true;
  const words = phrase.split(" ");
  const nonStop = words.filter((w) => !STOPWORDS.has(w));
  return nonStop.length / words.length > 0.5; // at least half real content words
}

async function main() {

  const posts = await client.fetch(
    `*[_type=="blog"]{ _id, title, "slug": slug.current, excerpt, content }`
  );

  console.log(`Fetched ${posts.length} posts.\n`);

  // ---- 1. Cross-post repeated phrases ----
  const phraseToPosts = new Map(); // phrase -> Set of slugs

  for (const post of posts) {
    const paragraphs = portableTextToPlainText(post.content);
    const fullText = paragraphs.join(" ");
    const seenInThisPost = new Set();

    for (const gram of nGrams(fullText, MIN_PHRASE_WORDS)) {
      if (!isMeaningfulPhrase(gram)) continue;
      if (seenInThisPost.has(gram)) continue; // count each post once per phrase
      seenInThisPost.add(gram);

      if (!phraseToPosts.has(gram)) phraseToPosts.set(gram, new Set());
      phraseToPosts.get(gram).add(post.slug);
    }
  }

  const repeatedPhrases = [...phraseToPosts.entries()]
    .filter(([, slugs]) => slugs.size > 1)
    .sort((a, b) => b[1].size - a[1].size);

  console.log("=== REPEATED PHRASES (appear in 2+ posts) ===");
  if (repeatedPhrases.length === 0) {
    console.log("None found — good.");
  } else {
    for (const [phrase, slugs] of repeatedPhrases.slice(0, 40)) {
      console.log(`[${slugs.size} posts] "${phrase}"`);
      console.log(`    -> ${[...slugs].join(", ")}`);
    }
    if (repeatedPhrases.length > 40) {
      console.log(`... and ${repeatedPhrases.length - 40} more`);
    }
  }

  // ---- 2. Duplicate structural skeletons ----
  console.log("\n=== HEADING SKELETONS (compare structure) ===");
  const skeletons = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    skeleton: headingSkeleton(p.content),
  }));

  for (let i = 0; i < skeletons.length; i++) {
    for (let j = i + 1; j < skeletons.length; j++) {
      const a = skeletons[i];
      const b = skeletons[j];
      if (a.skeleton.length === 0 || b.skeleton.length === 0) continue;

      const overlap = a.skeleton.filter((h) => b.skeleton.includes(h)).length;
      const similarity = overlap / Math.max(a.skeleton.length, b.skeleton.length);

      if (similarity >= 0.5) {
        console.log(
          `${(similarity * 100).toFixed(0)}% heading overlap: "${a.title}" (${a.slug}) <-> "${b.title}" (${b.slug})`
        );
      }
    }
  }

  // ---- 3. Repeated opening / closing sentences ----
  console.log("\n=== OPENING / CLOSING SENTENCE REPETITION ===");
  const openings = new Map();
  const closings = new Map();

  for (const post of posts) {
    const paragraphs = portableTextToPlainText(post.content);
    if (paragraphs.length === 0) continue;

    const firstSentence = (paragraphs[0].split(/(?<=[.!?])\s/)[0] || "").trim().toLowerCase();
    const lastNonEmpty = [...paragraphs].reverse().find((p) => p.trim().length > 0) || "";
    const lastSentence = (lastNonEmpty.split(/(?<=[.!?])\s/).pop() || "").trim().toLowerCase();

    if (firstSentence) {
      if (!openings.has(firstSentence)) openings.set(firstSentence, []);
      openings.get(firstSentence).push(post.slug);
    }
    if (lastSentence) {
      if (!closings.has(lastSentence)) closings.set(lastSentence, []);
      closings.get(lastSentence).push(post.slug);
    }
  }

  for (const [sentence, slugs] of openings) {
    if (slugs.length > 1) console.log(`Same OPENING in ${slugs.length} posts: "${sentence}"\n  -> ${slugs.join(", ")}`);
  }
  for (const [sentence, slugs] of closings) {
    if (slugs.length > 1) console.log(`Same CLOSING in ${slugs.length} posts: "${sentence}"\n  -> ${slugs.join(", ")}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
