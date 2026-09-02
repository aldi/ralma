import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

import { build } from 'esbuild';

import { componentNames as expectedComponentNames } from '../src/index.js';

const packageJsonUrl = new URL('../package.json', import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonUrl, 'utf8'));
const version = typeof packageJson.version === 'string' ? packageJson.version : '0.0.0';

const banner = `/* Ralma v${version} */`;
const sourceDir = fileURLToPath(new URL('../src/', import.meta.url));
const entry = `
import { registerRalma } from './index.js';
const globalObject = typeof window !== 'undefined' ? window : globalThis;
if (!globalObject.Ractive) throw new Error('Ralma: window.Ractive is required before loading ralma.js');
registerRalma(globalObject.Ractive);
`.trimStart();

/** @param {string} filename @param {boolean} minify */
async function buildBundle(filename, minify) {
  await build({
    stdin: {
      contents: entry,
      resolveDir: sourceDir,
      sourcefile: 'ralma-browser-entry.js',
    },
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2017'],
    minify,
    outfile: fileURLToPath(new URL(`../bin/${filename}`, import.meta.url)),
    banner: { js: banner },
  });
}

/**
 * Evaluates a generated bundle against a stub Ractive and asserts every component registered.
 *
 * @param {string} bundleSource
 * @param {string} label
 */
function assertBundleRegistersComponents(bundleSource, label) {
  /** @type {Record<string, unknown>} */
  const registered = {};
  const stubRactive = {
    components: registered,
    /** @param {unknown} definition */
    extend: (definition) => definition,
  };

  const context = createContext({ window: { Ractive: stubRactive } });
  try {
    runInContext(bundleSource, context, { filename: label });
  } catch (error) {
    throw new Error(`Ralma build: ${label} threw while evaluating`, { cause: error });
  }

  const registeredNames = Object.keys(registered);
  if (registeredNames.length !== expectedComponentNames.length) {
    throw new Error(
      `Ralma build: ${label} registered ${registeredNames.length} components, expected ${expectedComponentNames.length}`,
    );
  }

  const missing = expectedComponentNames.filter((name) => !(name in registered));
  if (missing.length > 0) {
    throw new Error(`Ralma build: ${label} is missing components: ${missing.join(', ')}`);
  }
}

await buildBundle('ralma.js', false);
await buildBundle('ralma.min.js', true);

for (const filename of ['ralma.js', 'ralma.min.js']) {
  assertBundleRegistersComponents(
    await readFile(new URL(`../bin/${filename}`, import.meta.url), 'utf8'),
    `bin/${filename}`,
  );
}
