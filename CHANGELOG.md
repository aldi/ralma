# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-02

### Security

- **Fixed an XSS bypass in the `href` sanitizer.** The scheme check only skipped _leading_ whitespace,
  so control characters embedded inside the scheme survived it — browsers ignore those when parsing a
  URL, meaning `java<TAB>script:alert(1)` rendered as a live anchor and executed. C0 control
  characters, space, and DEL are now stripped before the scheme test. Affected every component in
  `hrefAwareComponentNames` wherever an application bound a user-controlled `href`.
- Added `SECURITY.md` documenting the reporting process and the sanitizer's threat model, including
  what it explicitly does not cover (`{{yield}}` content, non-`href` attributes).

### Added

- Documentation site rebuilt as a Next.js static export in `docs/`, replacing the hand-written HTML
  demo pages.
- TypeScript declarations, generated from JSDoc via `tsc` and shipped in the npm tarball. Source
  stays plain JavaScript.
- `npm run typecheck`, `npm run lint`, `npm run test:coverage`, and `npm run size:check`.
- ESLint flat config and Prettier, replacing the homegrown formatting scripts.
- GitHub Actions: a Node 22/24/26 test matrix, a docs build job, a GitHub Pages deploy workflow, an
  npm release workflow with provenance, and Dependabot for npm (root and docs) plus Actions.
- `hrefAwareComponentNames` is now exported, so consumers and tests can see which components sanitize
  their `href`.
- Test coverage for the sanitizer across every href-aware component, plus two guard tests: one that
  fails if a component renders an `href` without being registered as href-aware, and one that fails if
  the docs catalog drifts from the registered component list.
- A post-build assertion that evaluates each generated bundle against a stub Ractive and verifies
  every component registers — the regex-based export stripping could previously emit a syntactically
  valid but empty bundle undetected.
- Package metadata for publishing: `keywords`, `homepage`, `bugs`, `author`, explicit side-effectful
  browser bundles, `publishConfig`, and a `types` entry in the `exports` map.

### Accessibility

- `dropdown-item` now renders a `<button>` when it has no `href`. It previously rendered an `<a>` with
  no `href`, which is not keyboard-focusable, while still carrying an `on-click` — the action was
  mouse-only.
- `dropdown-menu` no longer sets `role="menu"` by default. A menu role commits to `role="menuitem"`
  children and arrow-key focus management; Ralma ships no behavior, and an announced menu that ignores
  arrow keys is worse for assistive tech than a plain container. Pass `role` to opt back in.
- `pagination-link` accepts a `page` property and derives `aria-label="Goto page N"` from it. An
  explicit `ariaLabel` still wins, and the attribute is omitted entirely when neither is given rather
  than rendered empty.

### Fixed

- `npm run format:check` crashed with an unhandled `ENOENT` on files that git tracked but that were
  absent from the working tree, which broke `prepack` and therefore `npm publish`.
- The CI artifact check could never pass: the fallback minifier ran after esbuild and overwrote
  `bin/ralma.min.js` with different bytes. The build order is now load-bearing and commented as such.
- Committed `bin/` bundles were stale relative to `src/index.js`.

### Changed

- Duplicated Bulma modifier chains in the `button`, `navbar`, `message`, and `panel` templates are now
  composed from shared lists. Rendered HTML is byte-identical for all 61 components, verified with
  `npm run snapshot:html`.
- `package-lock.json` is now committed and CI installs with `npm ci`.

[Unreleased]: https://github.com/aldi/ralma/compare/1.0.0...HEAD
[1.0.0]: https://github.com/aldi/ralma/compare/0.3.0...1.0.0
