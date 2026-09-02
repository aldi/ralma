import { stat } from 'node:fs/promises';

// Ralma has zero runtime dependencies. These ceilings exist to make an accidental dependency
// (or a build that stops minifying) fail loudly instead of shipping. Raise them deliberately.
/** @type {Array<[string, number]>} */
const limits = [
  ['bin/ralma.js', 32 * 1024],
  ['bin/ralma.min.js', 24 * 1024],
];

let failed = false;

for (const [file, limit] of limits) {
  const { size } = await stat(new URL(`../${file}`, import.meta.url));
  const headroom = (((limit - size) / limit) * 100).toFixed(1);

  if (size > limit) {
    console.error(`${file}: ${size} bytes exceeds the ${limit} byte limit`);
    failed = true;
  } else {
    console.log(`${file}: ${size} bytes (${headroom}% under the ${limit} byte limit)`);
  }
}

if (failed) process.exit(1);
