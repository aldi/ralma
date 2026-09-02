/* Ralma v0.2.2 */
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/index.js
  var REGISTRY_MARKER = /* @__PURE__ */ Symbol.for("ralma.__registered__");
  var UNSAFE_HREF_SCHEME_PATTERN = /^\s*(?:javascript|data|vbscript):/i;
  var hrefAwareComponentNames = /* @__PURE__ */ new Set([
    "button",
    "card-footer-item",
    "dropdown-item",
    "navbar-item",
    "navbar-link",
    "pagination-previous",
    "pagination-next",
    "pagination-link",
    "panel-block",
    "tab-link"
  ]);
  var columnFractionModifiers = [
    "three-quarters",
    "two-thirds",
    "half",
    "one-third",
    "one-quarter",
    "four-fifths",
    "three-fifths",
    "two-fifths",
    "one-fifth"
  ];
  var columnNumberModifiers = Array.from({ length: 12 }, (_, index) => String(index + 1));
  var columnBreakpoints = ["mobile", "tablet", "touch", "desktop", "widescreen", "fullhd"];
  var columnModifierClassNames = (
    /** @type {Array<[string, string]>} */
    [
      ...columnFractionModifiers.flatMap((modifier) => [
        [modifier, `is-${modifier}`],
        [`offset-${modifier}`, `is-offset-${modifier}`]
      ]),
      ...columnNumberModifiers.flatMap((modifier) => [
        [modifier, `is-${modifier}`],
        [`offset-${modifier}`, `is-offset-${modifier}`]
      ]),
      ["narrow", "is-narrow"],
      ...columnBreakpoints.map((breakpoint) => [`narrow-${breakpoint}`, `is-narrow-${breakpoint}`]),
      ...columnBreakpoints.flatMap(
        (breakpoint) => columnFractionModifiers.flatMap((modifier) => [
          [`${modifier}-${breakpoint}`, `is-${modifier}-${breakpoint}`],
          [`offset-${modifier}-${breakpoint}`, `is-offset-${modifier}-${breakpoint}`]
        ])
      ),
      ...columnBreakpoints.flatMap(
        (breakpoint) => columnNumberModifiers.flatMap((modifier) => [
          [`${modifier}-${breakpoint}`, `is-${modifier}-${breakpoint}`],
          [`offset-${modifier}-${breakpoint}`, `is-offset-${modifier}-${breakpoint}`]
        ])
      )
    ]
  );
  var columnsModifierClassNames = (
    /** @type {Array<[string, string]>} */
    [
      ["centered", "is-centered"],
      ["gapless", "is-gapless"],
      ["multiline", "is-multiline"],
      ["vcentered", "is-vcentered"],
      ["mobile", "is-mobile"],
      ["desktop", "is-desktop"]
    ]
  );
  function modifierSections(...modifiers) {
    return modifiers.map((modifier) => `{{#${modifier}}}is-${modifier}{{/}}`).join(" ");
  }
  var colorModifiers = [
    "white",
    "light",
    "dark",
    "black",
    "text",
    "primary",
    "link",
    "info",
    "success",
    "warning",
    "danger"
  ];
  var panelColorModifiers = ["primary", "link", "info", "success", "warning", "danger", "dark"];
  var sizeModifiers = ["small", "medium", "large"];
  var buttonStateModifiers = [
    "outlined",
    "inverted",
    "rounded",
    "hovered",
    "focused",
    "loading",
    "static",
    "active"
  ];
  var buttonModifiers = modifierSections(
    ...colorModifiers,
    ...sizeModifiers,
    ...buttonStateModifiers
  );
  var navbarModifiers = modifierSections(
    "transparent",
    "spaced",
    "fixed-top",
    "fixed-bottom",
    ...colorModifiers
  );
  var messageModifiers = modifierSections(...panelColorModifiers, ...sizeModifiers);
  var panelModifiers = modifierSections(...panelColorModifiers);
  var buttonTemplate = `
{{#if safeHref}}
  <a
    class="button ${buttonModifiers} {{class}}"
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
    class="button ${buttonModifiers} {{class}}"
    {{#if id}}id="{{id}}"{{/if}}
    {{#if title}}title="{{title}}"{{/if}}
    {{#if disabled}}disabled{{/if}}
    {{#if dropdown}}aria-haspopup="true"{{/if}}
    {{#if ariaControls}}aria-controls="{{ariaControls}}"{{/if}}
  >{{yield}}</button>
{{/if}}
`.trim();
  var componentDefinitions = {
    button: {
      isolated: true,
      data() {
        return {
          buttonType: "button"
        };
      },
      template: buttonTemplate
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
    `.trim()
    },
    "breadcrumb-item": {
      isolated: true,
      template: `
      <li class="{{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </li>
    `.trim()
    },
    // Card
    card: {
      isolated: true,
      template: `<div class="card {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "card-header": {
      isolated: true,
      template: `<header class="card-header {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</header>`
    },
    "card-header-title": {
      isolated: true,
      template: `<p class="card-header-title {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`
    },
    "card-header-icon": {
      isolated: true,
      template: `
      <button
        type="button"
        class="card-header-icon {{class}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}more options{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if onclick}}on-click="{{onclick}}"{{/if}}
      >{{yield}}</button>
    `.trim()
    },
    "card-image": {
      isolated: true,
      template: `<div class="card-image {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "card-content": {
      isolated: true,
      template: `<div class="card-content {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "card-footer": {
      isolated: true,
      template: `<footer class="card-footer {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</footer>`
    },
    "card-footer-item": {
      isolated: true,
      template: `
      {{#if safeHref}}
        <a class="card-footer-item {{class}}" href="{{safeHref}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <div class="card-footer-item {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>
      {{/if}}
    `.trim()
    },
    // Dropdowns (beta)
    dropdown: {
      isolated: true,
      template: "<div class='dropdown {{#active}}is-active{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"
    },
    "dropdown-trigger": {
      isolated: true,
      template: "<div class='dropdown-trigger {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"
    },
    "dropdown-button": {
      isolated: true,
      template: "<button type='button' class='button {{class}}' {{#if id}} id='{{id}}' {{/if}} aria-haspopup='true' {{#if ariaControls}}aria-controls='{{ariaControls}}'{{/if}}><span>{{yield}}</span><span class='icon is-small'><i class='fas fa-angle-down' aria-hidden='true'></i></span></button>"
    },
    "dropdown-item": {
      isolated: true,
      // Without an href this must be a <button>: an <a> with no href is not keyboard-focusable, and
      // this element carries an on-click. Bulma styles both a.dropdown-item and button.dropdown-item.
      template: `
      {{#if safeHref}}
        <a
          class="dropdown-item {{class}} {{#active}}is-active{{/}}"
          href="{{safeHref}}"
          {{#if id}}id="{{id}}"{{/if}}
          {{#if onclick}}on-click="{{onclick}}"{{/if}}
        >{{yield}}</a>
      {{else}}
        <button
          type="button"
          class="dropdown-item {{class}} {{#active}}is-active{{/}}"
          {{#if id}}id="{{id}}"{{/if}}
          {{#if onclick}}on-click="{{onclick}}"{{/if}}
        >{{yield}}</button>
      {{/if}}
    `.trim()
    },
    "dropdown-menu": {
      isolated: true,
      // No default role. A real ARIA menu needs role="menuitem" on every child and arrow-key focus
      // management, and Ralma ships no behavior — an announced "menu" that doesn't respond to arrow
      // keys is worse for assistive tech than a plain container. Pass `role` to opt in.
      template: "<div class='dropdown-menu {{class}}' {{#if id}} id='{{id}}' {{/if}} {{#if role}}role='{{role}}'{{/if}}>{{yield}}</div>"
    },
    "dropdown-content": {
      isolated: true,
      template: "<div class='dropdown-content {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"
    },
    "dropdown-divider": {
      isolated: true,
      template: "<hr class='dropdown-divider {{class}}' {{#if id}} id='{{id}}' {{/if}}>"
    },
    // Menu
    menu: {
      isolated: true,
      template: `<aside class="menu {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</aside>`
    },
    "menu-label": {
      isolated: true,
      template: `<p class="menu-label {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`
    },
    "menu-list": {
      isolated: true,
      template: `<ul class="menu-list {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</ul>`
    },
    // Message
    message: {
      isolated: true,
      template: `
      <article class="message ${messageModifiers} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </article>
    `.trim()
    },
    "message-header": {
      isolated: true,
      template: `<div class="message-header {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "message-body": {
      isolated: true,
      template: `<div class="message-body {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    // Modal
    modal: {
      isolated: true,
      template: `<div class="modal {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "modal-background": {
      isolated: true,
      template: `<div class="modal-background {{class}}" {{#if id}}id="{{id}}"{{/if}}></div>`
    },
    "modal-content": {
      isolated: true,
      template: `<div class="modal-content {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "modal-close": {
      isolated: true,
      template: `
      <button
        type="button"
        class="modal-close {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}close{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if onclick}}on-click="{{onclick}}"{{/if}}
      ></button>
    `.trim()
    },
    "modal-card": {
      isolated: true,
      template: `<div class="modal-card {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "modal-card-head": {
      isolated: true,
      template: `<header class="modal-card-head {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</header>`
    },
    "modal-card-title": {
      isolated: true,
      template: `<p class="modal-card-title {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`
    },
    "modal-card-body": {
      isolated: true,
      template: `<section class="modal-card-body {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</section>`
    },
    "modal-card-foot": {
      isolated: true,
      template: `<footer class="modal-card-foot {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</footer>`
    },
    // Navbar
    navbar: {
      isolated: true,
      template: `
      <nav
        class="navbar ${navbarModifiers} {{class}}"
        role="{{#if role}}{{role}}{{else}}navigation{{/if}}"
        aria-label="{{#if ariaLabel}}{{ariaLabel}}{{else}}main navigation{{/if}}"
        {{#if id}}id="{{id}}"{{/if}}
      >
        {{yield}}
      </nav>
    `.trim()
    },
    "navbar-brand": {
      isolated: true,
      template: `<div class="navbar-brand {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "navbar-burger": {
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
    `.trim()
    },
    "navbar-menu": {
      isolated: true,
      template: `<div class="navbar-menu {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "navbar-start": {
      isolated: true,
      template: `<div class="navbar-start {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "navbar-end": {
      isolated: true,
      template: `<div class="navbar-end {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>`
    },
    "navbar-item": {
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
    `.trim()
    },
    "navbar-item-dropdown": {
      isolated: true,
      template: `
      <div class="navbar-item has-dropdown {{#active}}is-active{{/}} {{#hoverable}}is-hoverable{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </div>
    `.trim()
    },
    "navbar-link": {
      isolated: true,
      template: `
      {{#if safeHref}}
        <a class="navbar-link {{#active}}is-active{{/}} {{class}}" href="{{safeHref}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <button type="button" class="navbar-link {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</button>
      {{/if}}
    `.trim()
    },
    "navbar-dropdown": {
      isolated: true,
      template: `
      <div class="navbar-dropdown {{#right}}is-right{{/}} {{#boxed}}is-boxed{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </div>
    `.trim()
    },
    "navbar-divider": {
      isolated: true,
      template: `<hr class="navbar-divider {{class}}" {{#if id}}id="{{id}}"{{/if}} />`
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
    `.trim()
    },
    "pagination-previous": {
      isolated: true,
      template: `
      <a
        class="pagination-previous {{class}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if title}}title="{{title}}"{{/if}}
        {{#if disabled}}aria-disabled="true" tabindex="-1"{{/if}}
        {{#if safeHref}}{{#if disabled}}{{else}}href="{{safeHref}}"{{/if}}{{/if}}
      >{{yield}}</a>
    `.trim()
    },
    "pagination-next": {
      isolated: true,
      template: `
      <a
        class="pagination-next {{class}}"
        {{#if id}}id="{{id}}"{{/if}}
        {{#if title}}title="{{title}}"{{/if}}
        {{#if disabled}}aria-disabled="true" tabindex="-1"{{/if}}
        {{#if safeHref}}{{#if disabled}}{{else}}href="{{safeHref}}"{{/if}}{{/if}}
      >{{yield}}</a>
    `.trim()
    },
    "pagination-list": {
      isolated: true,
      template: `<ul class="pagination-list {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</ul>`
    },
    "pagination-link": {
      isolated: true,
      template: `
      <a
        class="pagination-link {{#current}}is-current{{/}} {{class}}"
        {{#if ariaLabel}}aria-label="{{ariaLabel}}"{{else}}{{#if page}}aria-label="Goto page {{page}}"{{/if}}{{/if}}
        {{#if current}}aria-current="page"{{/if}}
        {{#if id}}id="{{id}}"{{/if}}
        {{#if safeHref}}href="{{safeHref}}"{{/if}}
      >{{yield}}</a>
    `.trim()
    },
    "pagination-ellipsis": {
      isolated: true,
      template: `<span class="pagination-ellipsis {{class}}" {{#if id}}id="{{id}}"{{/if}}>&hellip;</span>`
    },
    // Panel
    panel: {
      isolated: true,
      template: `
      <nav class="panel ${panelModifiers} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        {{yield}}
      </nav>
    `.trim()
    },
    "panel-heading": {
      isolated: true,
      template: `<p class="panel-heading {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`
    },
    "panel-tabs": {
      isolated: true,
      template: `<p class="panel-tabs {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</p>`
    },
    "panel-block": {
      isolated: true,
      template: `
      {{#if safeHref}}
        <a class="panel-block {{#active}}is-active{{/}} {{class}}" href="{{safeHref}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <div class="panel-block {{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</div>
      {{/if}}
    `.trim()
    },
    "panel-icon": {
      isolated: true,
      template: `<span class="panel-icon {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</span>`
    },
    // Tabs
    tabs: {
      isolated: true,
      template: `
      <div class="tabs {{#centered}}is-centered{{/}} {{#right}}is-right{{/}} {{#boxed}}is-boxed{{/}} {{#toggle}}is-toggle{{/}} {{#toggle-rounded}}is-toggle-rounded{{/}} {{#fullwidth}}is-fullwidth{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>
        <ul>{{yield}}</ul>
      </div>
    `.trim()
    },
    tab: {
      isolated: true,
      template: `<li class="{{#active}}is-active{{/}} {{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</li>`
    },
    "tab-link": {
      isolated: true,
      template: `
      {{#if safeHref}}
        <a href="{{safeHref}}" class="{{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</a>
      {{else}}
        <button type="button" class="{{class}}" {{#if id}}id="{{id}}"{{/if}}>{{yield}}</button>
      {{/if}}
    `.trim()
    },
    content: {
      isolated: true,
      template: "<div class='content {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"
    },
    column: {
      isolated: true,
      computed: {
        /** @this {RactiveInstance} */
        columnModifiers() {
          return buildModifierClassNames(this, columnModifierClassNames);
        }
      },
      template: "<div class='column {{class}} {{columnModifiers}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"
    },
    columns: {
      isolated: true,
      computed: {
        /** @this {RactiveInstance} */
        columnsModifiers() {
          return buildModifierClassNames(this, columnsModifierClassNames);
        }
      },
      template: "<div class='columns {{class}} {{columnsModifiers}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"
    }
  };
  for (const definition of Object.values(componentDefinitions)) Object.freeze(definition);
  Object.freeze(componentDefinitions);
  var componentEntries = (
    /** @type {Array<[string, RalmaComponentDefinition]>} */
    Object.entries(componentDefinitions)
  );
  var runtimeComponentEntries = componentEntries.map(([name, definition]) => [
    name,
    hrefAwareComponentNames.has(name) ? withSafeHref(definition) : definition
  ]);
  var componentNames = Object.freeze(componentEntries.map(([name]) => name));
  function stripControlCharacters(value) {
    return Array.from(value).filter((character) => {
      const code = character.charCodeAt(0);
      return code > 32 && code !== 127;
    }).join("");
  }
  function sanitizeHref(href) {
    if (typeof href !== "string") return null;
    const trimmedHref = href.trim();
    if (trimmedHref === "") return null;
    if (UNSAFE_HREF_SCHEME_PATTERN.test(stripControlCharacters(trimmedHref))) return null;
    return trimmedHref;
  }
  function buildModifierClassNames(component, modifierClassNames) {
    return modifierClassNames.filter(([key]) => component.get(key)).map(([, className]) => className).join(" ");
  }
  function withSafeHref(definition) {
    const existingData = typeof definition.data === "function" ? definition.data : null;
    const existingOninit = typeof definition.oninit === "function" ? definition.oninit : null;
    return __spreadProps(__spreadValues({}, definition), {
      /** @this {RactiveInstance} */
      data() {
        const baseData = existingData ? existingData.call(this) : {};
        return __spreadProps(__spreadValues({}, baseData), {
          safeHref: sanitizeHref(baseData.href)
        });
      },
      /** @this {RactiveInstance} */
      oninit() {
        if (existingOninit) existingOninit.call(this);
        const syncSafeHref = (href) => {
          const nextSafeHref = sanitizeHref(href);
          if (this.get("safeHref") !== nextSafeHref) this.set("safeHref", nextSafeHref);
        };
        syncSafeHref(this.get("href"));
        this.observe(
          "href",
          (nextHref) => {
            syncSafeHref(nextHref);
          },
          { init: false }
        );
      }
    });
  }
  function registerRalma(ractive, options = {}) {
    if (ractive == null || typeof ractive !== "object" && typeof ractive !== "function") {
      throw new TypeError("registerRalma(Ractive): Ractive must be an object or function");
    }
    const target = (
      /** @type {RactiveLike} */
      ractive
    );
    const hasExtend = typeof target.extend === "function";
    const hasComponents = target.components != null && typeof target.components === "object";
    if (!hasExtend || !hasComponents) {
      throw new TypeError("registerRalma(Ractive): Ractive must have .extend() and .components");
    }
    if (options == null || typeof options !== "object" && typeof options !== "function") {
      throw new TypeError("registerRalma(Ractive, options): options must be an object when provided");
    }
    const overwrite = options.overwrite === true;
    const warnOnCollision = options.warnOnCollision === true;
    const registrationState = target.components[REGISTRY_MARKER];
    if (registrationState && typeof registrationState === "object" && /** @type {{ definitions?: unknown }} */
    registrationState.definitions === componentDefinitions && /** @type {{ overwrite?: unknown }} */
    registrationState.overwrite === overwrite) {
      return ractive;
    }
    for (const [name, def] of runtimeComponentEntries) {
      if (!overwrite && Object.prototype.hasOwnProperty.call(target.components, name)) {
        if (warnOnCollision) {
          console.warn(`registerRalma: skipping existing component "${name}"`);
        }
        continue;
      }
      target.components[name] = target.extend(def);
    }
    target.components[REGISTRY_MARKER] = Object.freeze({
      definitions: componentDefinitions,
      overwrite
    });
    return ractive;
  }

  // src/ralma-browser-entry.js
  var globalObject = typeof window !== "undefined" ? window : globalThis;
  if (!globalObject.Ractive) throw new Error("Ralma: window.Ractive is required before loading ralma.js");
  registerRalma(globalObject.Ractive);
})();
