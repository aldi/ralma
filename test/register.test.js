import assert from 'node:assert/strict';
import test from 'node:test';
import Ractive from 'ractive';

import { componentNames, registerRalma } from '../src/index.js';

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
