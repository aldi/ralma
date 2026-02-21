import { readFile } from 'node:fs/promises';
import { collectFormatTargets } from './format-targets.mjs';

const targets = await collectFormatTargets();

let failed = false;

for (const file of targets) {
  const text = await readFile(file, 'utf8');

  if (text.includes('\r\n')) {
    // eslint-disable-next-line no-console
    console.error(`${file}: contains CRLF (expected LF)`);
    failed = true;
  }

  if (!text.endsWith('\n')) {
    // eslint-disable-next-line no-console
    console.error(`${file}: missing trailing newline`);
    failed = true;
  }

  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.endsWith(' ') || line.endsWith('\t')) {
      // eslint-disable-next-line no-console
      console.error(`${file}:${i + 1}: trailing whitespace`);
      failed = true;
      break;
    }
  }
}

if (failed) process.exit(1);
