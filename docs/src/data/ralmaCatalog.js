const groupHrefById = {
  elements: '/docs/elements',
  columns: '/docs/columns',
};

export const groupIconById = {
  elements: 'fa-hand-pointer',
  columns: 'fa-table-columns',
  breadcrumb: 'fa-route',
  card: 'fa-id-card',
  dropdown: 'fa-caret-down',
  menu: 'fa-list',
  message: 'fa-message',
  modal: 'fa-window-maximize',
  navbar: 'fa-bars',
  pagination: 'fa-ellipsis',
  panel: 'fa-table-cells',
  tabs: 'fa-folder-open',
};

export const accentHues = [
  'hsl(39 100% 57%)',
  'hsl(206 70% 53%)',
  'hsl(141 53% 53%)',
  'hsl(348 86% 61%)',
  'hsl(171 100% 41%)',
  'hsl(271 100% 71%)',
];

export const componentGroups = [
  {
    id: 'elements',
    title: 'Elements',
    description: 'Common single-element helpers from Bulma.',
    items: ['button', 'content'],
  },
  {
    id: 'columns',
    title: 'Columns',
    description: 'Responsive layout helpers based on Bulma columns.',
    items: ['columns', 'column'],
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'Navigation trail and breadcrumb items.',
    items: ['breadcrumb', 'breadcrumb-item'],
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Card container and card sub-parts.',
    items: [
      'card',
      'card-header',
      'card-header-title',
      'card-header-icon',
      'card-image',
      'card-content',
      'card-footer',
      'card-footer-item',
    ],
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description: 'Dropdown wrapper, trigger, menu, and content helpers.',
    items: [
      'dropdown',
      'dropdown-trigger',
      'dropdown-button',
      'dropdown-item',
      'dropdown-menu',
      'dropdown-content',
      'dropdown-divider',
    ],
  },
  {
    id: 'menu',
    title: 'Menu',
    description: 'Side menu labels and item lists.',
    items: ['menu', 'menu-label', 'menu-list'],
  },
  {
    id: 'message',
    title: 'Message',
    description: 'Message wrapper with header and body.',
    items: ['message', 'message-header', 'message-body'],
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Modal shell, close, and modal-card helpers.',
    items: [
      'modal',
      'modal-background',
      'modal-content',
      'modal-close',
      'modal-card',
      'modal-card-head',
      'modal-card-title',
      'modal-card-body',
      'modal-card-foot',
    ],
  },
  {
    id: 'navbar',
    title: 'Navbar',
    description: 'Navbar structure and dropdown parts.',
    items: [
      'navbar',
      'navbar-brand',
      'navbar-burger',
      'navbar-menu',
      'navbar-start',
      'navbar-end',
      'navbar-item',
      'navbar-item-dropdown',
      'navbar-link',
      'navbar-dropdown',
      'navbar-divider',
    ],
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description: 'Pagination wrappers and links.',
    items: [
      'pagination',
      'pagination-previous',
      'pagination-next',
      'pagination-list',
      'pagination-link',
      'pagination-ellipsis',
    ],
  },
  {
    id: 'panel',
    title: 'Panel',
    description: 'Panel shell, tabs, blocks, and icon helper.',
    items: ['panel', 'panel-heading', 'panel-tabs', 'panel-block', 'panel-icon'],
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Tabs container and tab links.',
    items: ['tabs', 'tab', 'tab-link'],
  },
];

export const allComponentNames = componentGroups.flatMap((group) => group.items);

