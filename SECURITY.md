# Security Policy

## Supported versions

Only the latest published release of `ralma` receives security fixes.

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

## Reporting a vulnerability

Please **do not open a public issue** for a security problem.

Report it privately through
[GitHub Security Advisories](https://github.com/aldi/ralma/security/advisories/new), or by email to
<aldiduzha@gmail.com>.

Include the affected component, a minimal reproduction (a template plus the data you bound to it),
and what an attacker gains. You should get an acknowledgement within a few days.

## Threat model

Ralma is a set of stateless Ractive component definitions wrapping Bulma markup. It has zero runtime
dependencies and does no network or filesystem I/O. The security-relevant surface is what its
templates render from caller-supplied data.

### What Ralma does protect against

**Dangerous URL schemes in `href`.** Components listed in the exported `hrefAwareComponentNames` set
route their `href` through an internal sanitizer before rendering. It rejects `javascript:`, `data:`,
and `vbscript:` URLs, case-insensitively, and it strips C0 control characters, space, and DEL before
testing the scheme — browsers ignore those characters inside a URL scheme, so
`java<TAB>script:alert(1)` would otherwise execute. A rejected `href` is dropped entirely, and the
component falls back to rendering a `<button>` rather than an anchor.

The sanitizer runs at init **and** on every later change to `href`, so rebinding a component to a
hostile URL after render is also covered.

### What Ralma does **not** protect against

- **Content passed through `{{yield}}`.** Ralma renders yielded content as-is. If you interpolate
  untrusted HTML into a Ractive template with triple-stache (`{{{ ... }}}`) and yield it into a Ralma
  component, that is an XSS in your application. Ractive's default double-stache escaping is what
  protects you there, not Ralma.
- **Other attributes.** Only `href` is sanitized. `class`, `id`, `title`, `ariaLabel`, `ariaControls`,
  and similar are rendered through Ractive's normal attribute escaping and are not scheme-checked.
- **A component you add yourself.** A new component that renders an `href` but is not added to
  `hrefAwareComponentNames` skips sanitizing entirely. The test suite has a guard that fails in this
  case; do not disable it.
- **Server-side or non-browser rendering contexts**, which are outside what these templates target.
