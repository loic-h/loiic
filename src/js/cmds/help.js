import {helps} from '.';

export default {
	key: 'help',
	alias: ['?', 'man'],
	out(d) {
		return `
<ul class="help">
	${Object.keys(helps).map((k) => `
		<li>
			<a href="/${k}">${k}</a>: ${helps[k]}
		</li>
	`).join('')}
</ul>
		`;
	}
};
