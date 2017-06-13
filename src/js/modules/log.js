import events from '../events';

const entries = [];
const entryClass = 'log-entry';
let container;

function init(cont) {
	container = cont;

	events.on('log:clear', clear);
	events.on('log:error', error);
	events.on('log:404', notFound);
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
	window.scrollTo(0,document.body.scrollHeight);
}

function error(text) {
	add(text, ['error']);
}

function notFound(cmd) {
	error(`
	${cmd}? Are you sure this is what you meant?<br />
	Use <a href="/menu" class="cmd">menu</a> to see available commands.
`);
}

function clear() {
	entries.splice(0, entries.length);
	container.innerHTML = '';
}

export default {
	init,
	add,
	error,
	clear
};
