import projects from '../data/projects';
import events from '../events';
import Log from '../modules/log';

export default {
	key: 'go',
	alias: ['see', 'visit'],
	help: 'visit a project',
	params: [
		{
			key: 'project',
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
