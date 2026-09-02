<img src="https://raw.githubusercontent.com/aldi/ralma/master/logo.png" alt="ralma_logo" width="200px"/>

## Ralma - Stateless Ractive Components for Bulma

[![npm](https://img.shields.io/npm/v/%40aldi%2Fralma)](https://www.npmjs.com/package/@aldi/ralma)
[![CI](https://github.com/aldi/ralma/actions/workflows/ci.yml/badge.svg)](https://github.com/aldi/ralma/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/%40aldi%2Fralma)](LICENSE)

This Ractive plugin provides helper shortcuts for most Bulma widgets.
The goal of this plugin is to help you get started quickly and reduce the overly verbose code that Bulma tends to produce.
It does not attempt to cover everything in Bulma, but rather offer the most common elements as shortcuts.
Sometimes, when you want something more specific or fancy, you can still use the original Bulma markup.

## Install

```bash
npm install @aldi/ralma
```

```js
import Ractive from 'ractive';
import { registerRalma } from '@aldi/ralma';

registerRalma(Ractive);
```

Package-based projects require Node 22 or newer and Ractive 1.4.4 or newer. Components use Bulma
1.x classes; load Bulma CSS separately.

`registerRalma` skips names already present on `Ractive.components`; pass `{ overwrite: true }` to
replace them, or `{ warnOnCollision: true }` to log the ones it skipped.

**Or download the browser bundle**, which registers every component against `window.Ractive` on load:

_Debug_: [bin/ralma.js](https://raw.githubusercontent.com/aldi/ralma/master/bin/ralma.js)

_Minified_: [bin/ralma.min.js](https://raw.githubusercontent.com/aldi/ralma/master/bin/ralma.min.js)

## Documentation

The [documentation site](https://aldi.github.io/ralma/) covers all 61 components, installation,
registration options, link safety, and focused examples. Run it locally with:

```bash
npm run docs:install
npm run docs:dev
```

A typical header would look like this:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ralma!</title>
  <!-- Bulma CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1/css/bulma.min.css" />
  <!-- Ractive Framework -->
  <script src="https://cdn.jsdelivr.net/npm/ractive"></script>
  <!-- Ralma Plugin -->
  <script src="ralma.min.js"></script>
</head>
```

## License

Code released under [the MIT license](https://github.com/aldi/ralma/blob/master/LICENSE).
