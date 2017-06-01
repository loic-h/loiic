import pseudo from './utils/pseudo';

let globals = {};

const ps = pseudo();
if (ps) {
	globals = Object.assign(globals, {'css': ps}, {});
}

const container = document.querySelector('[data-jsglobals]');
if (container) {
	globals = Object.assign(globals, JSON.parse(container.dataset.jsglobals), {});
}

export default globals;
