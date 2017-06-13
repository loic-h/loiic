import {keywords} from '.';

export default {
	key: 'list',
	alias: ['ls'],
	help: 'list all available commands',
	out(ctx) {
		return `
<div class="list">
	<ul>
		${Object.keys(keywords).sort().map(k => `
			<li>
				<a href="${k}" class="cmd">${k}</a>
			</li>
		`).join('')}
	</ul>
</div>
		`;
	}
}