import events from '../events';
import {keywords, shorts} from '../cmds';
import Input from './input';
import Log from './log';

events.on('complete', complete);

function complete(key) {
	const matches = getMatches(key);
	if (!matches || matches.length <= 0) {
		return;
	} else if (matches.length === 1) {
		Input.type(matches[0]);
	} else {
		Log.cmd(Input.getValue());
		Log.add(`
<ul class="suggests">
	${matches.map(m => `
		<li><a href="/${m}" class="cmd">${m}</a></li>
	`).join('')}
</ul>
		`);
	}
}

function getMatches(key) {
	if (key === '') {
		return;
	}
	const keys = key.split(' ');
	const words = Object.keys(keywords).concat(Object.keys(shorts));
	if (keys.length <= 1) {
		return filter(words, key);
	}
	const cmd = keywords[keys[0]];
	if (!cmd || !cmd.params || cmd.params.length <= 0) {
		return;
	}
	const arg = cmd.params[keys.length - 2];
	const matches = filter(arg.values(), keys[keys.length - 1]);
	return matches.map(m => {
		return keys.slice(0, keys.length-1).concat(m).join(' ');
	});
}

function filter(arr, str) {
	return arr.filter(k => k.indexOf(str) === 0).sort();
}