export const bulmaSupportSections = [
  {
    id: 'columns',
    title: 'Columns',
    href: 'https://bulma.io/documentation/columns/',
    items: [
      {
        id: 'columns',
        title: 'Columns',
        href: 'https://bulma.io/documentation/columns/',
        tags: ['columns', 'column'],
      },
    ],
  },
  {
    id: 'elements',
    title: 'Elements',
    href: 'https://bulma.io/documentation/elements/',
    items: [
      {
        id: 'button',
        title: 'Button',
        href: 'https://bulma.io/documentation/elements/button/',
        tags: ['button'],
      },
      {
        id: 'content',
        title: 'Content',
        href: 'https://bulma.io/documentation/elements/content/',
        tags: ['content'],
      },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    href: 'https://bulma.io/documentation/components/',
    items: [
      {
        id: 'breadcrumb',
        title: 'Breadcrumb',
        href: 'https://bulma.io/documentation/components/breadcrumb/',
        tags: ['breadcrumb', 'breadcrumb-item'],
      },
      {
        id: 'card',
        title: 'Card',
        href: 'https://bulma.io/documentation/components/card/',
        tags: [
          'card',
          'card-header',
          'card-header-title',
          'card-header-icon',
          'card-image',
          'card-content',
          'card-footer',
          'card-footer-item',
        ],
      },
      {
        id: 'dropdown',
        title: 'Dropdown',
        href: 'https://bulma.io/documentation/components/dropdown/',
        tags: [
          'dropdown',
          'dropdown-trigger',
          'dropdown-button',
          'dropdown-item',
          'dropdown-menu',
          'dropdown-content',
          'dropdown-divider',
        ],
      },
      {
        id: 'menu',
        title: 'Menu',
        href: 'https://bulma.io/documentation/components/menu/',
        tags: ['menu', 'menu-label', 'menu-list'],
      },
      {
        id: 'message',
        title: 'Message',
        href: 'https://bulma.io/documentation/components/message/',
        tags: ['message', 'message-header', 'message-body'],
      },
      {
        id: 'modal',
        title: 'Modal',
        href: 'https://bulma.io/documentation/components/modal/',
        tags: [
          'modal',
          'modal-background',
          'modal-content',
          'modal-close',
          'modal-card',
          'modal-card-head',
          'modal-card-title',
          'modal-card-body',
          'modal-card-foot',
        ],
      },
      {
        id: 'navbar',
        title: 'Navbar',
        href: 'https://bulma.io/documentation/components/navbar/',
        tags: [
          'navbar',
          'navbar-brand',
          'navbar-burger',
          'navbar-menu',
          'navbar-start',
          'navbar-end',
          'navbar-item',
          'navbar-item-dropdown',
          'navbar-link',
          'navbar-dropdown',
          'navbar-divider',
        ],
      },
      {
        id: 'pagination',
        title: 'Pagination',
        href: 'https://bulma.io/documentation/components/pagination/',
        tags: [
          'pagination',
          'pagination-previous',
          'pagination-next',
          'pagination-list',
          'pagination-link',
          'pagination-ellipsis',
        ],
      },
      {
        id: 'panel',
        title: 'Panel',
        href: 'https://bulma.io/documentation/components/panel/',
        tags: ['panel', 'panel-heading', 'panel-tabs', 'panel-block', 'panel-icon'],
      },
      {
        id: 'tabs',
        title: 'Tabs',
        href: 'https://bulma.io/documentation/components/tabs/',
        tags: ['tabs', 'tab', 'tab-link'],
      },
    ],
  },
];

export const bulmaSupportEntryCount = bulmaSupportSections.reduce(
  (total, section) => total + section.items.length,
  0,
);

const componentDocDetailsById = {
  columns: {
    summary: 'Responsive column layout wrappers for flexible two-column and multi-column screens.',
    snippet: `<columns multiline>
  <column half>
    <div class="box">Main content</div>
  </column>
  <column half>
    <div class="box">Secondary content</div>
  </column>
</columns>`,
    highlights: [
      'Use fractions like `half`, `one-third`, and `two-thirds` on `<column>`.',
      'Use numeric widths such as `6` and `offset-3` for grid precision.',
      'Use responsive variants like `half-mobile` and `one-third-desktop`.',
    ],
  },
  button: {
    summary: 'Bulma button wrapper with style modifiers and safe href fallback behavior.',
    snippet: `<button primary large>Primary action</button>
<button outlined>Secondary action</button>
<button href="/docs/getting-started">Safe anchor mode</button>`,
    highlights: [
      'Renders `<a>` when `href` is safe and present.',
      'Falls back to `<button>` for unsafe or empty `href` values.',
      'Supports Bulma states such as `loading`, `active`, and `rounded`.',
    ],
  },
  content: {
    summary: 'Semantic rich-text wrapper using Bulma content typography classes.',
    snippet: `<content>
  <h3>Release Notes</h3>
  <p>Wrap CMS or markdown output in a single component.</p>
  <ul>
    <li>Headings</li>
    <li>Paragraphs</li>
    <li>Lists</li>
  </ul>
</content>`,
    highlights: [
      'Applies Bulma typography defaults to nested semantic HTML.',
      'Useful for markdown renderer or CMS output blocks.',
      'Supports size modifiers (`small`, `medium`, `large`).',
    ],
  },
  breadcrumb: {
    summary: 'Navigation trail helpers for breadcrumb wrappers and items.',
    snippet: `<breadcrumb arrow>
  <breadcrumb-item><a href="/">Ralma</a></breadcrumb-item>
  <breadcrumb-item><a href="/docs">Documentation</a></breadcrumb-item>
  <breadcrumb-item active><a aria-current="page">Breadcrumb</a></breadcrumb-item>
</breadcrumb>`,
    highlights: [
      'Separator variants: `arrow`, `bullet`, `dot`, and `succeeds`.',
      'Alignment and sizing options map to Bulma classes.',
      'Mark active trail step with `<breadcrumb-item active>`.',
    ],
  },
  card: {
    summary: 'Card container plus all card sub-components for structured content blocks.',
    snippet: `<card>
  <card-header>
    <card-header-title>Server status</card-header-title>
    <card-header-icon ariaLabel="more options">
      <span class="icon"><i class="fas fa-angle-down"></i></span>
    </card-header-icon>
  </card-header>
  <card-content>
    <content><p>All systems operational.</p></content>
  </card-content>
  <card-footer>
    <card-footer-item href="/details">Details</card-footer-item>
    <card-footer-item>Dismiss</card-footer-item>
  </card-footer>
</card>`,
    highlights: [
      'Includes every major Bulma card section as standalone tags.',
      '`<card-footer-item>` supports safe link rendering.',
      'Compose image, header, content, and footer without extra wrappers.',
    ],
  },
  dropdown: {
    summary: 'Dropdown primitives covering trigger, menu, content, and dropdown items.',
    snippet: `<dropdown active>
  <dropdown-trigger>
    <dropdown-button>Actions</dropdown-button>
  </dropdown-trigger>
  <dropdown-menu>
    <dropdown-content>
      <dropdown-item active href="/edit">Edit</dropdown-item>
      <dropdown-item href="/duplicate">Duplicate</dropdown-item>
      <dropdown-divider></dropdown-divider>
      <dropdown-item href="/archive">Archive</dropdown-item>
    </dropdown-content>
  </dropdown-menu>
</dropdown>`,
    highlights: [
      'Set `active` on `<dropdown>` to open the menu.',
      '`<dropdown-button>` includes the angle icon and `aria-haspopup`.',
      '`<dropdown-item>` keeps safe link handling and active state support, and renders a focusable `<button>` when it has no `href`.',
    ],
  },
  menu: {
    summary: 'Sidebar menu wrappers for labels and grouped menu lists.',
    snippet: `<menu>
  <menu-label>General</menu-label>
  <menu-list>
    <li><a class="is-active">Dashboard</a></li>
    <li><a>Customers</a></li>
  </menu-list>
  <menu-label>Administration</menu-label>
  <menu-list>
    <li><a>Team Settings</a></li>
  </menu-list>
</menu>`,
    highlights: [
      'Use `<menu-label>` for section titles.',
      'Use `<menu-list>` for grouped list navigation.',
      'Pairs well with static left-side admin layouts.',
    ],
  },
  message: {
    summary: 'Contextual message blocks with independent header and body tags.',
    snippet: `<message info>
  <message-header>
    <p>Status</p>
  </message-header>
  <message-body>
    Deployment completed successfully.
  </message-body>
</message>`,
    highlights: [
      'Color modifiers include `info`, `success`, `warning`, and `danger`.',
      'Header and body are explicit tags for clearer structure.',
      'Supports Bulma size variants (`small`, `medium`, `large`).',
    ],
  },
  modal: {
    summary: 'Modal shell and modal-card helpers for dialog and confirmation flows.',
    snippet: `<modal active>
  <modal-background></modal-background>
  <modal-card>
    <modal-card-head>
      <modal-card-title>Delete item?</modal-card-title>
      <modal-close ariaLabel="close"></modal-close>
    </modal-card-head>
    <modal-card-body>
      This action cannot be undone.
    </modal-card-body>
    <modal-card-foot>
      <button danger>Delete</button>
      <button>Cancel</button>
    </modal-card-foot>
  </modal-card>
</modal>`,
    highlights: [
      'Use `active` on `<modal>` to toggle visible state.',
      'Includes `modal-card` family tags for full dialog structure.',
      '`<modal-close>` supports size modifiers and `ariaLabel`.',
    ],
  },
  navbar: {
    summary: 'Navbar wrappers for brand area, menus, dropdowns, and link entries.',
    snippet: `<navbar light>
  <navbar-brand>
    <navbar-item href="/">Ralma</navbar-item>
    <navbar-burger active dataTarget="main-nav"></navbar-burger>
  </navbar-brand>
  <navbar-menu id="main-nav" active>
    <navbar-start>
      <navbar-item href="/docs">Docs</navbar-item>
      <navbar-item-dropdown hoverable>
        <navbar-link>More</navbar-link>
        <navbar-dropdown>
          <navbar-item href="/docs/components">Components</navbar-item>
          <navbar-divider></navbar-divider>
          <navbar-item href="/docs/api">API</navbar-item>
        </navbar-dropdown>
      </navbar-item-dropdown>
    </navbar-start>
  </navbar-menu>
</navbar>`,
    highlights: [
      'Covers full navbar hierarchy from brand to dropdown children.',
      '`<navbar-item>` and `<navbar-link>` support safe href behavior.',
      '`<navbar-burger>` defaults to `button` for accessibility.',
    ],
  },
  pagination: {
    summary: 'Pagination wrappers for previous/next links, list items, and ellipsis.',
    snippet: `<pagination centered rounded ariaLabel="pagination">
  <pagination-previous href="/page/1">Previous</pagination-previous>
  <pagination-next href="/page/3">Next page</pagination-next>
  <pagination-list>
    <li><pagination-link page="1" href="/page/1">1</pagination-link></li>
    <li><pagination-ellipsis></pagination-ellipsis></li>
    <li><pagination-link current page="2" href="/page/2">2</pagination-link></li>
  </pagination-list>
</pagination>`,
    highlights: [
      'Alignment and size modifiers are available on `<pagination>`.',
      '`<pagination-link current>` sets current page semantics.',
      'Pass `page` for an automatic `aria-label`, or `ariaLabel` to write your own.',
      'Previous/next tags handle disabled and safe href states.',
    ],
  },
  panel: {
    summary: 'Panel wrappers for heading, tabs, items, and icon slots.',
    snippet: `<panel primary>
  <panel-heading>Repository</panel-heading>
  <panel-tabs>
    <a class="is-active">All</a>
    <a>Open</a>
    <a>Closed</a>
  </panel-tabs>
  <panel-block active>
    <panel-icon><i class="fas fa-book" aria-hidden="true"></i></panel-icon>
    ralma
  </panel-block>
  <panel-block href="/issues">
    <panel-icon><i class="fas fa-bug" aria-hidden="true"></i></panel-icon>
    Issues
  </panel-block>
</panel>`,
    highlights: [
      'Color variants map directly to Bulma panel modifiers.',
      '`<panel-block>` supports active and safe href rendering.',
      '`<panel-icon>` wraps icon slots with the expected class.',
    ],
  },
  tabs: {
    summary: 'Tabs wrappers for tab list, tab item, and tab link controls.',
    snippet: `<tabs boxed>
  <tab active>
    <tab-link href="#overview">Overview</tab-link>
  </tab>
  <tab>
    <tab-link href="#details">Details</tab-link>
  </tab>
  <tab>
    <tab-link>History</tab-link>
  </tab>
</tabs>`,
    highlights: [
      'Supports boxed, toggle, fullwidth, and size variants.',
      '`<tab active>` marks the selected tab item.',
      '`<tab-link>` uses safe anchor mode or button mode automatically.',
    ],
  },
};

export const supportedComponentPages = bulmaSupportSections.flatMap((section) =>
  section.items.map((item) => {
    const details = componentDocDetailsById[item.id];
    return {
      id: item.id,
      slug: item.id,
      title: item.title,
      sectionId: section.id,
      sectionTitle: section.title,
      bulmaHref: item.href,
      tags: item.tags,
      href: `/docs/components/${item.id}`,
      summary: details?.summary || `${item.title} wrapper for Bulma markup.`,
      snippet: details?.snippet || `<${item.tags[0]}>${item.title}</${item.tags[0]}>`,
      highlights: details?.highlights || [],
      icon: groupIconById[item.id] || groupIconById[section.id] || 'fa-cube',
    };
  }),
);

export const supportedComponentBySlug = Object.fromEntries(
  supportedComponentPages.map((entry) => [entry.slug, entry]),
);

export const docsSections = [
  {
    href: '/docs/getting-started',
    title: 'Getting Started',
    description: 'Install, register components, and render your first template.',
    icon: 'fa-rocket',
  },
  {
    href: '/docs/components',
    title: 'Components',
    description: 'Examples for the supported component families.',
    icon: 'fa-cubes',
  },
  {
    href: '/docs/elements',
    title: 'Elements',
    description: 'Details for button and content components.',
    icon: 'fa-hand-pointer',
  },
  {
    href: '/docs/columns',
    title: 'Columns',
    description: 'Layout recipes with columns and column.',
    icon: 'fa-columns',
  },
  {
    href: '/docs/api',
    title: 'API',
    description: 'Registration options, collision handling, and exported names.',
    icon: 'fa-code',
  },
];

export const docsSectionVisuals = docsSections.map((section, index) => ({
  code: `section-${section.title.toLowerCase().replace(/\s+/g, '-')}`,
  name: section.title,
  href: section.href,
  icon: section.icon,
  hsl: accentHues[(index + 2) % accentHues.length],
}));

const componentGroupVisuals = componentGroups.map((group, index) => ({
  code: `group-${group.id}`,
  name: group.title,
  href: groupHrefById[group.id] || '/docs/components',
  icon: groupIconById[group.id] || 'fa-cube',
  hsl: accentHues[index % accentHues.length],
}));

export const docsVisuals = [...componentGroupVisuals, ...docsSectionVisuals];

export const snippets = {
  install: `npm install @aldi/ralma`,
  browserHeader: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1/css/bulma.min.css" />
<script src="https://cdn.jsdelivr.net/npm/ractive"></script>
<script src="/path/to/ralma.min.js"></script>`,
  esm: `import Ractive from 'ractive';
import { registerRalma } from '@aldi/ralma';

registerRalma(Ractive);

new Ractive({
  target: '#app',
  template: '<button primary>Save</button>'
});`,
  registerOptions: `registerRalma(Ractive, {
  overwrite: false,
  warnOnCollision: true,
});`,
  button: `<button primary large>Primary button</button>
<button outlined>Secondary action</button>
<button href="/docs/getting-started">As link</button>`,
  content: `<content>
  <h3>Rich text block</h3>
  <p>Use Bulma content styles around semantic HTML.</p>
  <ul>
    <li>Markdown output</li>
    <li>CMS content</li>
  </ul>
</content>`,
  columns: `<columns>
  <column half>
    <div class="box">Main</div>
  </column>
  <column>
    <div class="box">Sidebar</div>
  </column>
</columns>`,
  componentsExample: `<modal active>
  <modal-background></modal-background>
  <modal-card>
    <modal-card-head>
      <modal-card-title>Delete item?</modal-card-title>
      <modal-close ariaLabel="close"></modal-close>
    </modal-card-head>
    <modal-card-foot>
      <button danger>Delete</button>
      <button>Cancel</button>
    </modal-card-foot>
  </modal-card>
</modal>`,
};
