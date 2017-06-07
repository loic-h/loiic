import events from '../events';

const entries = [];
let container;

function init(cont) {
	container = cont;

	events.on('log:clear', clear);
}

function add(text) {
	entries.push(text);
	const line = document.createElement('div');
	line.className = 'log-entry';
	line.innerHTML = text;
	container.appendChild(line);
}

function clear() {
	entries.splice(0, entries.length);
	container.innerHTML = '';
}

export default {
	init,
	add
};
