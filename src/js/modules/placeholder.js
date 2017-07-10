const texts = {
	'type': 'Type command',
	'focus': 'Click to focus'
};

let container;
let active = true;

function init(cont) {
	container = cont.querySelector('.cmder-placeholder');
	text('type');
}

function show() {
	if (!active) {
		return;
	}
	container.classList.add('active');
}

function hide() {
	container.classList.remove('active');
}

function toggle(value) {
	if (value.length > 0) {
		hide();
	} else {
		show();
	}
}

function text(key) {
	container.innerHTML = texts[key];
}

function activate(foo=true) {
	active = foo;
	if (!active) {
		hide();
	}
}

export default {
	init,
	show,
	hide,
	toggle,
	text,
	activate
};
