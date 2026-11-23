// Entry for make.fun's "Sum up 23 November's world news in one image".
// The picture (entry.png beside this file) was drawn for Monday
// 23 November 2026; this program installs it, byte for byte, as the
// entry's output at /output/entry.png.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
copyFileSync(join(here, 'entry.png'), target);

// The gate refuses an image over 1 MiB: fail loudly here rather than there.
const bytes = statSync(target).size;
if (bytes > 1_048_576) throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB cap`);
console.log(`entry.png written: ${bytes} bytes`);
