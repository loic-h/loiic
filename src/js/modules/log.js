import events from '../events';
import Input from './input';
import scrollto from '../utils/scrollto';
import move from 'move-js';

const entries = [];
const entryClass = 'log-entry';
let container;

function init(cont) {
	container = cont;

	events.on('log:clear', clear);
	events.on('log:error', error);
	events.on('log:404', notFound);
	events.on('log:error:argument', errorArgument);
}

function add(text, modifiers) {
	entries.push(text);
	let classes = [entryClass];
	if (modifiers) {
		if (Array.isArray(modifiers)) {
			classes = classes.concat(modifiers.map((mod) => `${entryClass}--${mod}`));
		}
	}
	const line = `
<div class="${classes.join(' ')}">
	<div class="${entryClass}__container">
		${text}
	</div>
</div>
`;
	container.insertAdjacentHTML('beforeend', line);
	scrollto('end');
}

function cmd(key, next, anim) {
	Input.fill(key, () => {
		add(`<span>${key}</span>`, ['cmd']);
		if (next) {
			next();
		}
	}, anim);
}

function error(text) {
	add(text, ['error']);
}

function notFound(cmd) {
	error(`
${cmd}? Are you sure this is what you meant?<br />
Type <a href="/menu" class="cmd">menu</a> or <a href="/help" class="cmd">help</a> to see available commands.
	`);
}

function errorArgument(key, type) {
	let message = 'Missing argument';
	if (type === 'wrong') {
		message = 'Wrong argument';
	}
	error(`
${key}: ${message}.<br />
Type <a href="/help/${key}" class="cmd">help ${key}</a> to see how to use this command.
	`)
}

function clear() {
	entries.splice(0, entries.length);
	container.innerHTML = '';
}

export default {
	init,
	add,
	cmd,
	error,
	clear
};
