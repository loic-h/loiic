export default {
	key: 'projects',
	alias: ['list', 'ls'],
	help: 'list of projects',
	out(d) {
		return `
<ul class="projects">
	${Object.keys(d.projects).map((k) => {
		const item = d.projects[k];
		return `
			<li>
				<a href="${item.url}">${item.title}</a>: ${item.text}
			</li>
		`;
	}).join('')}
</ul>
		`;
	}
};
