import events from '../events';

export default {
	key: 'home',
	alias: ['clear', 'clc'],
	help: 'Return to the begining of the page.',
	out() {
		events.emit('log:clear');
		return `
<div class="home">
	<span class="home__name">Loïc Hamet</span>
	<span class="home__activity">Web development<span>
</div>
		`;
	}
};
