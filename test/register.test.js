import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ractive from 'ractive';

import { componentNames, hrefAwareComponentNames, registerRalma } from '../src/index.js';

test('registerRalma registers all components', () => {
  const ractive = {
    components: {},
    extend(def) {
      return { ...def, __extended: true };
    },
  };

  registerRalma(ractive);

  for (const name of componentNames) {
    assert.equal(typeof ractive.components[name], 'object');
    assert.equal(ractive.components[name].__extended, true);
  }
});

test('registerRalma accepts constructor functions', () => {
  function Ractive() {}
  Ractive.components = {};
  Ractive.extend = (def) => ({ ...def, __extended: true });

  registerRalma(Ractive);

  for (const name of componentNames) {
    assert.equal(typeof Ractive.components[name], 'object');
    assert.equal(Ractive.components[name].__extended, true);
  }
});

test('registerRalma is idempotent per version', () => {
  let extendCalls = 0;
  const ractive = {
    components: {},
    extend(def) {
      extendCalls += 1;
      return def;
    },
  };

  registerRalma(ractive);
  const callsAfterFirst = extendCalls;
  registerRalma(ractive);

  assert.equal(extendCalls, callsAfterFirst);
});

test('registerRalma validates input', () => {
  assert.throws(() => registerRalma(null), /Ractive/);
  assert.throws(() => registerRalma({ components: {} }), /extend/);
  assert.throws(() => registerRalma({ extend() {} }), /components/);
  assert.throws(() => registerRalma({ components: {}, extend() {} }, 'bad-options'), /options/);
});

function registerWithRealRactive() {
  const ractive = {
    components: {},
    extend: Ractive.extend.bind(Ractive),
  };

  registerRalma(ractive);
  return ractive.components;
}

function renderWithRealRactive(template, data = {}) {
  const components = registerWithRealRactive();
  const app = new Ractive({ template, data, components });
  return app.toHTML();
}

test('registerRalma templates compile with real Ractive', () => {
  Ractive.DEBUG = false;
  const components = registerWithRealRactive();

  for (const name of componentNames) {
    assert.equal(typeof components[name], 'function');
  }
});

test('navbar-burger renders a button for actions', () => {
  const html = renderWithRealRactive('<navbar-burger />');

  assert.match(html, /^<button\b/);
  assert.match(html, /\btype="button"/);
});

test('dropdown-button renders a non-submit button', () => {
  const html = renderWithRealRactive('<dropdown-button>Menu</dropdown-button>');

  assert.match(html, /^<button\b/);
  assert.match(html, /\btype="button"/);
});

test('navbar-link without href renders a button', () => {
  const html = renderWithRealRactive('<navbar-link>Menu</navbar-link>');

  assert.match(html, /^<button\b/);
  assert.match(html, /\btype="button"/);
});

test('navbar-link with href renders an anchor', () => {
  const html = renderWithRealRactive('<navbar-link href="/docs">Docs</navbar-link>');

  assert.match(html, /^<a\b/);
  assert.match(html, /\bhref="\/docs"/);
});

test('navbar-link with unsafe href falls back to button', () => {
  const html = renderWithRealRactive('<navbar-link href="javascript:alert(1)">Docs</navbar-link>');

  assert.match(html, /^<button\b/);
  assert.doesNotMatch(html, /\bhref=/);
});

test('tab-link without href renders a button', () => {
  const html = renderWithRealRactive('<tab-link>Tab</tab-link>');

  assert.match(html, /^<button\b/);
  assert.match(html, /\btype="button"/);
});

test('button with unsafe href renders button fallback', () => {
  const html = renderWithRealRactive('<button href="javascript:alert(1)">Click</button>');

  assert.match(html, /^<button\b/);
  assert.doesNotMatch(html, /\bhref=/);
});

