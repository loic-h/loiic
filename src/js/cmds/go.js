import projects from '../projects';
import events from '../events';

export default {
	key: 'go',
	alias: ['see', 'visit'],
	help: 'see a project',
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
			events.emit('log:error', `${ctx.params[0]}: Project not found`);
			return '';
		}
		window.open(project.url);
		return `
Opening ${project.title}...
		`;
	}
};
