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
		events.on('blur', () => {
			cancel();
		});
		events.on('focus', () => {
			if (current < 0) {
				initTimeout();
			}
		});

		if (document.hasFocus()) {
			initTimeout();
		}
	}
};

function initTimeout() {
	clearTimeout(timer);
	timer = setTimeout(display, iniTime);
}

function display(index) {
	events.emit('freeze');
	Placeholder.activate(false);
	current ++;
	Input.fill('', () => {
		if(cmds[current]) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				Input.fill(cmds[current], () => {
					clearTimeout(timer);
					timer = setTimeout(display, waitTime);
				}, true);
			}, waitTime);
		} else {
			cancel();
		}
	}, true);
}

function cancel() {
	current = -1;
	clearTimeout(timer);
	Input.clear();
	Placeholder.activate(true);
	Placeholder.show();
	events.emit('freeze', false);
}
