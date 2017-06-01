export default {

	dummy: null,
	input: null,
	container: null,
	cursor: null,
	defaultCursorWidth: 0,

	keys: {

	},

	init(container) {
		this.container = container;

		this.dummy = container.querySelector('.dummy');
		this.input = container.querySelector('.input');
		this.cursor = container.querySelector('.cursor');
		this.defaultCursorWidth = window.getComputedStyle(this.cursor).width;

		this.setEvents();

		this.dummy.focus();
	},

	setEvents() {
		this.dummy.addEventListener('blur', () => {
			setTimeout(() => this.dummy.focus(), 10);
			this.positionCursor();
		});

		this.dummy.addEventListener('input', () => {
			this.input.innerHTML = '';
			const letters = Array.from(this.dummy.value);
			for(let i in letters) {
				const s = document.createElement('span');
				s.innerHTML = letters[i];
				this.input.appendChild(s);
			}
			this.positionCursor();
		});

		this.dummy.addEventListener('keydown', (e) => {
			this.positionCursor();
		});

		this.dummy.addEventListener('keyup', (e) => {
			this.positionCursor();
		});
	},

	positionCursor() {
		let top, left, width;
		const index = this.dummy.selectionStart;
		const spans = this.input.querySelectorAll('span');
		let ref = spans[index];
		if (!ref) {
			top = 0;
			left = '100%';
			width = this.defaultCursorWidth;
		} else {
			top = ref.offsetTop + 'px';
			left = ref.offsetLeft + 'px';
			width = ref.offsetWidth + 'px';
		}
		this.cursor.style.top = top;
		this.cursor.style.left = left;
		this.cursor.style.width = width;
	}
};
