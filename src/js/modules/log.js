import events from '../events';
import scrollto from '../utils/scrollto';
import {mainwords} from '../cmds';

const entryClass = 'log-entry';
const blockClass = 'log-block';
let container;

function init(cont) {
	container = cont;

	events.on('log:clear', clear);
}

function add(content) {
	container.insertAdjacentHTML('beforeend', content);
	scrollto('end');
	events.emit('log', container.querySelectorAll(`.${blockClass}`));
}

function entry(text, modifiers) {
	let classes = [entryClass];
	if (modifiers) {
		if (Array.isArray(modifiers)) {
			classes = classes.concat(modifiers.map((mod) => `${entryClass}--${mod}`));
		}
	}
	return `
<div class="${classes.join(' ')}">
	<div class="${entryClass}__container">
		${text}
	</div>
</div>
`;
}

function cmd(key, out, showCmd=true, anim=true) {
	return entry(`<span>${key}</span>`, ['cmd']);
}

function block(key, content, showCmd=true) {
	key = key && showCmd ? cmd(key) : '';
	content = entry(content);
	add(`
<div class="log-block">
	${key + content}
</div>
	`);
}

function error(text) {
	return `
<div class="log-error">
	${text}
</div>
	`;;
}

function notFound(cmd) {
	return error(`
${cmd}? Are you sure this is what you meant?<br />
Type <a href="/menu" class="cmd">menu</a> or <a href="/help" class="cmd">help</a> to see available commands.
	`);
}

function errorArgument(key, type) {
	let message = 'Missing argument';
	let href = '/help';
	let label = 'help';
	const helpCmd = mainwords['help'];
	const exceptions = [helpCmd.key].concat(helpCmd.alias);
	if (exceptions.indexOf(key) < 0) {
		href += `/${key}`;
		label += ` ${key}`;
	}
	if (type === 'wrong') {
		message = 'Wrong argument';
	}
	return error(`
${key}: ${message}.<br />
Type <a href="${href}" class="cmd">${label}</a> to see how to use this command.
	`);
}

function clear() {
	container.innerHTML = '';
}

export default {
	init,
	block,
	cmd,
	error,
	errorArgument,
	notFound,
	clear
};
