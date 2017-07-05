import {cmds} from '.';

let items = null;

export default {
	key: 'menu',
	alias: [],
	help: 'Display the main categories',
	out(ctx) {
		if (!items) {
			items = cmds.filter(a => a.menu);
		}
		return `
<div class="menu">
	<ul>
		${items.map(item => `
			<li>
				<a href="/${item.key}" class="cmd">${item.key}</a>
			</li>
		`).join('')}
	</ul>
</div>
		`;
	}
};
