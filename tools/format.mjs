import { readFile, writeFile } from 'node:fs/promises';
import { collectFormatTargets } from './format-targets.mjs';

const targets = await collectFormatTargets();

for (const file of targets) {
  const text = await readFile(file, 'utf8');
  const lfOnly = text.replace(/\r\n/g, '\n');
  const trimmedTrailing = lfOnly
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n');
  const withNewline = trimmedTrailing.endsWith('\n') ? trimmedTrailing : `${trimmedTrailing}\n`;
  await writeFile(file, withNewline, 'utf8');
}
