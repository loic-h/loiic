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
		type(dummy.value);
	});

	dummy.addEventListener('keydown', (e) => {
		positionCursor();

		if (e.key === 'Enter') {
			events.emit('input:enter', dummy.value, true);
			clear();
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			type(History.previous());
			setPositionCursor();
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			type(History.next());
			setPositionCursor();
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

function setPositionCursor(pos) {
	// if (!pos && pos !== 0) {
	// 	pos = dummy.value.length;
	// }
	// console.log(pos);
	// dummy.setSelectionRange(pos, pos);
}


function type(text = '') {
	if (text !== dummy.value) {
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

export default {
	init,
	clear
};
