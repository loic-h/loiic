import {helps, keywords} from '.';

export default {
	key: 'help',
	alias: ['?', 'man'],
	params: [
		{
			key: 'command',
			values() {
				return Object.keys(keywords);
			}
		}
	],
	out(ctx) {
		let content = '';
		if (ctx.params[0]) {
			const k = ctx.params[0];
			content = `
<div class="help-item">
	<a href="/${k}">${k}</a>: ${helps[k]}
</div>
			`;
		} else {
			content = `
<ul>
	${Object.keys(helps).map((k) => `
		<li class="help-item">
			<a href="/${k}" class="cmd">${k}</a>: ${helps[k]}
		</li>
	`).join('')}
</ul>
			`;
		}
		return `
<div class="help">
	${content}
</div>
		`;
	}
};
