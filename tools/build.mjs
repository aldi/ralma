import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const packageJsonUrl = new URL('../package.json', import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonUrl, 'utf8'));
const version = typeof packageJson.version === 'string' ? packageJson.version : '0.0.0';

const banner = `/* Ralma v${version} */`;

const sourceUrl = new URL('../src/index.js', import.meta.url);
const source = await readFile(sourceUrl, 'utf8');

function stripExportsForBrowserBundle(sourceText) {
  const withoutExports = sourceText
    .replace(/^export const componentNames\b/m, 'const componentNames')
    .replace(/^export function registerRalma\b/m, 'function registerRalma');

  if (withoutExports === sourceText) {
    throw new Error(
      'Ralma build: failed to locate expected ESM exports in src/index.js; update tools/build.mjs',
    );
  }

  const withoutInternalExports = withoutExports
    // Not accessible from the browser bundle anyway; avoid extra work.
    .replace(/^const componentNames = .*?\n/m, '')
    // Strip the JSDoc block (doesn't help end users).
    .replace(/\n\/\*\*[\s\S]*?\*\/\nfunction registerRalma/m, '\nfunction registerRalma');

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

await writeFile(new URL('../bin/ralma.js', import.meta.url), debugOutput, 'utf8');

async function writeMinBundle() {
  const minifierMode = process.env.RALMA_BUILD_MINIFIER ?? 'auto';
  if (!['auto', 'esbuild', 'fallback'].includes(minifierMode)) {
    throw new Error(
      `RALMA_BUILD_MINIFIER must be one of "auto", "esbuild", or "fallback" (received "${minifierMode}")`,
    );
  }

  const forceFallback = minifierMode === 'fallback';
  const forceEsbuild = minifierMode === 'esbuild';

  if (!forceFallback) {
    try {
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

      return;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_MODULE_NOT_FOUND') {
        if (forceEsbuild) {
          throw new Error('Ralma build: esbuild minifier was requested but esbuild is not installed', {
            cause: error,
          });
        }
        // esbuild isn't installed; fall back to a lightweight minifier in auto mode.
      } else {
        throw error;
      }
    }
  }

  // Fallback: since this file is mostly template strings, this is only lightly compacted.
  const minOutput = `${banner}
(function(global){'use strict';const ractive=global.Ractive;if(!ractive){throw new Error('Ralma: window.Ractive is required before loading ralma.js');}
${withoutInternalExports}
registerRalma(ractive);})(typeof window!=='undefined'?window:globalThis);
`;

  await writeFile(new URL('../bin/ralma.min.js', import.meta.url), minOutput, 'utf8');
}

await writeMinBundle();
