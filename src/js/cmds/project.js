import projects from '../projects';

export default {
	key: 'project',
	alias: ['show'],
	shorts() {
		const s = [];
		Object.keys(projects).forEach(k => s[k] = `project ${k}`);
		return s;
	},
	help: 'show a project',
	params: [
		{
			key: 'project',
			values() {
				return Object.keys(projects);
			},
			mandatory: true
		}
	],
	out(d) {
		const key = d.params[0];
		const project = projects[key];
		return `
<div class="project">
	<h2 class="project__title">${project.title}</h2>
	<div class="project__date">${project.date}</div>
	<div class="project__text">${project.text}</div>
	<a class="project__link cmd" href="/visit/${key}">
		visit ${key}
	</a>
</div>
		`;
	}
};
