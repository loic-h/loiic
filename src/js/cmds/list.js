import {allwords, shorts} from '.';

export default {
	key: 'list',
	alias: ['ls'],
	help: 'Display a list all available commands.',
	out(ctx) {
		const words = Object.keys(allwords);
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
