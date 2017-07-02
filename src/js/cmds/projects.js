import projects from '../data/projects';

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
			<li class="projects__item">
				<a href="${k}" class="cmd">${k}</a>
			</li>
		`;
	}).join('')}
</ul>
		`;
	}
};
