import page from 'page';
import events from '../events';
import Cmd from './cmd';
import History from './history';

function init() {
	events.on('router:go', (cmd) => {
		let uri = cmd.split(' ').map(k => encodeURIComponent(k));
		uri = uri.join('/');
		page('/' + uri);
	});

	events.on('open', (url, notab) => {
		setTimeout(() => {
			if(notab) {
				window.location = url;
			} else {
				window.open(url);
			}
		}, 1000);
	});

	window.addEventListener('popstate', (e) => {
		Cmd.clear();
		go('home', false, false, false);
	});

	go('home', false, false, false);

	page('*', (ctx, next) => {
		let key = decodeURIComponent(ctx.params[0]);
		key = key.replace(/^\//, '');
		key = key.replace(/\//g, ' ');
		if (key === '') {
			return;
		}

		go(key, true, !ctx.init, !ctx.init);
	});

	page();
}

function go(key, showCmd=true, save=true, animCmd=true) {
	if (save) {
		History.set(key);
	}
	Cmd.run(key, showCmd, animCmd);
}

export default {
	init,
	go
};
