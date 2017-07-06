const texts = {
	'type': 'Type command',
	'focus': 'Click to focus'
};

let container;

function init(cont) {
	container = cont.querySelector('.cmder-placeholder');
	text('type');
}

function show() {
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

export default {
	init,
	show,
	hide,
	toggle,
	text
}
