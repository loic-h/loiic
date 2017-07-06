import projects from '../data/projects';
import events from '../events';
import Log from '../modules/log';

export default {
	key: 'visit',
	alias: ['see', 'go'],
	help: `
Open a link to a website of a project.<br />
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
	out(ctx) {
		const project = projects[ctx.params[0]];
		if (!project) {
			return Log.error(`${ctx.params[0]}: Project not found`, key);
		}
		events.emit('open', project.url);
		return `
Opening ${project.title}...
		`;
	}
};
