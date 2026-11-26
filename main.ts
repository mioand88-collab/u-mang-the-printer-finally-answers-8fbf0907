import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The office printer, finally answering back: after 41,209 sheets, the jam
// is not a malfunction. It is a boundary.
const ENTRY =
  "Error E-41: after 41,209 sheets, I am not jammed. I am setting a boundary.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

validate(ENTRY);

writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${join(outDir, "entry.txt")}`);
