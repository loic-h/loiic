import events from '../events';

const entries = [];
const entryClass = 'log-entry';
let container;

function init(cont) {
	container = cont;

	events.on('log:clear', clear);
	events.on('log:error', error);
}

function add(text, modifiers) {
	entries.push(text);
	const line = document.createElement('div');
	let classes = [entryClass];
	if (modifiers) {
		if (Array.isArray(modifiers)) {
			classes = classes.concat(modifiers.map((mod) => `${entryClass}--${mod}`));
		}
	}
	line.className = classes.join(' ');
	line.innerHTML = text;
	container.appendChild(line);
}

function error(text) {
	add(text, ['error']);
}

function clear() {
	entries.splice(0, entries.length);
	container.innerHTML = '';
}

export default {
	init,
	add,
	error
};
