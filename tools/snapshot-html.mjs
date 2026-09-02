// Renders every component twice — once with all modifier flags off, once with all of them on — and
// prints the HTML as JSON. Capture this before and after a template change and diff the two files;
// a behavior-preserving refactor must produce an empty diff.
//
//   npm run snapshot:html > before.json
//   # ...edit templates...
//   npm run snapshot:html > after.json
//   diff before.json after.json
import Ractive from 'ractive';

import { componentNames, registerRalma } from '../src/index.js';

Ractive.DEBUG = false;

// Register into a local map, not onto Ractive itself, so component lookups can't recurse.
const registry = { components: {}, extend: Ractive.extend.bind(Ractive) };
registerRalma(registry);
const components = registry.components;

// Every modifier flag used anywhere in the templates, so each `{{#flag}}` section renders.
const allFlags = [
  'white',
  'light',
  'dark',
  'black',
  'text',
  'ghost',
  'primary',
  'link',
  'info',
  'success',
  'warning',
  'danger',
  'small',
  'normal',
  'medium',
  'large',
  'outlined',
  'inverted',
  'rounded',
  'hovered',
  'focused',
  'loading',
  'static',
  'active',
  'centered',
  'right',
  'left',
  'arrow',
  'bullet',
  'dot',
  'succeeds',
  'fullwidth',
  'toggle',
  'boxed',
  'up',
  'hoverable',
  'transparent',
  'spaced',
  'fixedTop',
  'fixedBottom',
  'shadow',
  'expanded',
  'tab',
  'body',
  'clipped',
  'gapless',
  'multiline',
  'vcentered',
  'mobile',
  'tablet',
  'desktop',
  'widescreen',
  'fullhd',
  'touch',
  'narrow',
  'half',
  'one-third',
  'two-thirds',
  'one-quarter',
  'three-quarters',
  'disabled',
  'dropdown',
];

const stringProps = {
  id: 'the-id',
  class: 'extra-class',
  title: 'the-title',
  ariaLabel: 'the-aria-label',
  ariaControls: 'the-aria-controls',
  href: '/safe/path',
  buttonType: 'submit',
  src: '/img.png',
  alt: 'alt text',
  value: '42',
  name: 'the-name',
  page: '7',
};

/** @param {boolean} withFlags */
function renderAll(withFlags) {
  /** @type {Record<string, string>} */
  const out = {};
  /** @type {Record<string, unknown>} */
  const data = { ...stringProps };
  if (withFlags) for (const flag of allFlags) data[flag] = true;

  for (const name of componentNames) {
    const attrs = Object.keys(data)
      .map((key) => `${key}="{{${key}}}"`)
      .join(' ');
    const instance = new Ractive({
      template: `<${name} ${attrs}>INNER</${name}>`,
      data,
      components,
    });
    out[name] = instance.toHTML();
  }
  return out;
}

console.log(JSON.stringify({ off: renderAll(false), on: renderAll(true) }, null, 2));