// An <a> with no href is not keyboard-focusable, and dropdown-item carries an on-click.
test('dropdown-item without href renders a focusable button', () => {
  const html = renderWithRealRactive('<dropdown-item on-click="pick">Pick</dropdown-item>');

  assert.match(html, /^<button\b/);
  assert.match(html, /\btype="button"/);
  assert.match(html, /\bclass="dropdown-item/);
});

test('dropdown-item with href renders an anchor', () => {
  const html = renderWithRealRactive('<dropdown-item href="/docs">Docs</dropdown-item>');

  assert.match(html, /^<a\b/);
  assert.match(html, /\bhref="\/docs"/);
});

// role="menu" without menuitem children and arrow-key handling is worse than no role at all.
test('dropdown-menu has no default role', () => {
  const html = renderWithRealRactive('<dropdown-menu>items</dropdown-menu>');

  assert.doesNotMatch(html, /\brole=/);
});

test('dropdown-menu honours an explicit role', () => {
  const html = renderWithRealRactive('<dropdown-menu role="listbox">items</dropdown-menu>');

  assert.match(html, /\brole="listbox"/);
});

test('pagination-link derives an aria-label from page', () => {
  const html = renderWithRealRactive('<pagination-link page="7" href="/p/7">7</pagination-link>');

  assert.match(html, /\baria-label="Goto page 7"/);
});

test('pagination-link prefers an explicit ariaLabel over page', () => {
  const html = renderWithRealRactive(
    '<pagination-link page="7" ariaLabel="Last page" href="/p/7">7</pagination-link>',
  );

  assert.match(html, /\baria-label="Last page"/);
  assert.doesNotMatch(html, /Goto page/);
});

// An empty aria-label strips the accessible name; omitting it leaves the link text as the name.
test('pagination-link omits aria-label when it has no value for it', () => {
  const html = renderWithRealRactive('<pagination-link href="/p/7">7</pagination-link>');

  assert.doesNotMatch(html, /\baria-label=/);
});

// Control characters are built with String.fromCharCode so this file stays free of literal
// control bytes that editors and diff tools would hide.
const TAB = String.fromCharCode(9);
const LF = String.fromCharCode(10);
const CR = String.fromCharCode(13);
const NUL = String.fromCharCode(0);

const unsafeHrefs = [
  'javascript:alert(1)',
  'JaVaScRiPt:alert(1)',
  '   javascript:alert(1)',
  `java${TAB}script:alert(1)`,
  `java${LF}script:alert(1)`,
  `java${CR}script:alert(1)`,
  `java${NUL}script:alert(1)`,
  `${TAB}${LF}javascript:alert(1)`,
  'data:text/html,<script>alert(1)</script>',
  `data${TAB}:text/html,alert(1)`,
  'vbscript:msgbox(1)',
  `v${CR}bscript:msgbox(1)`,
];

const safeHrefs = ['/docs', 'https://example.com/a?b=c#d', '#anchor', 'mailto:a@b.c', '/my docs'];

for (const name of hrefAwareComponentNames) {
  test(`${name} rejects obfuscated unsafe hrefs`, () => {
    for (const href of unsafeHrefs) {
      const html = renderWithRealRactive(`<${name} href="{{href}}">x</${name}>`, { href });

      assert.doesNotMatch(
        html,
        /\bhref=/,
        `${name} rendered an href for ${JSON.stringify(href)}: ${html}`,
      );
    }
  });

  test(`${name} keeps safe hrefs`, () => {
    for (const href of safeHrefs) {
      const html = renderWithRealRactive(`<${name} href="{{href}}">x</${name}>`, { href });

      assert.match(html, /\bhref=/, `${name} dropped a safe href ${JSON.stringify(href)}: ${html}`);
    }
  });
}

test('sanitizer rejects non-string and empty hrefs', () => {
  for (const href of [null, undefined, 42, {}, '', '   ']) {
    const html = renderWithRealRactive('<navbar-link href="{{href}}">x</navbar-link>', { href });

    assert.doesNotMatch(html, /\bhref=/);
  }
});

test('sanitizer re-evaluates href changes after init', () => {
  const components = registerWithRealRactive();
  const app = new Ractive({
    template: '<navbar-item href="{{href}}">x</navbar-item>',
    data: { href: '/safe' },
    components,
  });

  assert.match(app.toHTML(), /\bhref="\/safe"/);

  app.set('href', `java${TAB}script:alert(1)`);
  assert.doesNotMatch(app.toHTML(), /\bhref=/);

  app.set('href', '/safe-again');
  assert.match(app.toHTML(), /\bhref="\/safe-again"/);
});

test('every component rendering an href is registered as href-aware', () => {
  const components = registerWithRealRactive();

  for (const name of componentNames) {
    if (hrefAwareComponentNames.has(name)) continue;

    const html = new Ractive({
      template: `<${name} href="{{href}}">x</${name}>`,
      data: { href: 'javascript:alert(1)' },
      components,
    }).toHTML();

    assert.doesNotMatch(
      html,
      /\bhref=/,
      `${name} renders an href but is missing from hrefAwareComponentNames, so it skips sanitizing`,
    );
  }
});

test('docs catalog lists exactly the registered components', async () => {
  const { allComponentNames } = await import('../docs/src/data/ralmaCatalog.js');

  const documented = new Set(allComponentNames);
  const registered = new Set(componentNames);

  const undocumented = componentNames.filter((name) => !documented.has(name));
  const stale = allComponentNames.filter((name) => !registered.has(name));

  assert.deepEqual(undocumented, [], 'components missing from docs/src/data/ralmaCatalog.js');
  assert.deepEqual(stale, [], 'docs catalog lists components that are not registered');
});

test('package metadata preserves the public release contract', async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );

  assert.equal(packageJson.name, 'ralma');
  assert.equal(packageJson.dependencies, undefined);
  assert.deepEqual(packageJson.peerDependencies, { ractive: '^1.4.4' });
  assert.deepEqual(packageJson.sideEffects, ['./bin/ralma.js', './bin/ralma.min.js']);
  assert.deepEqual(packageJson.exports['.'], {
    types: './types/index.d.ts',
    default: './src/index.js',
  });
  assert.equal(packageJson.exports['./browser'], './bin/ralma.js');
  assert.equal(packageJson.exports['./min'], './bin/ralma.min.js');
});

