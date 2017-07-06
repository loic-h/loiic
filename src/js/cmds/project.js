import projects from '../data/projects';

export default {
	key: 'project',
	alias: ['show'],
	shorts() {
		const s = [];
		Object.keys(projects).forEach(k => s[k] = `project ${k}`);
		return s;
	},
	help: `
Display a project page.<br />
Type <a href="/projects" class="cmd">projects</a> to see a list of the available projects.
	`,
	params: [
		{
			key: 'project_name',
			values() {
				return Object.keys(projects);
			},
			mandatory: true
		}
	],
	out(d) {
		const key = d.params[0];
		const project = projects[key];
		let content = '';
		for (let k in project) {
			if (project.hasOwnProperty(k)) {
				const v = project[k];
				content += `
<li class="project-item project-item--${k}">
	${getKey(k, v)}
	${getValue(k, v, key)}
</li>
					`;
			}
		}
		return `
<div class="project">
	<ul>
		${content}
	</ul>
</div>
		`;
	}
};

function getKey(k, v) {
	const key = k;
	return `<span class="project-item__key">${key}</span>`;
}

function getValue(k, v, name) {
	let value = v;

	if (k === 'url') {
		return `<a href="/visit/${name}" class="cmd">visit ${name}</a>`;

	} else if (k === 'with') {
		value = `
<ul class="project-item__with">
	${v.map(item => `
		<li>${item}</li>
	`).join('')}
</ul>
		`;

	} else if (typeof value === 'object') {
		value = `<a href="${value.url}">${value.name}</a>`;
	}

	return `<span class="project-item__value">${value}</span>`;
}
