import page from 'page';
import events from '../events';
import Log from './log';
import Input from './input';
import Cmd from './cmd';
import History from './history';

function init() {
	events.on('router:go', (cmd) => {
		let uri = cmd.split(' ').map(k => encodeURIComponent(k));
		uri = uri.join('/');
		page('/' + uri);
	});

	window.addEventListener('popstate', (e) => {
		Log.clear();
		Input.clear();
		go('home');
	});

	go('home', true);

	page('*', (ctx, next) => {
		const key = decodeURIComponent(ctx.params[0]);
		let cmd = key.replace(/^\//, '');
		cmd = cmd.replace(/\//g, ' ');
		if (cmd === '') {
			return;
		}
		Log.cmd(cmd, () => {
			Input.clear();
			go(cmd, true);
		}, ctx.init);
	});

	page();
}

function go(key, init=false) {
	const out = Cmd.run(key, !init);
	if (!init) {
		History.set(key);
	}
	if (out) {
		Log.add(out);
	}
}

export default {
	init,
	go
};
