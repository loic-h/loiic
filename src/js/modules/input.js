import events from '../events';
import History from './history';
import scrollto from '../utils/scrollto';

let container;
let cmder;
let dummy;
let input;
let cursor;
let ref;
let defaultCursorWidth = 0;
let active = true;

function init(cont) {
	container = cont;
	cmder = container.querySelector('.cmder');
	dummy = container.querySelector('.dummy');
	input = container.querySelector('.cmder__input');
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
		 if (active) {
			type(getValue());
		}
	});

	dummy.addEventListener('keydown', (e) => {
		positionCursor();

		switch(e.key) {
			case 'Enter':
				events.emit('router:go', getValue());
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
				events.emit('complete', getValue());
				break;
		}
		events.emit('keydown', e.key);
	});

	dummy.addEventListener('keyup', (e) => {
		positionCursor();
	});

	cmder.addEventListener('click', e => {
		const key = getValue() === '' ? 'menu' : getValue();
		events.emit('router:go', key);
	});
}

function positionCursor() {
	let top, left, width;
	const index = dummy.selectionStart;
	const spans = input.querySelectorAll('span');
	ref = spans[index];
	spans.forEach(el => el.classList.remove('active'));
	if (index <= 0 && !ref) {
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
	scrollto('end');
}

function clear() {
	type();
}

function getValue() {
	return dummy.value;
}

function fill(key, next, anim) {
	activate(false);
	const goal = key;
	let current = anim ? goal : getValue();
	fillCb(current, goal, next);
}

function fillCb(current, goal, next) {
	if (current.length < goal.length) {
		current = goal.slice(0, current.length + 1);
		type(current);
		setTimeout(() => fillCb(current, goal, next), 40);
	} else {
		activate();
		if (next) {
			next();
		}
	}
}

function activate(foo=true) {
	active = foo;
}

export default {
	init,
	clear,
	type,
	getValue,
	fill
};
