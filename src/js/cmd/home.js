export default {
	key: 'home',
	alias: [],
	help: 'return to home',
	out(d) {
		d.events.emit('log:clear');
		return `
<span class="bold">Loïc Hamet</span></br >
Web development
		`;
	}
};
