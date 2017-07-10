import events from '../events';
import Input from '../modules/input';
import Placeholder from '../modules/placeholder';

const cmds = [
	'Wake up, Neo...',
	'The Matrix has you...',
	'Follow the white rabbit.',
	'Knock, knock, Neo.'
];

const iniTime = 1000 * 60 * 3;
const waitTime = 1000 * 3;
let timer;
let current = -1;

export default {
	key: 'neo',
	init() {
		initTimeout();
		events.on('input', () => {
			if (current < 0) {
				cancel();
			}
		});
		events.on('blur', () => {
			if (current < 0) {
				cancel();
			}
		});
		events.on('focus', () => {
			if (current < 0) {
				initTimeout();
			}
		});
	}
};

function initTimeout() {
	current = -1;
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(display, iniTime);
}

function display(index) {
	events.emit('freeze');
	Placeholder.activate(false);
	current ++;
	Input.fill('', () => {
		if(cmds[current]) {
			timer = setTimeout(() => {
				Input.fill(cmds[current], () => {
					timer = setTimeout(display, waitTime);
				}, true);
			}, waitTime);
		} else {
			finish();
		}
	}, true);
}

function cancel() {
	initTimeout();
}

function finish() {
	Placeholder.activate(true);
	Placeholder.show();
	events.emit('freeze', false);
	cancel();
}
