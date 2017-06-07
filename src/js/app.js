import events from './events';
import globals from './globals';
import Cmd from './cmd';
import Input from './modules/input';
import Log from './modules/log';

const container = document.getElementById('layout');

function init() {
	Input.init(container);
	Log.init(container.querySelector('.log'));

	events.on('input:enter', doCmd);

	outCmd('home');
}

function doCmd(key) {
	Log.add(key);
	outCmd(key);
}

function outCmd(key) {
	const out = Cmd.run(key);
	if (out) {
		Log.add(out);
	}
}

init();
