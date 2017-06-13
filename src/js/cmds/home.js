import events from '../events';

export default {
	key: 'home',
	alias: ['clear'],
	help: 'return to home',
	out() {
		events.emit('log:clear');
		return `
<span class="bold">Loïc Hamet</span></br >
Web development
		`;
	}
};
