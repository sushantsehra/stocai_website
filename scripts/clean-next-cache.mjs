import { rmSync } from "node:fs";
import { resolve } from "node:path";

const cacheDirs = [".next", ".next-verify"];

for (const dir of cacheDirs) {
  const cacheDir = resolve(process.cwd(), dir);
  rmSync(cacheDir, { recursive: true, force: true });
  console.log(`Removed ${cacheDir}`);
}
