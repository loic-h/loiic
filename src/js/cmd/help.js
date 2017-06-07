export default {
	key: 'help',
	alias: ['?'],
	out(d) {
		return `
<ul class="help">
	${Object.keys(d.helps).map((k) => `
		<li>
			<a href="${k}">${k}</a>: ${d.helps[k]}
		</li>
	`)}
</ul>
		`;
	}
};
