/* eslint-disable max-len */
import {helps, keywords} from '.';

export default {
	key: 'help',
	alias: ['?', 'man'],
	menu: true,
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
	<a href="/${k}" class="cmd">${k}</a>: ${helps[k]}
</div>
			`;
		} else {
			content = `
<div class="help__text">
	This website works like a terminal. Type a command, or click on it, to execute it. Below are a list of the main commands. To get more details on it, use <span class="bold">help command_name</span>.
</div>
<ul class="cmd-list">
	${Object.keys(helps).sort().map((k) => `
		<li class="cmd-list__item">
			<a href="/${k}" class="cmd">${k}</a>
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
