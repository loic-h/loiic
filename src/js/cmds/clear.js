import events from '../events';

export default {
	key: 'clear',
	alias: [],
	out() {
		events.emit('log:clear');
	}
};
