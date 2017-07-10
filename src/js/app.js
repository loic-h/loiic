import events from './events';
import globals from './globals';
import {init as initCmds} from './cmds';
import Input from './modules/input';
import Log from './modules/log';
import './modules/complete';
import Router from './modules/router';

const container = document.getElementById('layout');

function init() {
	Input.init(container);
	Log.init(container.querySelector('.log'));
	Router.init();
	initCmds();

	events.on('freeze', freeze);
}

function freeze(foo=true) {
	const action = foo ? 'add' : 'remove';
	document.getElementById('freeze').classList[action]('active');
}

init();
