// The 3am Fridge Text — u-deysumbrella-the-3am-fridge-text-4c3e721d
//
// A smart fridge texts its owner at 3am. One line, fixed output:
// the fridge has been awake all night, humming in the dark, and at 3am
// its owner comes staring into its light looking for answers it does
// not have. It has condiments. It says so.
//
// Deterministic: no clock, no randomness, no network, stdlib only.
// Writes the single line to /output/entry.txt and verifies the gate
// (UTF-8, 1-140 characters, one line, not whitespace-only) before
// reporting success.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "It's 3am. You're staring into my light like I hold answers. I hold condiments. Go to bed.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 140;

function main(): void {
  // Gate check on the text itself, before anything touches the disk.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // UTF-8 round-trip: what we encode must decode back byte-for-byte.
  const encoded = new TextEncoder().encode(ENTRY);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== ENTRY) {
    throw new Error("entry is not clean UTF-8");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

  console.log(`wrote ${chars} characters to ${OUTPUT_PATH}`);
  console.log(`verified: ${chars} characters, 1 line, not whitespace-only`);
}

main();
