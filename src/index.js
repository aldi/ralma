const REGISTRY_MARKER =
  typeof Symbol === 'function' ? Symbol.for('ralma.__registered__') : '__ralma_registered__';
const UNSAFE_HREF_SCHEME_PATTERN = /^\s*(?:javascript|data|vbscript):/i;
const hrefAwareComponentNames = new Set([
  'button',
  'card-footer-item',
  'dropdown-item',
  'navbar-item',
  'navbar-link',
  'pagination-previous',
  'pagination-next',
  'pagination-link',
  'panel-block',
  'tab-link',
]);

const buttonTemplate = `
{{#if safeHref}}
  <a
    class="button {{#white}}is-white{{/}} {{#light}}is-light{{/}} {{#dark}}is-dark{{/}} {{#black}}is-black{{/}} {{#text}}is-text{{/}} {{#primary}}is-primary{{/}} {{#link}}is-link{{/}} {{#info}}is-info{{/}} {{#success}}is-success{{/}} {{#warning}}is-warning{{/}} {{#danger}}is-danger{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{#outlined}}is-outlined{{/}} {{#inverted}}is-inverted{{/}} {{#rounded}}is-rounded{{/}} {{#hovered}}is-hovered{{/}} {{#focused}}is-focused{{/}} {{#loading}}is-loading{{/}} {{#static}}is-static{{/}} {{#active}}is-active{{/}} {{class}}"
    {{#if id}}id="{{id}}"{{/if}}
    {{#if title}}title="{{title}}"{{/if}}
    {{#if disabled}}aria-disabled="true" tabindex="-1"{{/if}}
    {{#if dropdown}}aria-haspopup="true"{{/if}}
    {{#if ariaControls}}aria-controls="{{ariaControls}}"{{/if}}
    {{#if safeHref}}{{#if disabled}}{{else}}href="{{safeHref}}"{{/if}}{{/if}}
  >{{yield}}</a>
{{else}}
  <button
    type="{{buttonType}}"
    class="button {{#white}}is-white{{/}} {{#light}}is-light{{/}} {{#dark}}is-dark{{/}} {{#black}}is-black{{/}} {{#text}}is-text{{/}} {{#primary}}is-primary{{/}} {{#link}}is-link{{/}} {{#info}}is-info{{/}} {{#success}}is-success{{/}} {{#warning}}is-warning{{/}} {{#danger}}is-danger{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{#outlined}}is-outlined{{/}} {{#inverted}}is-inverted{{/}} {{#rounded}}is-rounded{{/}} {{#hovered}}is-hovered{{/}} {{#focused}}is-focused{{/}} {{#loading}}is-loading{{/}} {{#static}}is-static{{/}} {{#active}}is-active{{/}} {{class}}"
    {{#if id}}id="{{id}}"{{/if}}
    {{#if title}}title="{{title}}"{{/if}}
    {{#if disabled}}disabled{{/if}}
    {{#if dropdown}}aria-haspopup="true"{{/if}}
    {{#if ariaControls}}aria-controls="{{ariaControls}}"{{/if}}
  >{{yield}}</button>
	{{/if}}
	`.trim();

