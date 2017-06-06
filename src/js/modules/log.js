const entries = [];
let container;

function init(cont) {
	container = cont;
}

function add(text) {
	entries.push(text);
	const line = document.createElement('div');
	line.className = 'log-entry';
	line.innerHTML = text;
	container.appendChild(line);
}

export default {
	init,
	add
}
