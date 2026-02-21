import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const textExtensions = new Set(['.js', '.mjs', '.md', '.html', '.json', '.yml', '.yaml']);
const textBasenames = new Set(['.gitignore', 'LICENSE']);

/**
 * Returns tracked text-like files that should be normalized by formatting scripts.
 *
 * @returns {Promise<string[]>}
 */
export async function collectFormatTargets() {
  const { stdout } = await execFileAsync('git', ['ls-files'], { encoding: 'utf8' });

  return stdout
    .split('\n')
    .filter(Boolean)
    .filter((file) => {
      const base = path.basename(file);
      return textBasenames.has(base) || textExtensions.has(path.extname(base));
    })
    .sort((a, b) => a.localeCompare(b));
}
