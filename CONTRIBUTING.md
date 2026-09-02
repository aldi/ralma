# Contributing to Ralma

Thanks for helping out. Ralma is small on purpose — one source file, zero runtime dependencies — so
most contributions are focused and quick to review.

## Setup

```bash
git clone https://github.com/aldi/ralma.git
cd ralma
npm ci
npm test
```

Node 22 or newer. The repo ships a `.nvmrc` pinned to 24 (the active LTS); `nvm use` picks it up.

The documentation site in `docs/` is a separate Next.js app with its own lockfile and its own Node
version (`docs/.nvmrc`):

```bash
npm run docs:install
npm run docs:dev
```

## Before you open a pull request

```bash
npm test
npm run build          # regenerates bin/ — commit the result
npm run lint
npm run typecheck
npm run format
npm run size:check
```

`npm run prepack` runs the whole chain if you'd rather do it in one command.

**Commit the regenerated `bin/` files.** They are checked-in build artifacts served directly from
GitHub raw URLs and CDNs, and CI fails the build if they drift from `src/index.js`. This is the single
most common reason a PR goes red. `types/` is generated too, but is _not_ committed — it's gitignored
and regenerated at publish time.

## Adding a component

1. Add the definition to `componentDefinitions` in `src/index.js`. Follow the existing pattern:
   `isolated: true`, a template literal, and an optional `data()`.
2. **If it renders an `href`**, add its name to `hrefAwareComponentNames` and render `{{safeHref}}` in
   the template, never `{{href}}`. Skipping this bypasses the XSS sanitizer; see
   [SECURITY.md](SECURITY.md). A test guards against it.
3. Add an entry to `docs/src/data/ralmaCatalog.js`. A test asserts the catalog and the registered
   component list match exactly, in both directions.
4. Run the full check list above.

## Style

ESLint and Prettier own formatting — don't hand-tune it, run `npm run format`.

- `const` over `let`; never `var`
- strict equality (`===` / `!==`)
- template literals for Ractive templates
- every component definition sets `isolated: true`
- **no TypeScript source.** Types come from JSDoc annotations that `tsc` checks in `--checkJs` mode
  and emits `.d.ts` from. Add JSDoc, not `.ts` files.
- **no runtime dependencies.** devDependencies need a good reason; runtime dependencies need explicit
  approval.

Commit messages: capitalized, present tense — `Add pagination-link component`, not
`added pagination link`.

## Reporting bugs

Open an issue with a minimal reproduction: the template, the data you bound, and the HTML you got
versus what you expected. For security issues, follow [SECURITY.md](SECURITY.md) instead — don't file
a public issue.