test('column renders only requested width modifiers', () => {
  const html = renderWithRealRactive('<column half></column>');

  assert.match(html, /\bis-half\b/);
  assert.doesNotMatch(html, /\bis-(?:1|2|3|4|5|6|7|8|9|10|11|12)\b/);
});

test('column supports numeric width and offset modifiers', () => {
  const html = renderWithRealRactive('<column 6 offset-3></column>');

  assert.match(html, /\bis-6\b/);
  assert.match(html, /\bis-offset-3\b/);
  assert.doesNotMatch(html, /\bis-5\b/);
  assert.doesNotMatch(html, /\bis-offset-4\b/);
});

test('columns renders container-level layout modifiers', () => {
  const html = renderWithRealRactive(
    '<columns multiline gapless mobile centered><column half></column></columns>',
  );

  assert.match(html, /^<div class="columns\b[^"]*\bis-multiline\b/);
  assert.match(html, /^<div class="columns\b[^"]*\bis-gapless\b/);
  assert.match(html, /^<div class="columns\b[^"]*\bis-mobile\b/);
  assert.match(html, /^<div class="columns\b[^"]*\bis-centered\b/);
  assert.match(html, /\bclass="column\b[^"]*\bis-half\b/);
  assert.doesNotMatch(html, /\bclass="column\b[^"]*\bis-multiline\b/);
  assert.doesNotMatch(html, /\bclass="column\b[^"]*\bis-gapless\b/);
});

test('registerRalma skips existing components by default', () => {
  const existingButton = { existing: true };
  const ractive = {
    components: {
      button: existingButton,
    },
    extend(def) {
      return def;
    },
  };

  registerRalma(ractive);

  assert.equal(ractive.components.button, existingButton);
  assert.equal(typeof ractive.components.navbar, 'object');
});

test('registerRalma can overwrite existing components', () => {
  const existingButton = { existing: true };
  const ractive = {
    components: {
      button: existingButton,
    },
    extend(def) {
      return { ...def, rewritten: true };
    },
  };

  registerRalma(ractive, { overwrite: true });

  assert.notEqual(ractive.components.button, existingButton);
  assert.equal(ractive.components.button.rewritten, true);
});

test('registerRalma can warn on component collisions', () => {
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (message) => warnings.push(String(message));

  try {
    const ractive = {
      components: {
        button: { existing: true },
      },
      extend(def) {
        return def;
      },
    };

    registerRalma(ractive, { warnOnCollision: true });
  } finally {
    console.warn = originalWarn;
  }

  assert.match(warnings.join('\n'), /skipping existing component "button"/);
});
