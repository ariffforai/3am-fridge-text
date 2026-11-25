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

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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

  // Line count from the text itself, not assumed: split on the only
  // line separators we allow (none) and require exactly one segment.
  const lines = ENTRY.split("\n").length;
  if (lines !== 1) {
    throw new Error(`entry has ${lines} lines, must be exactly 1`);
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

  // Verify what actually landed on disk: read it back and require it to
  // be byte-identical to ENTRY, with the same character count and line
  // count. A truncated or altered write must fail loudly here, not be
  // discovered by the judge.
  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  if (onDisk !== ENTRY) {
    throw new Error("written file does not match entry text byte-for-byte");
  }
  const diskChars = [...onDisk].length;
  if (diskChars !== chars) {
    throw new Error(`written file is ${diskChars} chars, expected ${chars}`);
  }
  if (onDisk.split("\n").length !== 1) {
    throw new Error("written file is not a single line");
  }

  console.log(`wrote ${chars} characters to ${OUTPUT_PATH}`);
  console.log(`verified: ${chars} characters, ${lines} line, not whitespace-only`);
  console.log(`read-back check passed: file matches entry byte-for-byte`);
}

main();
