import page from 'page';
import events from './events';
import globals from './globals';
import './cmds';
import Cmd from './modules/cmd';
import Input from './modules/input';
import Log from './modules/log';
import History from './modules/history';
import './modules/complete';

const container = document.getElementById('layout');

function init() {
	Input.init(container);
	Log.init(container.querySelector('.log'));

	events.on('app:doCmd', key => {
		let uri = key.split(' ').map(k => encodeURIComponent(k));
		uri = uri.join('/');
		page('/' + uri);
	});

	window.addEventListener('popstate', (e) => {
		Log.clear();
		Input.clear();
		outCmd('home');
	});

	outCmd('home');

	page('*', (ctx, next) => {
		const key = decodeURIComponent(ctx.params[0]);
		let cmd = key.replace(/^\//, '');
		cmd = cmd.replace(/\//g, ' ');
		if (cmd === '') {
			return;
		}
		doCmd(cmd, !ctx.init);
	});

	page();
}

function doCmd(key, store = false) {
	Log.cmd(key);
	outCmd(key, store);
}

function outCmd(key, store = false) {
	const out = Cmd.run(key);
	if (store) {
		History.set(key);
	}
	if (out) {
		Log.add(out);
	}
}

init();
