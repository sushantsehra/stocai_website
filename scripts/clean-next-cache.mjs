import { rmSync } from "node:fs";
import { resolve } from "node:path";

const nextCacheDir = resolve(process.cwd(), ".next");

rmSync(nextCacheDir, { recursive: true, force: true });
console.log(`Removed ${nextCacheDir}`);
