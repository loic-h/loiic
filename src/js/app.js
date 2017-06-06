import events from './events';
import globals from './globals';
import cmd from './modules/cmd';
import Input from './modules/input';
import Log from './modules/log';

const container = document.getElementById('layout');

events.on('cmd:ready', (data) => {
	init();
});

function init() {
	Input.init(container);
	Log.init(container.querySelector('.log'));

	events.on('input:enter', doCmd);
}

function doCmd(value) {
	Log.add(value);
}