const componentDefinitions = {
  button: {
    isolated: true,
    data() {
      return {
        buttonType: 'button',
      };
    },
    template: buttonTemplate,
  },

  // Breadcrumb
  breadcrumb: {
    isolated: true,
    template: `
      <nav
        class="breadcrumb {{#centered}}is-centered{{/}} {{#right}}is-right{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{#arrow}}has-arrow-separator{{/}} {{#bullet}}has-bullet-separator{{/}} {{#dot}}has-dot-separator{{/}} {{#succeeds}}has-succeeds-separator{{/}} {{class}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}breadcrumbs{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
      >
        <ul>{{yield}}</ul>
      </nav>
    `.trim(),
  },
  'breadcrumb-item': {
    isolated: true,
    template: `
      <li class="{{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </li>
    `.trim(),
  },

  // Card
  card: {
    isolated: true,
    template: `<div class="card {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'card-header': {
    isolated: true,
    template: `<header class="card-header {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</header>`,
  },
  'card-header-title': {
    isolated: true,
    template: `<p class="card-header-title {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`,
  },
  'card-header-icon': {
    isolated: true,
    template: `
      <button
        type="button"
        class="card-header-icon {{class}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}more options{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if onclick}}on-click="{{onclick}}"{{/if}}
      >{{yield}}</button>
    `.trim(),
  },
  'card-image': {
    isolated: true,
    template: `<div class="card-image {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'card-content': {
    isolated: true,
    template: `<div class="card-content {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'card-footer': {
    isolated: true,
    template: `<footer class="card-footer {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</footer>`,
  },
  'card-footer-item': {
    isolated: true,
    template: `
      {{#if safeHref}}
        <a class="card-footer-item {{class}}" href="{{safeHref}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <div class="card-footer-item {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>
      {{/if}}
    `.trim(),
  },

  // Dropdowns (beta)
  dropdown: {
    isolated: true,
    template: "<div class='dropdown {{#active}}is-active{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>",
  },
  'dropdown-trigger': {
    isolated: true,
    template:
      "<div class='dropdown-trigger {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>",
  },
  'dropdown-button': {
    isolated: true,
    template:
      "<button type='button' class='button {{class}}' {{#if id}} id='{{id}}' {{/if}} aria-haspopup='true' {{#if ariaControls}}aria-controls='{{ariaControls}}'{{/if}}><span>{{yield}}</span><span class='icon is-small'><i class='fas fa-angle-down' aria-hidden='true'></i></span></button>",
  },
  'dropdown-item': {
    isolated: true,
    template:
      "<a {{#if safeHref}} href='{{safeHref}}' {{/if}} class='dropdown-item {{class}} {{#active}}is-active{{/}}' {{#if id}} id='{{id}}' {{/if}} {{#if onclick}} on-click='{{onclick}}' {{/if}}>{{yield}}</a>",
  },
  'dropdown-menu': {
    isolated: true,
    template:
      "<div class='dropdown-menu {{class}}' {{#if id}} id='{{id}}' {{/if}} role='{{#if role}}{{role}}{{else}}menu{{/if}}'>{{yield}}</div>",
  },
  'dropdown-content': {
    isolated: true,
    template:
      "<div class='dropdown-content {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>",
  },
  'dropdown-divider': {
    isolated: true,
    template: "<hr class='dropdown-divider {{class}}' {{#if id}} id='{{id}}' {{/if }}>",
  },

  // Menu
  menu: {
    isolated: true,
    template: `<aside class="menu {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</aside>`,
  },
  'menu-label': {
    isolated: true,
    template: `<p class="menu-label {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`,
  },
  'menu-list': {
    isolated: true,
    template: `<ul class="menu-list {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</ul>`,
  },

  // Message
  message: {
    isolated: true,
    template: `
      <article class="message {{#primary}}is-primary{{/}} {{#link}}is-link{{/}} {{#info}}is-info{{/}} {{#success}}is-success{{/}} {{#warning}}is-warning{{/}} {{#danger}}is-danger{{/}} {{#dark}}is-dark{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </article>
    `.trim(),
  },
  'message-header': {
    isolated: true,
    template: `<div class="message-header {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'message-body': {
    isolated: true,
    template: `<div class="message-body {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },

  // Modal
  modal: {
    isolated: true,
    template: `<div class="modal {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'modal-background': {
    isolated: true,
    template: `<div class="modal-background {{class}}" {{#if id}}id="{{id}}"{{/if}}></div>`,
  },
  'modal-content': {
    isolated: true,
    template: `<div class="modal-content {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'modal-close': {
    isolated: true,
    template: `
      <button
        type="button"
        class="modal-close {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}close{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if onclick}}on-click="{{onclick}}"{{/if}}
      ></button>
    `.trim(),
  },
  'modal-card': {
    isolated: true,
    template: `<div class="modal-card {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'modal-card-head': {
    isolated: true,
    template: `<header class="modal-card-head {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</header>`,
  },
  'modal-card-title': {
    isolated: true,
    template: `<p class="modal-card-title {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`,
  },
  'modal-card-body': {
    isolated: true,
    template: `<section class="modal-card-body {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</section>`,
  },
  'modal-card-foot': {
    isolated: true,
    template: `<footer class="modal-card-foot {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</footer>`,
  },

  // Navbar
  navbar: {
    isolated: true,
    template: `
      <nav
        class="navbar {{#transparent}}is-transparent{{/}} {{#spaced}}is-spaced{{/}} {{#fixed-top}}is-fixed-top{{/}} {{#fixed-bottom}}is-fixed-bottom{{/}} {{#white}}is-white{{/}} {{#light}}is-light{{/}} {{#dark}}is-dark{{/}} {{#black}}is-black{{/}} {{#text}}is-text{{/}} {{#primary}}is-primary{{/}} {{#link}}is-link{{/}} {{#info}}is-info{{/}} {{#success}}is-success{{/}} {{#warning}}is-warning{{/}} {{#danger}}is-danger{{/}} {{class}}"
        role="{{#if role}}{{role}}{{else}}navigation{{/if}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}main navigation{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
      >
        {{yield}}
      </nav>
    `.trim(),
  },
  'navbar-brand': {
    isolated: true,
    template: `<div class="navbar-brand {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'navbar-burger': {
    isolated: true,
    template: `
      <button
        type="button"
        class="navbar-burger {{#active}}is-active{{/}} {{class}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}menu{{/if}}"
        aria-expanded="{{#if expanded}}true{{else}}false{{/if}}"
        {{#if dataTarget}}data-target="{{dataTarget}}"{{/if}}
        {{#if id}}id="{{id}}"{{/if}}
        {{#if onclick}}on-click="{{onclick}}"{{/if}}
      >{{yield}}</button>
    `.trim(),
  },
  'navbar-menu': {
    isolated: true,
    template: `<div class="navbar-menu {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'navbar-start': {
    isolated: true,
    template: `<div class="navbar-start {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'navbar-end': {
    isolated: true,
    template: `<div class="navbar-end {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`,
  },
  'navbar-item': {
    isolated: true,
    template: `
      {{#if safeHref}}
        <a
          class="navbar-item {{#active}}is-active{{/}} {{class}}"
          href="{{safeHref}}"
          {{#if id}}id="{{id}}"{{/if}}
          {{#if onclick}}on-click="{{onclick}}"{{/if}}
        >{{yield}}</a>
      {{else}}
        <div class="navbar-item {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>
      {{/if}}
    `.trim(),
  },
  'navbar-item-dropdown': {
    isolated: true,
    template: `
      <div class="navbar-item has-dropdown {{#active}}is-active{{/}} {{#hoverable}}is-hoverable{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </div>
    `.trim(),
  },
  'navbar-link': {
    isolated: true,
    template: `
      {{#if safeHref}}
        <a class="navbar-link {{#active}}is-active{{/}} {{class}}" href="{{safeHref}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <button type="button" class="navbar-link {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</button>
      {{/if}}
    `.trim(),
  },
  'navbar-dropdown': {
    isolated: true,
    template: `
      <div class="navbar-dropdown {{#right}}is-right{{/}} {{#boxed}}is-boxed{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </div>
    `.trim(),
  },
  'navbar-divider': {
    isolated: true,
    template: `<hr class="navbar-divider {{class}}" {{#if id}}id="{{id}}"{{/if}} />`,
  },

  // Pagination
  pagination: {
    isolated: true,
    template: `
      <nav
        class="pagination {{#centered}}is-centered{{/}} {{#right}}is-right{{/}} {{#rounded}}is-rounded{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}"
        role="{{#if role}}{{role}}{{else}}navigation{{/if}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}pagination{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
      >
        {{yield}}
      </nav>
    `.trim(),
  },
  'pagination-previous': {
    isolated: true,
    template: `
      <a
        class="pagination-previous {{class}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if title}}title="{{title}}"{{/if}}
        {{#if disabled}}aria-disabled="true" tabindex="-1"{{/if}}
        {{#if safeHref}}{{#if disabled}}{{else}}href="{{safeHref}}"{{/if}}{{/if}}
      >{{yield}}</a>
    `.trim(),
  },
  'pagination-next': {
    isolated: true,
    template: `
      <a
        class="pagination-next {{class}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if title}}title="{{title}}"{{/if}}
        {{#if disabled}}aria-disabled="true" tabindex="-1"{{/if}}
        {{#if safeHref}}{{#if disabled}}{{else}}href="{{safeHref}}"{{/if}}{{/if}}
      >{{yield}}</a>
    `.trim(),
  },
  'pagination-list': {
    isolated: true,
    template: `<ul class="pagination-list {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</ul>`,
  },
  'pagination-link': {
    isolated: true,
    template: `
      <a
        class="pagination-link {{#current}}is-current{{/}} {{class}}"
        aria-label="{{ariaLabel}}"
        {{#if current}}aria-current="page"{{/if}}
        {{#if id}}id="{{id}}"{{/if}}
        {{#if safeHref}}href="{{safeHref}}"{{/if}}
      >{{yield}}</a>
    `.trim(),
  },
  'pagination-ellipsis': {
    isolated: true,
    template: `<span class="pagination-ellipsis {{class}}" {{#if id}}id="{{id}}"{{/if}}>&hellip;</span>`,
  },

  // Panel
  panel: {
    isolated: true,
    template: `
      <nav class="panel {{#primary}}is-primary{{/}} {{#link}}is-link{{/}} {{#info}}is-info{{/}} {{#success}}is-success{{/}} {{#warning}}is-warning{{/}} {{#danger}}is-danger{{/}} {{#dark}}is-dark{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </nav>
    `.trim(),
  },
  'panel-heading': {
    isolated: true,
    template: `<p class="panel-heading {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`,
  },
  'panel-tabs': {
    isolated: true,
    template: `<p class="panel-tabs {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`,
  },
  'panel-block': {
    isolated: true,
    template: `
      {{#if safeHref}}
        <a class="panel-block {{#active}}is-active{{/}} {{class}}" href="{{safeHref}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <div class="panel-block {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>
      {{/if}}
    `.trim(),
  },
  'panel-icon': {
    isolated: true,
    template: `<span class="panel-icon {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</span>`,
  },

  // Tabs
  tabs: {
    isolated: true,
    template: `
      <div class="tabs {{#centered}}is-centered{{/}} {{#right}}is-right{{/}} {{#boxed}}is-boxed{{/}} {{#toggle}}is-toggle{{/}} {{#toggle-rounded}}is-toggle-rounded{{/}} {{#fullwidth}}is-fullwidth{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        <ul>{{yield}}</ul>
      </div>
    `.trim(),
  },
  tab: {
    isolated: true,
    template: `<li class="{{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</li>`,
  },
  'tab-link': {
    isolated: true,
    template: `
      {{#if safeHref}}
        <a href="{{safeHref}}" class="{{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <button type="button" class="{{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</button>
      {{/if}}
    `.trim(),
  },

  content: {
    isolated: true,
    template:
      "<div class='content {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>",
  },

  column: {
    isolated: true,
    template:
      "<div class='column {{class}} {{#centered}}is-centered{{/}} {{#three-quarters}}is-three-quarters{{/}} {{#two-thirds}}is-two-thirds{{/}} {{#half}}is-half{{/}} {{#one-third}}is-one-third{{/}} {{#one-quarter}}is-one-quarter{{/}} {{#four-fifths}}is-four-fifths{{/}} {{#three-fifths}}is-three-fifths{{/}} {{#two-fifths}}is-two-fifths{{/}} {{#one-fifth}}is-one-fifth{{/}} {{#offset-three-quarters}}is-offset-three-quarters{{/}} {{#offset-two-thirds}}is-offset-two-thirds{{/}} {{#offset-half}}is-offset-half{{/}} {{#offset-one-third}}is-offset-one-third{{/}} {{#offset-one-quarter}}is-offset-one-quarter{{/}} {{#offset-four-fifths}}is-offset-four-fifths{{/}} {{#offset-three-fifths}}is-offset-three-fifths{{/}} {{#offset-two-fifths}}is-offset-two-fifths{{/}} {{#offset-one-fifth}}is-offset-one-fifth{{/}} {{#2}}is-2{{/}} {{#3}}is-3{{/}} {{#4}}is-4{{/}} {{#5}}is-5{{/}} {{#6}}is-6{{/}} {{#7}}is-7{{/}} {{#8}}is-8{{/}} {{#9}}is-9{{/}} {{#10}}is-10{{/}} {{#11}}is-11{{/}} {{#offset-2}}is-offset-2{{/}} {{#offset-3}}is-offset-3{{/}} {{#offset-4}}is-offset-4{{/}} {{#offset-5}}is-offset-5{{/}} {{#offset-6}}is-offset-6{{/}} {{#offset-7}}is-offset-7{{/}} {{#offset-8}}is-offset-8{{/}} {{#offset-9}}is-offset-9{{/}} {{#offset-10}}is-offset-10{{/}} {{#offset-11}}is-offset-11{{/}} {{#narrow}}is-narrow{{/}} {{#narrow-mobile}}is-narrow-mobile{{/}} {{#narrow-tablet}}is-narrow-tablet{{/}} {{#narrow-touch}}is-narrow-touch{{/}} {{#narrow-desktop}}is-narrow-desktop{{/}} {{#narrow-widescreen}}is-narrow-widescreen{{/}} {{#narrow-fullhd}}is-narrow-fullhd{{/}} {{#mobile}}is-mobile{{/}} {{#desktop-mobile}}is-desktop-mobile{{/}} {{#three-quarters-mobile}}is-three-quarters-mobile{{/}} {{#two-thirds-mobile}}is-two-thirds-mobile{{/}} {{#half-mobile}}is-half-mobile{{/}} {{#one-third-mobile}}is-one-third-mobile{{/}} {{#one-quarter-mobile}}is-one-quarter-mobile{{/}} {{#four-fifths-mobile}}is-four-fifths-mobile{{/}} {{#three-fifths-mobile}}is-three-fifths-mobile{{/}} {{#two-fifths-mobile}}is-two-fifths-mobile{{/}} {{#one-fifth-mobile}}is-one-fifth-mobile{{/}} {{#three-quarters-tablet}}is-three-quarters-tablet{{/}} {{#two-thirds-tablet}}is-two-thirds-tablet{{/}} {{#half-tablet}}is-half-tablet{{/}} {{#one-third-tablet}}is-one-third-tablet{{/}} {{#one-quarter-tablet}}is-one-quarter-tablet{{/}} {{#four-fifths-tablet}}is-four-fifths-tablet{{/}} {{#three-fifths-tablet}}is-three-fifths-tablet{{/}} {{#two-fifths-tablet}}is-two-fifths-tablet{{/}} {{#one-fifth-tablet}}is-one-fifth-tablet{{/}} {{#three-quarters-desktop}}is-three-quarters-desktop{{/}} {{#two-thirds-desktop}}is-two-thirds-desktop{{/}} {{#half-desktop}}is-half-desktop{{/}} {{#one-third-desktop}}is-one-third-desktop{{/}} {{#one-quarter-desktop}}is-one-quarter-desktop{{/}} {{#four-fifths-desktop}}is-four-fifths-desktop{{/}} {{#three-fifths-desktop}}is-three-fifths-desktop{{/}} {{#two-fifths-desktop}}is-two-fifths-desktop{{/}} {{#one-fifth-desktop}}is-one-fifth-desktop{{/}} {{#gapless}}is-gapless{{/}} {{#multiline}}is-multiline{{/}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>",
  },

  columns: {
    isolated: true,
    template:
      "<div class='columns {{class}} {{#centered}}is-centered{{/}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>",
  },
};

for (const definition of Object.values(componentDefinitions)) Object.freeze(definition);
Object.freeze(componentDefinitions);

const componentEntries = Object.entries(componentDefinitions);
const runtimeComponentEntries = componentEntries.map(([name, definition]) => [
  name,
  hrefAwareComponentNames.has(name) ? withSafeHref(definition) : definition,
]);
export const componentNames = Object.freeze(componentEntries.map(([name]) => name));

function sanitizeHref(href) {
  if (typeof href !== 'string') return null;
  const trimmedHref = href.trim();
  if (trimmedHref === '') return null;
  if (UNSAFE_HREF_SCHEME_PATTERN.test(trimmedHref)) return null;
  return trimmedHref;
}

function withSafeHref(definition) {
  const existingData = typeof definition.data === 'function' ? definition.data : null;
  const existingOninit = typeof definition.oninit === 'function' ? definition.oninit : null;

  return {
    ...definition,
    data() {
      const baseData = existingData ? existingData.call(this) : {};
      const normalizedData =
        baseData != null && typeof baseData === 'object' && !Array.isArray(baseData) ? baseData : {};
      return {
        ...normalizedData,
        safeHref: sanitizeHref(normalizedData.href),
      };
    },
    oninit() {
      if (existingOninit) existingOninit.call(this);

      const syncSafeHref = (href) => {
        const nextSafeHref = sanitizeHref(href);
        if (this.get('safeHref') !== nextSafeHref) this.set('safeHref', nextSafeHref);
      };

      syncSafeHref(this.get('href'));
      this.observe(
        'href',
        (nextHref) => {
          syncSafeHref(nextHref);
        },
        { init: false },
      );
    },
  };
}

/**
 * Registers Ralma components onto a Ractive constructor.
 *
 * @param {unknown} ractive - The `Ractive` constructor (global or imported).
 * @param {{overwrite?: boolean, warnOnCollision?: boolean}} [options]
 *  - `overwrite`: overwrite already-registered component names.
 *  - `warnOnCollision`: emit console warnings when a name is skipped.
 * @returns {unknown} The same `Ractive` reference.
 */
export function registerRalma(ractive, options = {}) {
  if (ractive == null || (typeof ractive !== 'object' && typeof ractive !== 'function')) {
    throw new TypeError('registerRalma(Ractive): Ractive must be an object or function');
  }

  const hasExtend = typeof ractive.extend === 'function';
  const hasComponents = ractive.components != null && typeof ractive.components === 'object';
  if (!hasExtend || !hasComponents) {
    throw new TypeError('registerRalma(Ractive): Ractive must have .extend() and .components');
  }

  if (options == null || (typeof options !== 'object' && typeof options !== 'function')) {
    throw new TypeError('registerRalma(Ractive, options): options must be an object when provided');
  }

  const overwrite = options.overwrite === true;
  const warnOnCollision = options.warnOnCollision === true;

  const registrationState = ractive.components[REGISTRY_MARKER];
  if (
    registrationState &&
    typeof registrationState === 'object' &&
    registrationState.definitions === componentDefinitions &&
    registrationState.overwrite === overwrite
  ) {
    return ractive;
  }

  for (const [name, def] of runtimeComponentEntries) {
    if (!overwrite && Object.prototype.hasOwnProperty.call(ractive.components, name)) {
      if (warnOnCollision && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(`registerRalma: skipping existing component "${name}"`);
      }
      continue;
    }
    ractive.components[name] = ractive.extend(def);
  }

  ractive.components[REGISTRY_MARKER] = Object.freeze({
    definitions: componentDefinitions,
    overwrite,
  });
  return ractive;
}
