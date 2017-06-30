import {keywords} from '.';

export default {
	key: 'list',
	alias: ['ls'],
	help: 'list all available commands',
	out(ctx) {
		return `
<div class="list">
	<ul class="cmd-list">
		${Object.keys(keywords).sort().map(k => `
			<li class="cmd-list__item">
				<a href="${k}" class="cmd">${k}</a>
			</li>
		`).join('')}
	</ul>
</div>
		`;
	}
};
