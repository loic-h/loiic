import page from 'page';
import events from './events';
import globals from './globals';
import './cmds';
import Cmd from './modules/cmd';
import Input from './modules/input';
import Log from './modules/log';
import History from './modules/history';

const container = document.getElementById('layout');

function init() {
	Input.init(container);
	Log.init(container.querySelector('.log'));

	events.on('app:doCmd', key => {
		page(encodeURIComponent(key));
	});

	events.on('app:completion', key => {
		const matches = Cmd.completion(key);
		if (matches.length === 1) {
			Input.type(matches[0]);
		}
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
		cmd = cmd.replace('/', ' ');
		if (cmd === '') {
			return;
		}
		doCmd(cmd, !ctx.init);
	});

	page();
}

function doCmd(key, store = false) {
	Log.add(`<span>${key}</span>`, ['cmd']);
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
