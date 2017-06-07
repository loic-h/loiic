export default {
	key: 'clear',
	alias: [],
	out(d) {
		d.events.emit('log:clear');
	}
}
