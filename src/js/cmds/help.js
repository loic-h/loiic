/* eslint-disable max-len */
import {helps, allhelps, allwords, mainwords} from '.';

export default {
	key: 'help',
	alias: ['?', 'man'],
	menu: true,
	params: [
		{
			key: 'command',
			values() {
				return Object.keys(allhelps);
			}
		}
	],
	out(ctx) {
		let content = '';
		if (ctx.params[0]) {
			const k = ctx.params[0];
			const cmd = allwords[k];
			const attributes = cmd.params
				? cmd.params.map(a => `<span>${a.key}</span>`).join(' ')
				: '';
			content = `
<div class="help-item">
	<a href="/${k}" class="help-item__cmd cmd">${k}</a>
	<div class="help-item__text">${allhelps[k]}</div>
	<div class="use">Use: <span>${k} ${attributes}</span></div>
</div>
			`;
		} else {
			content = `
<div class="help__text">
	This website works like a terminal or a console. Type a command, or click on it, to execute it. Below are a list of the main commands. To get more details on it, use <span class="bold">help command_name</span>.
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
