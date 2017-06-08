let list = [];
let pointer = 0;

if (localStorage.getItem('history')) {
	list = localStorage.getItem('history').split(',');
}

reset();

function get(index) {
	return list[index];
}

function set(key) {
	list.push(key);
	localStorage.setItem('history', list);
	reset();
}

function last() {
	return get(list.length - 1);
}

function current() {
	return get(pointer);
}

function previous() {
	pointer--;
	if (pointer < 0) {
		pointer = 0;
	}
	return current();
}

function next() {
	pointer++;
	if (pointer >= list.length) {
		pointer = list.length;
		return;
	}
	return current();
}

function reset() {
	pointer = list.length;
}

export default {
	list,
	get,
	set,
	last,
	current,
	previous,
	next,
	reset
};
