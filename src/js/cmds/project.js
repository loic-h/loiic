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
To see a list of the available projects type <a href="/projects" class="cmd">projects</a>.
	`,
	params: [
		{
			key: 'project_name',
			values() {
				return Object.keys(projects).concat(['all']);
			},
			mandatory: true
		}
	],
	out(d) {
		const key = d.params[0];
		if (key === 'all') {
			return `
<ul class="project-all">
	${Object.keys(projects).map(k => `
		<li class="project-all__item">${getProject(k)}</li>
	`).join('')}
</all>
			`;
		}
		return getProject(key);
	}
};


function getProject(key) {
	const project = projects[key];
	let content = '';
	if (project.url) {
		project.visit = project.url;
	}
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

function getKey(k, v) {
	const key = k;
	return `<span class="project-item__key">${key}</span>`;
}

function getValue(k, v, name) {
	let value = v;

	if (k === 'url') {
		return `<a href="${v}">${v}</a>`;

	} else if (k === 'visit') {
		return `<a href="/visit/${name}" class="cmd">visit ${name}</a>`;

	} else if (Array.isArray(v)) {
		value = `
<ul class="project-item__list">
	${v.map(item => {
		const label = typeof item === 'object'
			? `<a href="${item.url}" target="_blank">${item.name}</a>`
			: item;
		return `<li>${label}</li>`;
	}).join('')}
</ul>
		`;

	} else if (typeof value === 'object') {
		value = `<a href="${value.url}">${value.name}</a>`;
	}

	return `<span class="project-item__value project-item__value--${k}">${value}</span>`;
}
