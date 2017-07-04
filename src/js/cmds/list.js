import {keywords, shorts} from '.';

export default {
	key: 'list',
	alias: ['ls'],
	help: 'list all available commands',
	out(ctx) {
		const words = Object.keys(keywords).concat(Object.keys(shorts));
		return `
<div class="list">
	<ul class="cmd-list">
		${words.sort().map(k => `
			<li class="cmd-list__item">
				<a href="${k}" class="cmd">${k}</a>
			</li>
		`).join('')}
	</ul>
</div>
		`;
	}
};
