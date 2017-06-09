import events from '../events';
import History from './history';

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
		type(getValue());
	});

	dummy.addEventListener('keydown', (e) => {
		positionCursor();

		switch(e.key) {
			case 'Enter':
				events.emit('app:doCmd', getValue());
				clear();
				break;

			case 'ArrowUp':
				e.preventDefault();
				type(History.previous());
				break;

			case 'ArrowDown':
				e.preventDefault();
				type(History.next());
				break;

			case 'Tab':
				e.preventDefault();
				events.emit('app:completion', getValue());
				break;
		}


	});

	dummy.addEventListener('keyup', (e) => {
		positionCursor();
	});

	cursor.addEventListener('click', e => {
		const key = getValue() === '' ? 'menu' : getValue();
		events.emit('app:doCmd', key);
	});
}

function positionCursor() {
	let top, left, width;
	const index = dummy.selectionStart;
	const spans = input.querySelectorAll('span');
	let ref = spans[index];
	if (index <= 0) {
		top = 0;
		left = '100%';
		width = defaultCursorWidth;
	} else if (index >= spans.length) {
		ref = spans[spans.length - 1];
		top = ref.offsetTop + 'px';
		left = (ref.offsetLeft + ref.offsetWidth) + 'px';
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


function type(text = '') {
	if (text !== getValue()) {
		dummy.value = text;
	}
	input.innerHTML = '';
	const letters = Array.from(text);
	for(let i in letters) {
		const s = document.createElement('span');
		s.innerHTML = letters[i];
		input.appendChild(s);
	}
	positionCursor();
}

function clear() {
	type();
}

function getValue() {
	return dummy.value;
}

export default {
	init,
	clear,
	type
};
