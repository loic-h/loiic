import projects from '../projects';

export default {
	key: 'projects',
	alias: ['list', 'ls'],
	help: 'list of projects',
	menu: true,
	out(d) {
		return `
<ul class="projects">
	${Object.keys(projects).map((k) => {
		const item = projects[k];
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
