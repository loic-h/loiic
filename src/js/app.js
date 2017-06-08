import page from 'page';
import events from './events';
import globals from './globals';
import Cmd from './cmd';
import Input from './modules/input';
import Log from './modules/log';
import History from './modules/history';

const container = document.getElementById('layout');

function init() {
	Input.init(container);
	Log.init(container.querySelector('.log'));

	events.on('input:enter', doCmd);

	window.addEventListener('popstate', (e) => {
		Log.clear();
		Input.clear();
		outCmd('home');
	});

	outCmd('home');

	page('/:cmd', pageCallback);
	page('/:cmd/*', pageCallback);

	page();
}

function doCmd(key, store = false) {
	Log.add(key, ['cmd']);
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

function pageCallback(ctx, next) {
	let cmd = ctx.params.cmd;
	if (ctx.params[0]) {
		cmd += ' ' + ctx.params[0].split('/').join(' ');
	}
	doCmd(cmd);
}

init();
