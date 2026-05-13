import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { resolve } from "node:path";

const distDir = ".next-verify";
const distPath = resolve(process.cwd(), distDir);

rmSync(distPath, { recursive: true, force: true });

const nextCli = resolve(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextCli, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir,
  },
});

process.exit(result.status ?? 1);
