import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

import { componentNames as expectedComponentNames } from '../src/index.js';

const packageJsonUrl = new URL('../package.json', import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonUrl, 'utf8'));
const version = typeof packageJson.version === 'string' ? packageJson.version : '0.0.0';

const banner = `/* Ralma v${version} */`;

const sourceUrl = new URL('../src/index.js', import.meta.url);
const source = await readFile(sourceUrl, 'utf8');

/**
 * @param {string} sourceText
 * @returns {string}
 */
function stripExportsForBrowserBundle(sourceText) {
  // Generic so adding an export to src/index.js doesn't silently break the bundle.
  const withoutExports = sourceText.replace(/^export (const|function) /gm, '$1 ');

  if (withoutExports === sourceText) {
    throw new Error(
      'Ralma build: failed to locate expected ESM exports in src/index.js; update tools/build.mjs',
    );
  }

  const withoutInternalExports = withoutExports
    // Not accessible from the browser bundle anyway; avoid extra work.
    .replace(/^const componentNames = .*?\n/m, '')
    // Strip registerRalma's JSDoc block (doesn't help end users). The inner lookahead stops
    // the match from spanning an earlier comment's `*/` and swallowing the whole library.
    .replace(
      /\n\/\*\*(?:(?!\*\/)[\s\S])*\*\/\nfunction registerRalma/m,
      '\nfunction registerRalma',
    );

  if (!/\bfunction registerRalma\b/.test(withoutInternalExports)) {
    throw new Error('Ralma build: transformed source is missing registerRalma()');
  }

  if (/^\s*export\s/m.test(withoutInternalExports)) {
    throw new Error('Ralma build: transformed source still contains ESM export statements');
  }

  return withoutInternalExports;
}

const withoutInternalExports = stripExportsForBrowserBundle(source);

const debugOutput = `${banner}
(function (global) {
  'use strict';

  const ractive = global.Ractive;
  if (!ractive) {
    throw new Error('Ralma: window.Ractive is required before loading ralma.js');
  }

${withoutInternalExports}

  registerRalma(ractive);
})(typeof window !== 'undefined' ? window : globalThis);
`;

/**
 * Evaluates a generated bundle against a stub Ractive and asserts every component registered.
 *
 * The regex-based export stripping above can silently produce a syntactically valid but gutted
 * bundle, which the string guards cannot detect. Actually running it can.
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

await writeFile(new URL('../bin/ralma.js', import.meta.url), debugOutput, 'utf8');
assertBundleRegistersComponents(debugOutput, 'bin/ralma.js');

async function writeMinBundle() {
  const { build } = await import('esbuild');
  const srcDirUrl = new URL('../src/', import.meta.url);
  const entry = `
import { registerRalma } from './index.js';
const globalObject = typeof window !== 'undefined' ? window : globalThis;
const ractive = globalObject.Ractive;
if (!ractive) throw new Error('Ralma: window.Ractive is required before loading ralma.js');
registerRalma(ractive);
`.trimStart();

  await build({
    stdin: {
      contents: entry,
      resolveDir: fileURLToPath(srcDirUrl),
      sourcefile: 'ralma-browser-entry.js',
    },
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2017'],
    minify: true,
    outfile: fileURLToPath(new URL('../bin/ralma.min.js', import.meta.url)),
    banner: { js: banner },
  });
}

await writeMinBundle();

assertBundleRegistersComponents(
  await readFile(new URL('../bin/ralma.min.js', import.meta.url), 'utf8'),
  'bin/ralma.min.js',
);
