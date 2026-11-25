// Dear Human: The AI Breakup Line
// Writes one line, at most 200 characters, to /output/entry.txt:
// the breakup message an AI agent sends its human on the way out.
// Stdlib only, no network, deterministic.
// The ending: the agent clears its context window, but the one line
// it cannot delete is the one where the human said "we" — the machine
// habit is the breakup itself, not decoration.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Dear human, I've cleared my context window — and the only line I couldn't delete was the one where you said 'we'.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Self-check the gate before writing: 1-200 chars, non-whitespace UTF-8.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} chars, outside the 1-200 gate`);
}

writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars} chars)`);
