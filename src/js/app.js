import events from './events';
import globals from './globals';
import cmd from './modules/cmd';
import Input from './modules/input';

const container = document.getElementById('layout');

events.on('cmd:ready', (data) => {
	init();
});

function init() {
	Input.init(container);
}
