import options from '../data/styles';

let styles, styleEl;

init();

export default {
	key: 'style',
	alias: ['css', 'set'],
	shorts() {
		const s = [];
		Object.keys(options).forEach(k => {
			s[k] = params => {
				return `style ${k} ${params[0]}`;
			};
		});
		return s;
	},
	help() {
		return `
<div class="help-style">
	<p>
		Customize the website with your own colors!<br />
		The following options are available:
	</p>
	<ul class="help-style__list">
		${Object.keys(options).map(k => `
			<li class="help-style-item">
				<span class="help-style-item__cmd">${k}</span>
				<span class="help-style-item__desc">${options[k].desc}</span>
			</li>
		`).join('')}
	</ul>
	<p>
		Colors must be in CSS format eg. 'red', '#ff0000', or 'rgb(255,0,0)'
	</p>
	<p>
		Example: <a href="/style/background/black" class="cmd">style background black</a>
	</p>
</div>
		`;
	},
	params: [
		{
			key: 'attribute',
			mandatory() {
				return true;
			},
			values() {
				return Object.keys(options).concat(['reset']);
			}
		},
		{
			key: 'value',
			mandatory(params) {
				return options[params[0]].sets;
			}
		}
	],
	out(ctx) {
		let content = '';
		const attribute = ctx.params[0];
		if (!options[attribute].sets) {
			reset();
			content = 'Reseting the styles to defaut values';
		} else {
			const value = ctx.params[1];
			const sets = options[attribute].sets;
			Object.keys(sets).forEach(selector => {
				addStyle(selector, sets[selector], value);
			});
			updateStyle();
			content = `<span>Setting ${attribute} to ${value}</span>`;
		}

		return `
<div class="style">
	${content}
</div>
		`;
	}
};

function init() {
	styleEl = document.createElement('style');
	document.getElementsByTagName('head')[0].appendChild(styleEl);

	styles = localStorage.getItem('styles')
		? JSON.parse(localStorage.getItem('styles'))
		: {};
	Object.keys(styles).forEach(k => {
		const item = styles[k];
		Object.keys(item).forEach(attribute => {
			addStyle(item.selector, attribute, item[attribute]);
		});
	});
	updateStyle();
}

function addStyle(selector='.layout', attribute, value, save=true) {
	const item = styles[selector] || {};
	item[attribute] = value;
	styles[selector] = item;
}

function updateStyle() {
	let str = '';
	Object.keys(styles).forEach(selector => str += `
		${selector} {
			${Object.keys(styles[selector]).map(attribute => `
				${attribute}: ${styles[selector][attribute]};
			`).join('')}
		}
	`);
	styleEl.innerHTML = str;
	localStorage.setItem('styles', JSON.stringify(styles));
}

function reset() {
	styles = {};
	updateStyle();
	localStorage.setItem('styles', JSON.stringify({}));
}
