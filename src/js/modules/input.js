import events from '../events';
import History from './history';
import Placeholder from './placeholder';
import scrollto from '../utils/scrollto';
import target from '../utils/target';

let layout;
let cmder;
let container;
let dummy;
let input;
let cursor;
let homeButton;
let ref;
let defaultCursorWidth = 0;
let active = true;
let touched = false;

function init(cont) {
	layout = cont;
	cmder = layout.querySelector('.cmder');
	dummy = layout.querySelector('.dummy');
	container = layout.querySelector('.cmder-input__container');
	input = layout.querySelector('.cmder-input__input');
	cursor = layout.querySelector('.cursor');
	homeButton = layout.querySelector('.cmder__button--home');
	defaultCursorWidth = window.getComputedStyle(cursor).width;

	setEvents();

	Placeholder.init(cont);

	if (document.hasFocus()) {
		focus();
	} else {
		blur();
	}
}

function setEvents() {
	dummy.addEventListener('blur', () => {
		if (touched) {
			return;
		}
		focus();
		positionCursor();
	});

	window.addEventListener('blur', blur);

	window.addEventListener('focus', focus);

	dummy.addEventListener('input', () => {
		 if (active) {
			type(getValue());
			scrollto();
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

	cursor.addEventListener('click', e => {
		const key = getValue() === '' ? 'menu' : getValue();
		events.emit('router:go', key);
	});

	layout.addEventListener('touchstart', e => {
		touched = true;
	});

	cmder.addEventListener('click', e => {
		if (target(e.target, cursor) || target(e.target, '.cmder__remote')) {
			return;
		}
		if (touched) {
			dummy.focus();
			return;
		}
	});

	events.on('log', blocks => {
		if (blocks.length > 1) {
			homeButton.classList.add('active');
		} else {
			homeButton.classList.remove('active');
		}
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

	Placeholder.toggle(getValue());
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
	let current = anim ? getValue() : goal;
	fillCb(current, goal, next);
}

function fillCb(current, goal, next) {
	if (current.length < goal.length) {
		current = goal.slice(0, current.length + 1);
		type(current);
		setTimeout(() => fillCb(current, goal, next), 80);
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

function focus() {
	dummy.focus();
	Placeholder.text('type');
	Placeholder.toggle(getValue());
	container.classList.remove('hide');
}

function blur() {
	Placeholder.text('focus');
	Placeholder.show();
	container.classList.add('hide');
}

export default {
	init,
	clear,
	type,
	getValue,
	fill
};
