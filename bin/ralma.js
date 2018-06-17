/* Version 0.1 */

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


/* Dropdowns */
Ractive.components['dropdown'] = Ractive.extend({isolated: true, template: "<div class='dropdown {{#active}}is-active{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
Ractive.components['dropdown-trigger'] = Ractive.extend({isolated: true, template: "<div class='dropdown-trigger {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
Ractive.components['dropdown-button'] = Ractive.extend({isolated: true, template: "<button class='button {{class}}' {{#if id}} id='{{id}}' {{/if}} aria-haspopup='true' aria-controls='dropdown-menu'><span>{{yield}}</span><span class='icon is-small'><i class='fas fa-angle-down' aria-hidden='true'></i></span></button>"})
Ractive.components['dropdown-item'] = Ractive.extend({isolated: true, template: "<a {{#if href}} href='{{href}}' {{/if}} class='dropdown-item {{class}} {{#active}}is-active{{/}}' {{#if id}} id='{{id}}' {{/if}} {{#if onclick}} onclick='{{onclick}}' {{/if}}>{{yield}}</a>"})
Ractive.components['dropdown-menu'] = Ractive.extend({isolated: true, template: "<div class='dropdown-menu {{class}}' id='dropdown-menu {{id}}' role='menu {{role}}'>{{yield}}</div>"})
Ractive.components['dropdown-content'] = Ractive.extend({isolated: true, template: "<div class='dropdown-content {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
Ractive.components['dropdown-divider'] = Ractive.extend({isolated: true, template: "<hr class='dropdown-divider {{class}}' {{#if id}} id='{{id}}' {{/if}}>"})


/* Content */
Ractive.components['content'] = Ractive.extend({isolated: true, template: "<div class='content {{#small}}is-small{{/}} {{#medium}}is-medium{{/}} {{#large}}is-large{{/}} {{class}}' {{#if id}} id='{{id}}' {{/if}}>{{yield}}</div>"})
