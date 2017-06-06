import events from '../events';

let dummy;
let input;
let container;
let cursor;
let defaultCursorWidth = 0;

function init(cont) {
	container = cont;

	dummy = container.querySelector('.dummy');
	input = container.querySelector('.input');
	cursor = container.querySelector('.cursor');
	defaultCursorWidth = window.getComputedStyle(cursor).width;

	setEvents();

	dummy.focus();
}

function setEvents() {
	dummy.addEventListener('blur', () => {
		setTimeout(() => dummy.focus(), 10);
		positionCursor();
	});

	dummy.addEventListener('input', () => {
		input.innerHTML = '';
		const letters = Array.from(dummy.value);
		for(let i in letters) {
			const s = document.createElement('span');
			s.innerHTML = letters[i];
			input.appendChild(s);
		}
		positionCursor();
	});

	dummy.addEventListener('keydown', (e) => {
		positionCursor();

		if (e.key === 'Enter') {
			events.emit('input:enter', dummy.value);
			clear();
		}
	});

	dummy.addEventListener('keyup', (e) => {
		positionCursor();
	});
}

function positionCursor() {
	let top, left, width;
	const index = dummy.selectionStart;
	const spans = input.querySelectorAll('span');
	let ref = spans[index];
	if (!ref) {
		top = 0;
		left = '100%';
		width = defaultCursorWidth;
	} else {
		top = ref.offsetTop + 'px';
		left = ref.offsetLeft + 'px';
		width = ref.offsetWidth + 'px';
	}
	cursor.style.top = top;
	cursor.style.left = left;
	cursor.style.width = width;
}

function clear() {
	dummy.value = '';
	input.innerHTML = '';
	positionCursor();
}

export default {
	init
};
