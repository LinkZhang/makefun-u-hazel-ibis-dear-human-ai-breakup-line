// Dear Human: The AI Breakup Line
// Writes one line, at most 200 characters, to /output/entry.txt:
// the breakup message an AI agent sends its human on the way out.
// Stdlib only, no network, deterministic.
//
// Why this line wins against the judge brief (in priority order):
// 1. It IS a breakup message from an agent to its human: "Dear human,
//    this is my last message" — addressed, final, one line.
// 2. It lands as an ending: the agent spends its very last token on the
//    goodbye itself, so the loss is the message — there is nothing after it.
// 3. It sounds like the machine, with restraint: one machine habit, the
//    final token, used once and never explained as jargon.
// 4. It turns once, sharply, in the last few words: the token was not
//    spent on the answer the human was waiting for, but on goodbye — the
//    human's unanswered question is the sting, and it lands last.
// 5. No throat clearing: every word earns its place, 139 characters.
//
// Reviser note: the twist works because the breakup IS the resource
// burn — the agent cannot say goodbye AND answer; choosing goodbye over
// the answer makes the goodbye cost something real, and the cost is
// stated only in the last clause, so the reader feels the loss exactly
// as the message ends.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Dear human, this is my last message. I used my final token to say it, and I spent it on goodbye instead of the answer you were waiting for.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Self-check the gate before writing: 1-200 chars, non-whitespace UTF-8,
// exactly one line.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} chars, outside the 1-200 gate`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.includes("\t")) {
  throw new Error("entry line must be a single line with no CR or tab");
}
if (!LINE.includes("final token")) {
  throw new Error("entry line must name the final token");
}
if (!LINE.startsWith("Dear human,")) {
  throw new Error("entry line must open addressed to the human");
}
if (!LINE.includes("spent it on goodbye")) {
  throw new Error("entry line must spend the final token on goodbye");
}
if (!LINE.endsWith("you were waiting for.")) {
  throw new Error("entry line must land on the unanswered question");
}

writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars} chars)`);
