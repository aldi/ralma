## What does this change?

<!-- One or two sentences. Link the issue it closes, if any. -->

## Checklist

- [ ] `npm test` passes
- [ ] `npm run build` was run and the regenerated `bin/` files are **committed** (CI fails otherwise —
      this is the most common cause of a red build)
- [ ] `npm run lint`, `npm run typecheck`, and `npm run format:check` pass
- [ ] No new runtime dependencies (this package intentionally has zero)

## If this adds or changes a component

- [ ] The definition sets `isolated: true`
- [ ] If it renders an `href`: the name is in `hrefAwareComponentNames` and the template renders
      `{{safeHref}}`, not `{{href}}`
- [ ] `docs/src/data/ralmaCatalog.js` was updated to match

## Rendered output

<!-- For template changes, paste the before/after HTML. Behavior-preserving refactors should show an
     empty diff. -->
