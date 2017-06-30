const attributes = {
	color: {
		selector: '.layout',
		attribute: 'color',
		more(ctx) {
			const cursor = document.querySelector('.cursor');
			cursor.style.borderColor = ctx.value;
		}
	},
	background: {
		selector: '.layout',
		attribute: 'background'
	}
};

const applied = localStorage.getItem('css')
	? JSON.parse(localStorage.getItem('css'))
	: {};

Object.keys(applied).forEach(k => {
	const item = applied[k];
	custom(item.selector, item.attribute, item.value, false);
});

function custom(selector='.layout', attribute, value, save=true) {
	const els = document.querySelectorAll(selector);
	els.forEach(el => el.style[attribute] = value);
	if (save) {
		applied[attribute] = {selector, value, attribute};
		localStorage.setItem('css', JSON.stringify(applied));
	}
}

export default {
	key: 'custom',
	alias: ['css', 'set'],
	help: 'custom the website',
	params: [
		{
			key: 'attribute',
			mandatory: true,
			values() {
				return Object.keys(attributes);
			}
		},
		{
			key: 'value',
			mandatory: true
		}
	],
	out(ctx) {
		const attr = ctx.params[0];
		const val = ctx.params[1];
		const map = attributes[attr];
		const selector = map.selector || '.layout';
		const realAttr = map.attribute || attr;
		custom(selector, realAttr, val);
		if (map.more) {
			map.more({attribute: attr, value: val, map});
		}
		return `
<div class="custom">
	<span>Setting ${attr} to ${val}</span>
</div>
		`;
	}
};
