/* Version 0.2 */

/* Buttons */
Ractive.components['button'] = Ractive.extend({
	isolated: true,
	data: {
		type: 'default'
	},
	template: function() {
			return "<a class='button {{#white}}is-white{{/}} {{#light}}is-light{{/}} {{#dark}}is-dark{{/}} {{#black}}is-black{{/}} {{#text}}is-text{{/}} {{#primary}}is-primary{{/}} {{#link}}is-link{{/}} {{#info}}is-info{{/}} {{#success}}is-success{{/}} {{#warning}}is-warning{{/}} {{#danger}}is-danger{{/}} {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{#outlined}}is-outlined{{/}} {{#inverted}}is-inverted{{/}} {{#rounded}}is-rounded{{/}} {{#hovered}}is-hovered{{/}} {{#focused}}is-focused{{/}} {{#loading}}is-loading{{/}} {{#static}}is-static{{/}} {{#active}}is-active{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}} {{#if title}} title='{{title}}' {{/if}} {{#if disabled}} disabled {{/if}} {{#dropdown}}aria-haspopup='true' aria-controls='dropdown-menu'{{/}} {{#if href}} href='{{href}}' {{/if}}>{{yield}}</a>"
	}
})

/* Dropdowns Beta */
Ractive.components['dropdown'] = Ractive.extend({isolated: true, template: "<div class='dropdown {{#active}}is-active{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
Ractive.components['dropdown-trigger'] = Ractive.extend({isolated: true, template: "<div class='dropdown-trigger {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
Ractive.components['dropdown-button'] = Ractive.extend({isolated: true, template: "<button class='button {{class}}' {{#if id}} id='{{id}}' {{/if}} aria-haspopup='true' aria-controls='dropdown-menu'><span>{{yield}}</span><span class='icon is-small'><i class='fas fa-angle-down' aria-hidden='true'></i></span></button>"})
Ractive.components['dropdown-item'] = Ractive.extend({isolated: true, template: "<a {{#if href}} href='{{href}}' {{/if}} class='dropdown-item {{class}} {{#active}}is-active{{/}}' {{#if id}} id='{{id}}' {{/if}} {{#if onclick}} onclick='{{onclick}}' {{/if}}>{{yield}}</a>"})
Ractive.components['dropdown-menu'] = Ractive.extend({isolated: true, template: "<div class='dropdown-menu {{class}}' id='dropdown-menu {{id}}' role='menu {{role}}'>{{yield}}</div>"})
Ractive.components['dropdown-content'] = Ractive.extend({isolated: true, template: "<div class='dropdown-content {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
Ractive.components['dropdown-divider'] = Ractive.extend({isolated: true, template: "<hr class='dropdown-divider {{class}}' {{#if id}} id='{{id}}' {{/if}}>"})


/* Content */
Ractive.components['content'] = Ractive.extend({isolated: true, template: "<div class='content {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})

/* Column */
Ractive.components['column'] = Ractive.extend({isolated: true, template: "<div class='column {{class}} {{#centered}}is-centered{{/}} {{#three-quarters}}is-three-quarters{{/}} {{#two-thirds}}is-two-thirds{{/}} {{#half}}is-half{{/}} {{#one-third}}is-one-third{{/}} {{#one-quarter}}is-one-quarter{{/}} {{#four-fifths}}is-four-fifths{{/}} {{#three-fifths}}is-three-fifths{{/}} {{#two-fifths}}is-two-fifths{{/}} {{#one-fifth}}is-one-fifth{{/}} {{#offset-three-quarters}}is-offset-three-quarters{{/}} {{#offset-two-thirds}}is-offset-two-thirds{{/}} {{#offset-half}}is-offset-half{{/}} {{#offset-one-third}}is-offset-one-third{{/}} {{#offset-one-quarter}}is-offset-one-quarter{{/}} {{#offset-four-fifths}}is-offset-four-fifths{{/}} {{#offset-three-fifths}}is-offset-three-fifths{{/}} {{#offset-two-fifths}}is-offset-two-fifths{{/}} {{#offset-one-fifth}}is-offset-one-fifth{{/}} {{#2}}is-2{{/}} {{#3}}is-3{{/}} {{#4}}is-4{{/}} {{#5}}is-5{{/}} {{#6}}is-6{{/}} {{#7}}is-7{{/}} {{#8}}is-8{{/}} {{#9}}is-9{{/}} {{#10}}is-10{{/}} {{#11}}is-11{{/}} {{#offset-2}}is-offset-2{{/}} {{#offset-3}}is-offset-3{{/}} {{#offset-4}}is-offset-4{{/}} {{#offset-5}}is-offset-5{{/}} {{#offset-6}}is-offset-6{{/}} {{#offset-7}}is-offset-7{{/}} {{#offset-8}}is-offset-8{{/}} {{#offset-9}}is-offset-9{{/}} {{#offset-10}}is-offset-10{{/}} {{#offset-11}}is-offset-11{{/}} {{#narrow}}is-narrow{{/}} {{#narrow-mobile}}is-narrow-mobile{{/}} {{#narrow-tablet}}is-narrow-tablet{{/}} {{#narrow-touch}}is-narrow-touch{{/}} {{#narrow-desktop}}is-narrow-desktop{{/}} {{#narrow-widescreen}}is-narrow-widescreen{{/}} {{#narrow-fullhd}}is-narrow-fullhd{{/}} {{#mobile}}is-mobile{{/}} {{#desktop-mobile}}is-desktop-mobile{{/}} {{#three-quarters-mobile}}is-three-quarters-mobile{{/}} {{#two-thirds-mobile}}is-two-thirds-mobile{{/}} {{#half-mobile}}is-half-mobile{{/}} {{#one-third-mobile}}is-one-third-mobile{{/}} {{#one-quarter-mobile}}is-one-quarter-mobile{{/}} {{#four-fifths-mobile}}is-four-fifths-mobile{{/}} {{#three-fifths-mobile}}is-three-fifths-mobile{{/}} {{#two-fifths-mobile}}is-two-fifths-mobile{{/}} {{#one-fifth-mobile}}is-one-fifth-mobile{{/}} {{#three-quarters-tablet}}is-three-quarters-tablet{{/}} {{#two-thirds-tablet}}is-two-thirds-tablet{{/}} {{#half-tablet}}is-half-tablet{{/}} {{#one-third-tablet}}is-one-third-tablet{{/}} {{#one-quarter-tablet}}is-one-quarter-tablet{{/}} {{#four-fifths-tablet}}is-four-fifths-tablet{{/}} {{#three-fifths-tablet}}is-three-fifths-tablet{{/}} {{#two-fifths-tablet}}is-two-fifths-tablet{{/}} {{#one-fifth-tablet}}is-one-fifth-tablet{{/}} {{#three-quarters-desktop}}is-three-quarters-desktop{{/}} {{#two-thirds-desktop}}is-two-thirds-desktop{{/}} {{#half-desktop}}is-half-desktop{{/}} {{#one-third-desktop}}is-one-third-desktop{{/}} {{#one-quarter-desktop}}is-one-quarter-desktop{{/}} {{#four-fifths-desktop}}is-four-fifths-desktop{{/}} {{#three-fifths-desktop}}is-three-fifths-desktop{{/}} {{#two-fifths-desktop}}is-two-fifths-desktop{{/}} {{#one-fifth-desktop}}is-one-fifth-desktop{{/}} {{#gapless}}is-gapless{{/}} {{#multiline}}is-multiline{{/}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})

/* Columns */
Ractive.components['columns'] = Ractive.extend({isolated: true, template: "<div class='columns {{class}} {{#centered}}is-centered{{/}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
