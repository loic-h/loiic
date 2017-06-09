import Projects from '../projects';

export default {
	key: 'go',
	alias: ['see'],
	help: 'see a project',
	args: [
		{
			key: 'project',
			values() {
				return Object.keys(Projects);
			}
		}
	],
	out(d) {
		const project = d.projects[d.args[0]];
		if (!project) {
			d.events.emit('log:error', `${d.args[0]}: Project not found`);
			return '';
		}
		window.open(project.url);
		return `
Opening ${project.title}...
		`;
	}
};
